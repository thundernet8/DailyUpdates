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
        subTasks: null,
        fieldId: 0,
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

    selectTask = (value) => {
        const fieldId = parseInt(value)
        const task = this.state.subTasks.filter(task => task.Id === fieldId)[0]
        this.setState({
            fieldId: fieldId,
            destination: task.Destination,
            turnover: task.TurnOver !== null
        })
    }

    onTurnoverChange = (checked) => {
        this.setState({
            turnover: checked
        })
    }

    createRecord = () => {
        this.setState({
            submitting: true
        })
        this.props.onCreateRecord({
            FieldId: this.state.fieldId,
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
        this.props.onGetTasks()
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.tasks) {
            const subTasks = nextProps.tasks.filter(task => task.Parent !== 0)
            this.setState({
                subTasks: subTasks
            })
            if (this.state.fieldId === 0 && subTasks.length > 0) {
                this.setState({
                    fieldId: subTasks[0].Id
                })
            }
            if (this.state.destination === '' && subTasks.length > 0) {
                this.setState({
                    destination: subTasks[0].Destination
                })
            }
            if (subTasks.length > 0) {
                this.setState({
                    turnover: subTasks[0].TurnOver !== null
                })
            }
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

        if (!this.state.subTasks) {
            return (
                <div className={classNames('createRecordWrap loading', styles.createRecordWrap)}>
                    <Spin className={styles.pageSpin}/>
                </div>
            )
        }

        if (this.state.subTasks.length < 1) {
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

        const fieldSelection = this.state.subTasks.map((task) => {
            return (
                <Option key={task.Id} value={task.Id.toString()}>{task.Name}</Option>
            )
        })

        return (
            <div className={classNames('createRecordWrap', styles.createRecordWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>Create Record</h2>
                <Form layout="horizontal">
                    <FormItem
                        label="Field"
                        {...formItemLayout}
                    >
                        <Select defaultValue={this.state.subTasks[0].Id.toString()} style={{ width: 200 }} onChange={this.selectTask}>{fieldSelection}</Select>
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
                        <Button type="primary" size="large" style={{width: 120}} loading={this.state.submitting} disabled={this.state.destination.length < 10} onClick={this.createRecord}>Create</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
