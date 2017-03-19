import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Card, Col, Row, Icon, Collapse, Button }               from 'antd'

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

        return (
            <div className={classNames('myTodayWrap', styles.myTodayWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>My Today</h2>
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
            </div>
        )
    }
}
