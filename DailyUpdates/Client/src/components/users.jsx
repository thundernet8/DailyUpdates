import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Card, Col, Row, Icon, Table, Button }                                     from 'antd'

export default class UsersPage extends React.Component {

    componentWillMount () {
        this.props.onGetUsers()
    }

    render () {
        if (!this.props.users) {
            return (
                <div className={classNames('usersWrap loading', styles.usersWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Member Users</h2>
                    <Spin className={styles.pageSpin}/>
                </div>
            )
        }

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                className: 'centralCol'
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                className: 'centralCol'
            },
            {
                title: 'DomainName',
                dataIndex: 'domainName',
                key: 'domainName',
                className: 'centralCol'
            },
            {
                title: 'CreateTime',
                dataIndex: 'create',
                key: 'create',
                className: 'centralCol'
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                className: 'centralCol'
            }
        ]

        const data = this.props.users.map((user) => {
            return {
                key: user.Id.toString(),
                id: user.Id,
                name: user.Name,
                domainName: user.DomainName,
                create: user.Create,
                role: user.RoleStr
            }
        })

        const usersTable = (
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
            />
        )

        const addBtn = this.props.me && this.props.me.IsOwner
        ? (<div className={classNames('addUserBtn', styles.addUserBtn)}>
            <Link to="users/new">
                <Button type="default" icon="plus">Add User</Button>
            </Link>
            </div>) : null
        const content = this.props.me && this.props.me.IsMember
        ? usersTable : <h3 className={styles.pageSubTitle}>You have no permission to view users</h3>
        return (
            <div className={classNames('usersWrap', styles.usersWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>Member Users</h2>
                {addBtn}
                {content}
            </div>
        )
    }
}
