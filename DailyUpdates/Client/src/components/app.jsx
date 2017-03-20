import React, { PropTypes }             from 'react'
import { Link }                         from 'react-router'
import DUHeader                         from './header'
import { Layout, Menu, Breadcrumb }     from 'antd'
import classNames                       from 'classnames'
import styles                           from '../styles/app.scss'

const { Footer, Content } = Layout

export default class App extends React.Component {

    componentWillMount () {
        this.props.onGetCurrentUser()
    }

    render () {
        return (
            <div>
                <DUHeader me={this.props.me} pathName={this.props.location.pathname}/>
                <Content style={{ padding: '0 50px' }} className={classNames('container', styles.container)}>
                    {/* <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div style={{ background: '#fff', padding: 24, minHeight: 400 }}>{this.props.children}</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Scheduling Daily © 2017 AspenTech</Footer>
            </div>
        )
    }
}
