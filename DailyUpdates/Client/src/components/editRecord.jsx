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
        subTasks: null,
        fieldId: 0,
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

    updateRecord = () => {
        this.setState({
            submitting: true
        })
        this.props.onUpdateRecord(this.props.params.id, {
            FieldId: this.state.fieldId,
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
            this.setState({
                prepared: true,
                turnover: ret[1].filter(task => task.Id === ret[0].FieldId)[0].TurnOver
            })
        })
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.tasks) {
            const subTasks = nextProps.tasks.filter(task => task.Parent !== 0)
            this.setState({
                subTasks: subTasks
            })
        }
        if (nextProps.myRecord) {
            this.setState({
                fieldId: nextProps.myRecord.FieldId,
                destination: nextProps.myRecord.Destination,
                detail: nextProps.myRecord.Detail
            })
        }
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

        const fieldSelection = this.state.subTasks.map((task) => {
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
                        label="Field"
                        {...formItemLayout}
                    >
                        <Select defaultValue={this.props.myRecord.FieldId.toString()} value={this.state.fieldId.toString()} style={{ width: 200 }} onChange={this.selectTask}>{fieldSelection}</Select>
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
