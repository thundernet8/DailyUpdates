import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Card, Col, Row, Icon, Form, Input, Button, message, Radio }               from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group

export default class CreateUserPage extends React.Component {

    state = {
        name: '',
        domainName: '',
        role: 2,
        submitting: false
    }

    nameInputChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    domainInputChange = (e) => {
        this.setState({
            domainName: e.target.value
        })
    }

    onSelectRole = (e) => {
        this.setState({
            role: e.target.value
        })
    }

    createUser = () => {
        this.setState({
            submitting: true
        })
        this.props.onCreateUser({
            Name: this.state.name,
            DomainName: 'CORP\\' + this.state.domainName,
            Role: this.state.role
        })
        .then((ret) => {
            message.success('User create successfully.')
            this.setState({
                submitting: false,
                name: '',
                domainName: ''
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
                <div className={classNames('createUserWrap err', styles.createUserWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Create User</h2>
                    <h3 className={styles.pageSubTitle}><Icon type="frown-o" />Only Site Owner Can Create A User.</h3>
                </div>
            )
        }

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        }

        const btnWrapperCol = { span: 14, offset: 15 }

        return (
            <div className={classNames('createUserWrap', styles.createUserWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>Create User</h2>
                <Form layout="horizontal">
                    <FormItem
                        label="User NickName"
                        {...formItemLayout}
                    >
                        <Input placeholder="" onChange={this.nameInputChange} disabled={this.state.submitting} value={this.state.name}/>
                    </FormItem>
                    <FormItem
                        label="User DomainName"
                        {...formItemLayout}
                    >
                        <Input addonBefore="CORP\" placeholder="" onChange={this.domainInputChange} rows={10} disabled={this.state.submitting} value={this.state.domainName}/>
                    </FormItem>
                    <FormItem
                        label="User Role"
                        {...formItemLayout}
                    >
                    <RadioGroup onChange={this.onSelectRole} value={this.state.role}>
                        <Radio value={0} disabled>Owner</Radio>
                        <Radio value={1}>Admin</Radio>
                        <Radio value={2}>User</Radio>
                    </RadioGroup>
                    </FormItem>
                    <FormItem wrapperCol={btnWrapperCol}>
                        <Button type="primary" size="large" style={{width: 120}} loading={this.state.submitting} disabled={this.state.name.length < 3 || !this.state.domainName} onClick={this.createUser}>Create</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
