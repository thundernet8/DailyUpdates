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

export default class CreateRecordPage extends React.Component {

    state = {
        destination: '',
        detail: '',
        submitting: false,
        projectId: 0,
        topFieldId: 0,
        subFieldId: 0,
        turnover: false
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
            projectId: parseInt(value)
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
        return this.props.tasks.filter(task => task.ProjectId === this.state.projectId)
    }

    getSpecifiedSubFields = (topFieldId) => {
        let subFields = []
        this.props.tasks.forEach((topField) => {
            if (topField.ProjectId === this.state.projectId && topField.Id === topFieldId) {
                subFields = topField.SubFields
            }
        })

        return subFields
    }

    createRecord = () => {
        this.setState({
            submitting: true
        })
        this.props.onCreateRecord({
            FieldId: this.state.subFieldId,
            Destination: this.state.destination,
            Detail: this.state.detail,
            TurnOver: this.state.turnover
        })
        .then((ret) => {
            message.success('Record create successfully.')
            this.setState({
                submitting: false,
                detail: ''
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
        this.props.onPrepareData()
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.projects && nextProps.projects.length > 0) {
            this.setState({
                projectId: nextProps.projects[0].Id
            })
        }
    }

    render () {
        if (!this.props.me || !this.props.me.IsMember) {
            return (
                <div className={classNames('createRecordWrap err', styles.createRecordWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Create Record</h2>
                    <h3 className={styles.pageSubTitle}><Icon type="frown-o" />Only Member Can Create A Record.</h3>
                </div>
            )
        }

        if (!this.props.tasks || !this.props.projects) {
            return (
                <div className={classNames('createRecordWrap loading', styles.createRecordWrap)}>
                    <Spin className={styles.pageSpin}/>
                </div>
            )
        }

        if (this.props.tasks.length < 1) {
            return (
                <div className={classNames('createRecordWrap', styles.createRecordWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Create Record</h2>
                    <h3 className={styles.pageSubTitle}><Icon type="frown-o" />No task fields for adding records</h3>
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
            <div className={classNames('createRecordWrap', styles.createRecordWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>Create Record</h2>
                <Form layout="horizontal">
                    <FormItem
                        label="Project"
                        {...formItemLayout}
                    >
                        <Select defaultValue={this.props.projects[0].Id.toString()} value={this.state.projectId.toString()} style={{ width: 200 }} onChange={this.selectProject}>{projectSelection}</Select>
                    </FormItem>
                    <FormItem
                        label="Field"
                        {...formItemLayout}
                    >
                        <Select defaultValue={'Please Select Top Field'} style={{ width: 200 }} onChange={this.selectTopTask}>{topFieldSelection}</Select>
                        <Select defaultValue={'Please Select Sub Field'} style={{ width: 200, marginLeft: 10 }} onChange={this.selectSubTask}>{getSubFieldSelection(this.state.topFieldId)}</Select>
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
                        <Button type="primary" size="large" style={{width: 120}} loading={this.state.submitting} disabled={this.state.topFieldId === 0 || this.state.subField === 0 || this.state.destination.length < 10} onClick={this.createRecord}>Create</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
