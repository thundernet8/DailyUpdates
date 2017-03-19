import React, { PropTypes }             from 'react'
import { Link }                         from 'react-router'
import { Layout, Menu, Icon }                 from 'antd'
import classNames                       from 'classnames'
import styles                           from '../styles/app.scss'

const { Header } = Layout
const logo = require('../assets/images/logo.png')

export default class DUHeader extends React.Component {

    static propTypes = {
        activeNavIndex: PropTypes.number
    }

    state = {
        activeNavIndex: -1
    }

    navs = [
        {to: '/today', title: 'Today'},
        {to: '/projects', title: 'Projects'},
        {to: '/tasks', title: 'Tasks'}
    ]

    componentWillReceiveProps (nextProps) {
        if (nextProps.me && nextProps.me.IsAdmin) {
            this.navs[4] = {to: '/users', title: 'Users'}
        }
        if (nextProps.pathName) {
            let match = false
            this.navs.forEach((nav, index) => {
                if (nav.to === nextProps.pathName) {
                    this.setState({
                        activeNavIndex: index
                    })
                    match = true
                }
            })
            if (!match) {
                this.setState({
                    activeNavIndex: -1
                })
            }
        }
    }

    render () {
        const menuItems = this.navs.map((nav, index) => {
            return (
                <Menu.Item key={index}><Link to={nav.to} activeClassName="active">{nav.title}</Link></Menu.Item>
            )
        })

        return (
            <Header>
                <div className={classNames('logo', styles.logo)}>
                    <img src={logo}/>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[]}
                    selectedKeys={[this.state.activeNavIndex.toString()]}
                    style={{ lineHeight: '64px' }}
                >
                    {menuItems}
                </Menu>
                <div className={classNames('profile', styles.profile)}>
                    {this.props.me && this.props.me.IsMember &&
                    <span className={classNames('createRecord', styles.createRecord)} title="Add Record">
                        <Link to="/records/new"><Icon type="edit"/></Link>
                    </span>
                    }
                    <span className={classNames('userName', styles.userName)}><Link to="/me/today">{this.props.me ? this.props.me.Name : ''}</Link></span>
                </div>
            </Header>
        )
    }
}
