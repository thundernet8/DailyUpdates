import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Card, Col, Row, Icon, Form, Input, Button, message, Select, Switch }               from 'antd'

const FormItem = Form.Item
const Option = Select.Option

message.config({
    top: 75,
    duration: 8
})

export default class EditRecordPage extends React.Component {

    state = {
        destination: '',
        detail: '',
        submitting: false,
        projectId: 0,
        topFieldId: 0,
        subFieldId: 0,
        turnover: false,
        prepared: false
    }

    desInputChange = (e) => {
        this.setState({
            destination: e.target.value
        })
    }

    detailInputChange = (e) => {
        this.setState({
            detail: e.target.value
        })
    }

    selectProject = (value) => {
        this.setState({
            projectId: parseInt(value),
            topFieldId: 0,
            subFieldId: 0
        })
    }

    selectTopTask = (value) => {
        this.setState({
            topFieldId: parseInt(value)
        })
    }

    selectSubTask = (value) => {
        const subFieldId = parseInt(value)
        const subFields = this.getSpecifiedSubFields(this.state.topFieldId)
        if (subFields.length > 0) {
            const subField = subFields.filter(item => item.Id === subFieldId)[0]
            this.setState({
                subFieldId: subFieldId,
                destination: subField.Destination,
                turnover: subField.TurnOver !== null
            })
        } else {
            this.setState({
                subFieldId: subFieldId,
                destination: '',
                turnover: false
            })
        }
    }

    onTurnoverChange = (checked) => {
        this.setState({
            turnover: checked
        })
    }

    getSpecifiedTopFields = () => {
        return this.props.tasks.filter(task => task.ProjectId === this.state.projectId && task.Parent === 0)
    }

    getSpecifiedSubFields = (topFieldId) => {
        return this.props.tasks.filter(task => task.Parent === topFieldId)
    }

    fillTableByCurrentRecord = (record, tasks, projects) => {
        const subField = tasks.filter(item => item.Id === record.FieldId)[0]
        const topField = tasks.filter(item => item.Id === subField.Parent)[0]
        const project = projects.filter(item => item.Id === topField.ProjectId)[0]
        this.setState({
            prepared: true,
            turnover: subField.TurnOver,
            projectId: project.Id,
            topFieldId: topField.Id,
            subFieldId: subField.Id,
            destination: record.Destination,
            detail: record.Detail
        })
    }

    updateRecord = () => {
        this.setState({
            submitting: true
        })
        this.props.onUpdateRecord(this.props.params.id, {
            FieldId: this.state.subFieldId,
            Destination: this.state.destination,
            Detail: this.state.detail,
            TurnOver: this.state.turnover
        })
        .then((ret) => {
            message.success('Record update successfully.')
            this.setState({
                submitting: false
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
        this.props.onPrepareData(parseInt(this.props.params.id))
        .then((ret) => {
            this.fillTableByCurrentRecord(ret[0], ret[1], ret[2])
        })
    }

    render () {
        if (!this.state.prepared) {
            return (
                <div className={classNames('editRecordWrap loading', styles.editRecordWrap)}>
                    <Spin className={styles.pageSpin}/>
                </div>
            )
        }

        if (!this.props.me || !this.props.me.IsMember) {
            return (
                <div className={classNames('editRecordWrap err', styles.editRecordWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Edit Record</h2>
                    <h3 className={styles.pageSubTitle}><Icon type="frown-o" />Only Member Can Update A Record.</h3>
                </div>
            )
        }

        if (!this.props.myRecord) {
            return (
                <div className={classNames('editRecordWrap err', styles.editRecordWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Error</h2>
                    <h3 className={styles.pageSubTitle}><Icon type="frown-o" />The record is not exist or not yours.</h3>
                </div>
            )
        }

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        }

        const btnWrapperCol = { span: 14, offset: 15 }

        const projectSelection = this.props.projects.map((project) => {
            return <Option key={project.Id} value={project.Id.toString()}>{project.Name}</Option>
        })

        const topFieldSelection = this.getSpecifiedTopFields().map((task) => {
            return <Option key={task.Id} value={task.Id.toString()}>{task.Name}</Option>
        })

        const getSubFieldSelection = (topFieldId) => this.getSpecifiedSubFields(topFieldId).map((task) => {
            return (
                <Option key={task.Id} value={task.Id.toString()}>{task.Name}</Option>
            )
        })

        return (
            <div className={classNames('editRecordWrap', styles.editRecordWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>Edit Record</h2>
                <Form layout="horizontal">
                    <FormItem
                        label="Created At"
                        {...formItemLayout}
                    >
                        <p>{(new Date(this.props.myRecord.Create)).toLocaleString()}</p>
                    </FormItem>
                    <FormItem
                        label="Project"
                        {...formItemLayout}
                    >
                        <Select value={this.state.projectId.toString()} style={{ width: 200 }} onChange={this.selectProject}>{projectSelection}</Select>
                    </FormItem>
                    <FormItem
                        label="Field"
                        {...formItemLayout}
                    >
                        <Select value={this.state.topFieldId ? this.state.topFieldId.toString() : 'Please Select Top Field'} style={{ width: 200 }} onChange={this.selectTopTask}>{topFieldSelection}</Select>
                        <Select value={this.state.subFieldId ? this.state.subFieldId.toString() : 'Please Select Sub Field'} style={{ width: 200, marginLeft: 10 }} onChange={this.selectSubTask}>{getSubFieldSelection(this.state.topFieldId)}</Select>
                    </FormItem>
                    <FormItem
                        label="TurnOver"
                        {...formItemLayout}
                    >
                        <Switch checked={this.state.turnover} onChange={this.onTurnoverChange} />
                    </FormItem>
                    <FormItem
                        label="Destination"
                        {...formItemLayout}
                    >
                        <Input type="textarea" placeholder="" onChange={this.desInputChange} rows={10} disabled={this.state.submitting} value={this.state.destination}/>
                    </FormItem>
                    <FormItem
                        label="Detail"
                        {...formItemLayout}
                    >
                        <Input type="textarea" placeholder="" onChange={this.detailInputChange} rows={10} disabled={this.state.submitting} value={this.state.detail}/>
                    </FormItem>
                    <FormItem wrapperCol={btnWrapperCol}>
                        <Button type="primary" size="large" style={{width: 120}} loading={this.state.submitting} disabled={this.state.destination.length < 10} onClick={this.updateRecord}>Update</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
