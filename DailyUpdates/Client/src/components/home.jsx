import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Table, DatePicker, Radio }                                     from 'antd'

const { MonthPicker } = DatePicker
const RadioGroup = Radio.Group

export default class HomePage extends React.Component {

    state = {
        loading: true,
        type: 1 // default show records
    }

    onChangeDisplayType = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    onPickDate = (date, dateString) => {
        if (date) {
            const route = `/${date.year()}/${date.month() + 1}/${date.date()}`
            this.props.router.push(route)
        }
    }

    groupDataByProject = () => {
        const {TopFields, Projects, OpenActions} = this.props.activities
        let projectGroups = {}
        let projectsDict = {}
        Projects.forEach((project) => {
            projectsDict['_' + project.Id] = project
        })

        if (this.state.type === 1) {
            TopFields.forEach((topField) => {
                if (!projectGroups.hasOwnProperty('_' + topField.ProjectId)) {
                    projectGroups['_' + topField.ProjectId] = {project: projectsDict['_' + topField.ProjectId], topFields: [topField]}
                } else {
                    projectGroups['_' + topField.ProjectId].topFields.push(topField)
                }
            })
        } else {
            OpenActions.forEach((openAction) => {
                if (!projectGroups.hasOwnProperty('_' + openAction.ProjectId)) {
                    projectGroups['_' + openAction.ProjectId] = {project: projectsDict['_' + openAction.ProjectId], openActions: [openAction]}
                } else {
                    projectGroups['_' + openAction.ProjectId].openActions.push(openAction)
                }
            })
        }

        return projectGroups
    }

    getTableColumns = (projectGroupItems) => { // projectGroupItems - array of TopFields or OpenActions under this project
        if (this.state.type === 1) {
            const filteredProjectGroup = projectGroupItems.filter(topField => topField.SubFields && topField.SubFields.length > 0) // remove topField without SubFields
            let rowStartIndexes = [0]
            let rowSpans = []
            filteredProjectGroup.forEach((topField, index) => {
                rowStartIndexes[index + 1] = rowStartIndexes[index] + topField.SubFields.length
                rowSpans[index] = topField.SubFields.length
            })
            const recordColumns = [{
                title: 'Top Field',
                dataIndex: 'topField',
                key: 'topField',
                width: 150,
                className: 'firstCol',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    }
                    const topFieldIndex = rowStartIndexes.indexOf(index)
                    if (topFieldIndex > -1) {
                        obj.props.rowSpan = rowSpans[topFieldIndex]
                    } else {
                        obj.props.rowSpan = 0
                    }
                    return obj
                }
            }, {
                title: 'Sub Field',
                dataIndex: 'subField',
                key: 'subField',
                width: 200
            }, {
                title: 'Destination',
                dataIndex: 'destination',
                key: 'destination',
                width: 400
            }, {
                title: 'Turnover Date',
                dataIndex: 'turnover',
                key: 'turnover',
                width: 125,
                className: 'centralCol'
            }, {
                title: 'Owner',
                dataIndex: 'owner',
                key: 'owner',
                width: 100,
                className: 'centralCol'
            }, {
                title: 'Detailed Update',
                dataIndex: 'detail',
                key: 'detail'
            }]

            return recordColumns
        } else {
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
                }
            ]

            return actionColumns
        }
    }

    getTableData = (projectGroupItems) => {
        if (this.state.type === 1) {
            const {Records, Users} = this.props.activities
            let data = []
            let topFieldsDict = {}
            let subFields = []
            let recordsDict = {}
            let usersDict = {}
            projectGroupItems.forEach((topField) => {
                topFieldsDict['_' + topField.Id] = topField
                subFields = subFields.concat(topField.SubFields)
            })
            Records.forEach((Record) => {
                recordsDict['_' + Record.FieldId] = Record
            })
            Users.forEach((User) => {
                usersDict['_' + User.Id] = User
            })
            subFields.forEach((subField, index) => {
                const topField = topFieldsDict['_' + subField.Parent]
                const theRecord = recordsDict.hasOwnProperty('_' + subField.Id) ? recordsDict['_' + subField.Id] : null
                let rowObj = {
                    key: index,
                    topField: topField.Name,
                    subField: subField.Name,
                    destination: theRecord ? theRecord.Destination : subField.Destination,
                    turnover: subField.TurnOver ? ((new Date(subField.TurnOver)).toISOString()).substr(0, 10) : 'N/A',
                    owner: theRecord ? usersDict['_' + theRecord.Uid].Name : '',
                    detail: theRecord ? theRecord.Detail : ''
                }
                data.push(rowObj)
            })

            return data
        } else {
            const data = projectGroupItems.map((action) => {
                return {
                    key: action.Id.toString(),
                    id: action.Id,
                    description: action.Description,
                    parties: action.Parties,
                    priority: action.PriorityStr,
                    status: action.StatusStr,
                    create: (new Date(action.Create)).toLocaleString(),
                    update: action.Update ? (new Date(action.Update)).toLocaleString() : 'N/A',
                    comment: action.Comment
                }
            })

            return data
        }
    }

    fetchData = (props) => {
        if (props.params && props.params.year && props.params.month && props.params.day) {
            props.onGetActivitiesOfDate(props.params.year, props.params.month, props.params.day)
            .then(() => {
                this.setState({
                    loading: false
                })
            })
            .catch(() => {
                this.setState({
                    loading: false
                })
            })
        } else {
            this.props.onGetTodayActivities()
            .then(() => {
                this.setState({
                    loading: false
                })
            })
            .catch(() => {
                this.setState({
                    loading: false
                })
            })
        }
    }

    componentWillMount () {
        this.fetchData(this.props)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.params.year !== this.props.params.year || nextProps.params.month !== this.props.params.month || nextProps.params.day !== this.props.params.day) {
            this.fetchData(nextProps)
        }
    }

    render () {
        const headTitle = <h2 className={classNames('pageTitle', styles.pageTitle)}>{this.props.params && this.props.year ? `Activities of ${this.props.params.year}-${this.props.params.month} -${this.props.params.day}` : 'Activities of Today'}</h2>

        if (this.state.loading) {
            return (
                <div className={classNames('homeWrap loading', styles.homeWrap)}>
                    {headTitle}
                    <Spin className={styles.pageSpin}/>
                </div>
            )
        }

        if (!this.props.activities) {
            return (
                <div className={classNames('homeWrap err', styles.homeWrap)}>
                    {headTitle}
                    <h3><Icon type="frown-o" />No Activities Data or Fetch Failed</h3>
                </div>
            )
        }

        const projectGroups = this.groupDataByProject()

        const tables = Object.values(projectGroups).map((projectGroup, index) => {
            const project = projectGroup.project
            const items = this.state.type === 1 ? projectGroup.topFields : projectGroup.openActions
            const columns = this.getTableColumns(items)
            const data = this.getTableData(items)
            const title = () => project.Name
            const pagination = this.state.type === 1 ? false : {pageSize: 20}

            return (
                <Table
                    key={index}
                    columns={columns}
                    dataSource={data}
                    bordered
                    title={title}
                    pagination={pagination}
                />
            )
        })

        return (
            <div className={classNames('homeWrap loading', styles.homeWrap)}>
                <div className={classNames('homeUtils', styles.homeUtils)}>
                    <RadioGroup onChange={this.onChangeDisplayType} value={this.state.type}>
                        <Radio value={1}>Records</Radio>
                        <Radio value={2}>Actions</Radio>
                    </RadioGroup>
                    <DatePicker className={styles.homeDatePicker} onChange={this.onPickDate} />
                </div>
                {headTitle}
                {tables}
            </div>
        )
    }
}
