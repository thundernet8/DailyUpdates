import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Card, Col, Row, Icon, Form, Input, Button, message, Select, Switch, Radio }               from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

export default class CreateActionPage extends React.Component {

    state = {
        projectId: 0,
        parties: '',
        description: '',
        priority: 1,
        comment: '',
        submitting: false
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

    selectProject = (value) => {
        const projectId = parseInt(value)
        this.setState({
            projectId: projectId
        })
    }

    selectPriority = (e) => {
        this.setState({
            priority: e.target.value
        })
    }

    createAction = () => {
        this.setState({
            submitting: true
        })
        this.props.onCreateAction({
            ProjectId: this.state.projectId,
            Priority: this.state.priority,
            Description: this.state.description,
            Comment: this.state.comment,
            Parties: this.state.parties
        })
        .then((ret) => {
            message.success('Action create successfully.')
            this.setState({
                submitting: false,
                description: '',
                comment: '',
                parties: ''
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
        this.props.onGetProjects()
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.projects && nextProps.projects.length > 0 && !this.state.projectId) {
            this.setState({
                projectId: nextProps.projects[0].Id
            })
        }
    }

    render () {
        if (!this.props.me || !this.props.me.IsMember) {
            return (
                <div className={classNames('createActionWrap err', styles.createActionWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Create Action</h2>
                    <h3 className={styles.pageSubTitle}><Icon type="frown-o" />Only Member Can Create A Action.</h3>
                </div>
            )
        }

        if (!this.props.projects) {
            return (
                <div className={classNames('createActionWrap loading', styles.createActionWrap)}>
                    <Spin className={styles.pageSpin}/>
                </div>
            )
        }

        if (this.props.projects.length < 1) {
            return (
                <div className={classNames('createActionWrap', styles.createActionWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Create Action</h2>
                    <h3 className={styles.pageSubTitle}><Icon type="frown-o" />No projects for adding actions</h3>
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
            <div className={classNames('createActionWrap', styles.createActionWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>Create Action</h2>
                <Form layout="horizontal">
                    <FormItem
                        label="Project"
                        {...formItemLayout}
                    >
                        <Select defaultValue={this.props.projects[0].Id.toString()} style={{ width: 200 }} onChange={this.selectProject}>{projectSelection}</Select>
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
                        <Switch checked={true} />
                        <span style={{marginLeft: 10}}>Open for New</span>
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
                        <Button type="primary" size="large" style={{width: 120}} loading={this.state.submitting} disabled={this.state.description.length < 10 || this.state.projectId === 0} onClick={this.createAction}>Create</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
