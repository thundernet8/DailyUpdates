import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Card, Col, Row, Icon, Form, Input, Button, message, Select, Switch, Radio }               from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

export default class EditActionPage extends React.Component {

    state = {
        parties: '',
        description: '',
        priority: 1,
        status: 0,
        comment: '',
        submitting: false,
        prepared: false
    }

    partiesInputChange = (e) => {
        this.setState({
            parties: e.target.value
        })
    }

    desInputChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    commentInputChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    changeStatus = (checked) => {
        this.setState({
            status: checked ? 0 : 1
        })
    }

    selectPriority = (e) => {
        this.setState({
            priority: e.target.value
        })
    }

    updateAction = () => {
        this.setState({
            submitting: true
        })
        this.props.onUpdateAction(this.props.params.id, {
            Status: this.state.status,
            Priority: this.state.priority,
            Description: this.state.description,
            Comment: this.state.comment,
            Parties: this.state.parties
        })
        .then((ret) => {
            message.success('Action update successfully.')
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
        this.props.onPrepareData(this.props.params.id)
        .then((ret) => {
            this.setState({
                prepared: true
            })
        })
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.myAction) {
            const action = nextProps.myAction
            this.setState({
                status: action.Status,
                parties: action.Parties,
                description: action.Description,
                comment: action.Comment,
                priority: action.Priority
            })
        }
    }

    render () {
        if (!this.state.prepared) {
            return (
                <div className={classNames('editActionWrap loading', styles.editActionWrap)}>
                    <Spin className={styles.pageSpin}/>
                </div>
            )
        }

        if (!this.props.me || !this.props.me.IsMember) {
            return (
                <div className={classNames('editActionWrap err', styles.editActionWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Edit Action</h2>
                    <h3 className={styles.pageSubTitle}><Icon type="frown-o" />Only Member Can Create A Action.</h3>
                </div>
            )
        }

        if (this.props.myAction.Uid !== this.props.me.Id && !this.props.me.IsAdmin) {
            return (
                <div className={classNames('editActionWrap', styles.editActionWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Edit Action</h2>
                    <h3 className={styles.pageSubTitle}><Icon type="frown-o" />You are not allowed to edit this action</h3>
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

        return (
            <div className={classNames('editActionWrap', styles.editActionWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>Edit Action</h2>
                <Form layout="horizontal">
                    <FormItem
                        label="Project"
                        {...formItemLayout}
                    >
                        <Select value={this.props.projects.filter(project => project.Id === this.props.myAction.ProjectId)[0].Id.toString()} style={{ width: 200 }} disabled>{projectSelection}</Select>
                    </FormItem>
                    <FormItem
                        label="Priority"
                        {...formItemLayout}
                    >
                        <RadioGroup onChange={this.selectPriority} value={this.state.priority}>
                            <Radio value={0}>Low</Radio>
                            <Radio value={1}>Medium</Radio>
                            <Radio value={2}>High</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                        label="Status"
                        {...formItemLayout}
                    >
                        <Switch checked={this.state.status === 0} onChange={this.changeStatus} />
                        <span style={{marginLeft: 10}}>{this.state.status === 0 ? 'Open' : 'Closed'}</span>
                    </FormItem>
                    <FormItem
                        label="Parties"
                        {...formItemLayout}
                    >
                        <Input type="textarea" placeholder="" onChange={this.partiesInputChange} rows={3} disabled={this.state.submitting} value={this.state.parties}/>
                    </FormItem>
                    <FormItem
                        label="Description"
                        {...formItemLayout}
                    >
                        <Input type="textarea" placeholder="" onChange={this.desInputChange} rows={10} disabled={this.state.submitting} value={this.state.description}/>
                    </FormItem>
                    <FormItem
                        label="Comment"
                        {...formItemLayout}
                    >
                        <Input type="textarea" placeholder="" onChange={this.commentInputChange} rows={10} disabled={this.state.submitting} value={this.state.comment}/>
                    </FormItem>
                    <FormItem wrapperCol={btnWrapperCol}>
                        <Button type="primary" size="large" style={{width: 120}} loading={this.state.submitting} disabled={this.state.description.length < 10 || this.state.projectId === 0} onClick={this.updateAction}>Update</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
