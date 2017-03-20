import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Card, Col, Row, Icon, Collapse, Button, Table }               from 'antd'

const Panel = Collapse.Panel

export default class MyTodayPage extends React.Component {

    state = {
        prepared: false
    }

    editBtnClick = (e) => {
        e.stopPropagation()
    }

    componentWillMount () {
        this.props.onPrepareData().then(() => {
            this.setState({
                prepared: true
            })
        })
    }

    render () {
        if (!this.state.prepared) {
            return (
                <div className={classNames('myTodayWrap loading', styles.myTodayWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>My Today</h2>
                    <Spin className={styles.pageSpin}/>
                </div>
            )
        }

        const subFields = {}
        this.props.tasks.filter(task => task.Parent !== 0).forEach((task) => {
            subFields['_' + task.Id] = task
        })
        const records = this.props.myRecords.map((record) => {
            record['field'] = subFields['_' + record.FieldId]
            return record
        })

        const actionColumns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 60,
                className: 'centralCol'
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description'
            },
            {
                title: 'Parties',
                dataIndex: 'parties',
                key: 'parties',
                className: 'centralCol'
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                key: 'priority',
                width: 80,
                className: 'centralCol'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                width: 80,
                className: 'centralCol'
            },
            {
                title: 'Create Time',
                dataIndex: 'create',
                key: 'create',
                width: 150,
                className: 'centralCol'
            },
            {
                title: 'Update Time',
                dataIndex: 'update',
                key: 'update',
                className: 'centralCol'
            },
            {
                title: 'Comment',
                dataIndex: 'comment',
                key: 'comment'
            },
            {
                title: '',
                dataIndex: 'edit',
                key: 'edit',
                width: 75,
                className: 'centralCol'
            }
        ]

        const actionsData = this.props.myActions.filter(action => action.Status === 0).map((action) => {
            return {
                key: action.Id.toString(),
                id: action.Id,
                description: action.Description,
                parties: action.Parties,
                priority: action.PriorityStr,
                status: action.StatusStr,
                create: (new Date(action.Create)).toLocaleString(),
                update: action.Update ? (new Date(action.Update)).toLocaleString() : 'N/A',
                comment: action.Comment,
                edit: <Link to={`/actions/edit/${action.Id}`}><Icon type="edit"/>Edit</Link>
            }
        })

        const actionsTable = (
            <Table
                columns={actionColumns}
                dataSource={actionsData}
                bordered
            />
        )

        return (
            <div className={classNames('myTodayWrap', styles.myTodayWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>My Today</h2>
                <h3 className={styles.fieldTitle}>Records</h3>
                {records.length > 0 &&
                <Collapse defaultActiveKey={[records[0].Id.toString()]} accordion>
                    {records.map((record) => {
                        const header = <div className={styles.recordPaneHead}>{`Record #${record.Id}`}<span>{(new Date(record.Create)).toLocaleString()}</span><Link to={`records/edit/${record.Id}`}><Button type="default" icon="edit" onClick={this.editBtnClick}>Edit</Button></Link></div>
                        return (
                            <Panel className={styles.recordPanel} header={header} key={record.Id}>
                                <Row gutter={10} className={styles.recordRow}>
                                    <Col className="gutter-row" span={3}>Field: </Col>
                                    <Col className="gutter-row" span={16}><p>{record.field.Name}</p></Col>
                                </Row>
                                <Row gutter={10} className={styles.recordRow}>
                                    <Col className="gutter-row" span={3}>Destination: </Col>
                                    <Col className="gutter-row" span={16}><p>{record.Destination}</p></Col>
                                </Row>
                                <Row gutter={10} className={styles.recordRow}>
                                    <Col className="gutter-row" span={3}>Detail: </Col>
                                    <Col className="gutter-row" span={16}><p>{record.Detail}</p></Col>
                                </Row>
                            </Panel>
                        )
                    })}
                </Collapse>
                }
                <h3 className={styles.fieldTitle}>Actions</h3>
                {actionsTable}
            </div>
        )
    }
}
