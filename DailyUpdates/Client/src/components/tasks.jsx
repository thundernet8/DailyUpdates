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
            <Collapse defaultActiveKey={[subFields[0].Id.toString()]} accordion>
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
        this.props.onPrepareData()
    }

    render () {
        if (!this.props.topTasks || !this.props.projects) {
            return (
                <div className={classNames('tasksWrap loading', styles.tasksWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Task Fields</h2>
                    <Spin className={styles.pageSpin}/>
                </div>
            )
        }

        const projectGroupedTasks = {}
        this.props.projects.forEach((project) => {
            projectGroupedTasks['_' + project.Id] = {project, topTasks: []}
        })
        this.props.topTasks.forEach((topTask) => {
            if (projectGroupedTasks.hasOwnProperty('_' + topTask.ProjectId)) {
                projectGroupedTasks['_' + topTask.ProjectId].topTasks.push(topTask)
            }
        })

        const projectGroups = Object.values(projectGroupedTasks).map((group) => {
            if (group.topTasks.length < 1) {
                return null
            }
            return (
                <div key={group.project.Id} className={styles.projectGroup}>
                    <h3 className={styles.fieldTitle}>{group.project.Name}</h3>
                    <div className={styles.projectGroupContent}>
                        <Tabs defaultActiveKey={group.topTasks[0].Id.toString()}>
                            {group.topTasks.map(topTask => (
                                <TabPane className={styles.topFieldPanel} tab={topTask.Name} key={topTask.Id}>
                                    <h3>{topTask.Destination}</h3>
                                    <p className={styles.tips}>This top task field has <b>{topTask.SubFields ? topTask.SubFields.length : 0}</b> sub fields</p>
                                    {this.renderSubTasks(topTask.SubFields)}
                                </TabPane>
                            ))}
                        </Tabs>
                    </div>
                </div>
            )
        })

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
                {projectGroups}
            </div>
        )
    }
}
