import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Card, Col, Row, Icon, Form, Input, Button, message }               from 'antd'

const FormItem = Form.Item

message.config({
    top: 75,
    duration: 5
})

export default class CreateProjectPage extends React.Component {

    state = {
        name: '',
        description: '',
        submitting: false
    }

    nameInputChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    desInputChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    createProject = () => {
        this.setState({
            submitting: true
        })
        this.props.onCreateProject({
            Name: this.state.name,
            Description: this.state.description
        })
        .then((ret) => {
            message.success('Project create successfully.')
            this.setState({
                submitting: false,
                name: '',
                description: ''
            })
        })
        .catch((err) => {
            message.error(err.message)
            this.setState({
                submitting: false
            })
        })
    }

    render () {
        if (!this.props.me || !this.props.me.IsOwner) {
            return (
                <div className={classNames('createPrjectWrap err', styles.createPrjectWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Create Project</h2>
                    <h3><Icon type="frown-o" />Only Site Owner Can Create A Project.</h3>
                </div>
            )
        }

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        }

        const btnWrapperCol = { span: 14, offset: 15 }

        return (
            <div className={classNames('projectsWrap', styles.projectsWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>Create Project</h2>
                <Form layout="horizontal">
                    <FormItem
                        label="Project Name"
                        {...formItemLayout}
                    >
                        <Input placeholder="" onChange={this.nameInputChange} disabled={this.state.submitting} value={this.state.name}/>
                    </FormItem>
                    <FormItem
                        label="Project Description"
                        {...formItemLayout}
                    >
                        <Input type="textarea" placeholder="" onChange={this.desInputChange} rows={10} disabled={this.state.submitting} value={this.state.description}/>
                    </FormItem>
                    <FormItem wrapperCol={btnWrapperCol}>
                        <Button type="primary" size="large" style={{width: 120}} loading={this.state.submitting} disabled={this.state.name.length < 10 || !this.state.description} onClick={this.createProject}>Create</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
