import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import moment                                       from 'moment'
import { Spin, Card, Col, Row, Icon, Form, Input, Button, message, Select, DatePicker }               from 'antd'

const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

export default class EditTaskPage extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        destination: PropTypes.string,
        projectId: PropTypes.number,
        parentId: PropTypes.number,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        submitting: PropTypes.bool,
        prepared: PropTypes.bool
    }

    state = {
        name: '',
        destination: '',
        projectId: 0,
        parentId: 0,
        startDate: '',
        endDate: '',
        submitting: false,
        prepared: false
    }

    nameInputChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    desInputChange = (e) => {
        this.setState({
            destination: e.target.value
        })
    }

    selectProject = (value) => {
        const selectProjectId = parseInt(value)
        if (this.props.topTasks.filter(topTask => topTask.ProjectId === selectProjectId).length === 0) {
            this.setState({
                parentId: 0
            })
        }
        this.setState({
            projectId: selectProjectId
        })
    }

    selectParent = (value) => {
        this.setState({
            parentId: parseInt(value)
        })
    }

    chooseDateRange = (date, dateString) => {
        this.setState({
            startDate: dateString[0],
            endDate: dateString[1]
        })
    }

    updateTaskField = () => {
        this.setState({
            submitting: true
        })
        this.props.onUpdateTaskField(this.props.task.Id, {
            Name: this.state.name,
            Destination: this.state.destination,
            Parent: this.state.parentId,
            ProjectId: this.state.projectId,
            Start: this.state.startDate,
            End: this.state.endDate
        })
        .then((ret) => {
            message.success('Task field update successfully.')
            this.setState({
                submitting: false,
                name: '',
                destination: ''
            })
        })
        .catch((err) => {
            message.error(err.message)
            this.setState({
                submitting: false
            })
        })
    }

    componentWillMount () {
        this.props.onPrepareData(this.props.params.id)
        .then(() => {
            this.setState({
                prepared: true
            })
        })
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.task) {
            const task = nextProps.task
            this.setState({
                name: task.Name,
                destination: task.Destination,
                projectId: task.ProjectId,
                parentId: task.Parent,
                startDate: task.Start,
                endDate: task.End
            })
        }
    }

    render () {
        if (!this.props.me || !this.props.me.IsAdmin) {
            return (
                <div className={classNames('editTaskWrap err', styles.editTaskWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Edit Task Field</h2>
                    <h3 className={styles.pageSubTitle}><Icon type="frown-o" />Only Site Owner or Admin Can Edit A Task Field.</h3>
                </div>
            )
        }

        if (!this.state.prepared) {
            return (
                <div className={classNames('editTaskWrap loading', styles.editTaskWrap)}>
                    <Spin className={styles.pageSpin}/>
                </div>
            )
        }

        if (this.props.projects.length < 1) {
            return (
                <div className={classNames('editTaskWrap', styles.editTaskWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Edit Task Field</h2>
                    <h3 className={styles.pageSubTitle}><Icon type="frown-o" />No project for the task</h3>
                </div>
            )
        }

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        }

        const btnWrapperCol = { span: 14, offset: 15 }

        const projectSelection = this.props.projects.map((project) => {
            return (
                <Option key={project.Id} value={project.Id.toString()}>{project.Name}</Option>
            )
        })

        let parentFieldSelection
        if (this.props.topTasks.length === 0) {
            parentFieldSelection = (
                <Select defaultValue="0" style={{ width: 200 }} disabled={true}><Option key={0} value="0">N/A</Option></Select>
            )
        } else {
            parentFieldSelection = (
                <Select defaultValue="0" style={{ width: 200 }} value={this.state.parentId.toString()} onChange={this.selectParent}>
                    <Option key={0} value="0">None</Option>
                    {this.props.topTasks.filter(topTask => topTask.ProjectId === this.state.projectId).map((topTask) => {
                        return (<Option key={topTask.Id} value={topTask.Id.toString()}>{topTask.Name}</Option>)
                    })}
                </Select>
            )
        }

        return (
            <div className={classNames('editTaskWrap', styles.editTaskWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>Edit Task Field</h2>
                <Form layout="horizontal">
                    <FormItem
                        label="Field Name"
                        {...formItemLayout}
                    >
                        <Input placeholder="" onChange={this.nameInputChange} disabled={this.state.submitting} value={this.state.name}/>
                    </FormItem>
                    <FormItem
                        label="Project"
                        {...formItemLayout}
                    >
                        <Select value={this.state.projectId.toString()} style={{ width: 200 }} onChange={this.selectProject}>{projectSelection}</Select>
                    </FormItem>
                    <FormItem
                        label="Parent Field"
                        {...formItemLayout}
                    >
                        {parentFieldSelection}
                        <span style={{marginLeft: 10}}>{this.state.parentId === 0 ? 'It will be a top field' : 'It will be a sub field'}</span>
                    </FormItem>
                    <FormItem
                        label="Date Range"
                        {...formItemLayout}
                    >
                        <RangePicker value={[moment(this.state.startDate), moment(this.state.endDate)]} onChange={this.chooseDateRange} allowClear={false}/>
                    </FormItem>
                    <FormItem
                        label="Field Destination"
                        {...formItemLayout}
                    >
                        <Input type="textarea" placeholder="" onChange={this.desInputChange} rows={10} disabled={this.state.submitting} value={this.state.destination}/>
                    </FormItem>
                    <FormItem wrapperCol={btnWrapperCol}>
                        <Button type="primary" size="large" style={{width: 120}} loading={this.state.submitting} disabled={this.state.name.length < 5 || !this.state.destination || !this.state.projectId || !this.state.startDate || !this.state.endDate} onClick={this.updateTaskField}>Update</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
