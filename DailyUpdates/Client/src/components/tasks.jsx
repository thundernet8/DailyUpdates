import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Card, Col, Row, Icon, Tabs, Button, Collapse }         from 'antd'
const TabPane = Tabs.TabPane
const Panel = Collapse.Panel

export default class TasksPage extends React.Component {

    editBtnClick = (e) => {
        e.stopPropagation()
    }

    renderSubTasks = (subFields) => {
        if (!subFields || subFields.length === 0) {
            return null
        }
        return (
            <Collapse defaultActiveKey={[subFields[0].Id.toString()]}>
                {subFields.map((subField) => {
                    const header = <div>{subField.Name}<Link to={`tasks/edit/${subField.Id}`}><Button type="default" icon="edit" onClick={this.editBtnClick}>Edit</Button></Link></div>
                    return (
                        <Panel className={styles.subFieldPanel} header={header} key={subField.Id}>
                            <p>{subField.Destination}</p>
                        </Panel>
                    )
                })}
            </Collapse>
        )
    }

    componentWillMount () {
        this.props.onGetTopTasks()
    }

    render () {
        if (!this.props.topTasks) {
            return (
                <div className={classNames('tasksWrap loading', styles.tasksWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Task Fields</h2>
                    <Spin/>
                </div>
            )
        }

        const taskTabs = this.props.topTasks.map(topTask => (
            <TabPane className={styles.topFieldPanel} tab={topTask.Name} key={topTask.Id}>
                <h3>{topTask.Destination}</h3>
                <p className={styles.tips}>{`This top task field has ${topTask.SubFields ? topTask.SubFields.length : 0} sub fields`}</p>
                {this.renderSubTasks(topTask.SubFields)}
            </TabPane>
        ))

        const addBtn = this.props.me && this.props.me.IsOwner
        ? (<div className={classNames('addTaskBtn', styles.addTaskBtn)}>
            <Link to="tasks/new">
                <Button type="default" icon="plus">Add New</Button>
            </Link>
            </div>) : null
        return (
            <div className={classNames('tasksWrap', styles.tasksWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>Task Fields</h2>
                {addBtn}
                <Tabs defaultActiveKey="1">
                    {taskTabs}
                </Tabs>
            </div>
        )
    }
}
