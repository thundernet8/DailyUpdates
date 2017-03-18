import React, { PropTypes }             from 'react'
import { Link }                         from 'react-router'
import { Layout, Menu }                 from 'antd'
import classNames                       from 'classnames'
import styles                           from '../styles/app.scss'

const { Header } = Layout
const logo = require('../assets/images/logo.png')

export default class DUHeader extends React.Component {
    render () {
        return (
            <Header>
                <div className={classNames('logo', styles.logo)}>
                    <img src={logo}/>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1"><Link to="/" activeClassName="active">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/today" activeClassName="active">Today</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/projects" activeClassName="active">Projects</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/tasks" activeClassName="active">Tasks</Link></Menu.Item>
                </Menu>
                <div className={classNames('profile', styles.profile)}>
                    <span className={classNames('userName', styles.userName)}>{this.props.me ? this.props.me.Name : ''}</span>
                </div>
            </Header>
        )
    }
}
