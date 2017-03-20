import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Table, DatePicker }                                     from 'antd'

const { MonthPicker } = DatePicker

export default class HomePage extends React.Component {

    state = {
        loading: true
    }

    onPickDate = (date, dateString) => {
        if (date) {
            const route = `/${date.year()}/${date.month() + 1}/${date.date()}`
            this.props.router.push(route)
        }
    }

    groupDataByProject = () => {
        const {TopFields, Projects} = this.props.activities
        let projectGroups = {}
        let projectsDict = {}
        Projects.forEach((project) => {
            projectsDict['_' + project.Id] = project
        })
        TopFields.forEach((topField) => {
            if (!projectGroups.hasOwnProperty('_' + topField.ProjectId)) {
                projectGroups['_' + topField.ProjectId] = {project: projectsDict['_' + topField.ProjectId], topFields: [topField]}
            } else {
                projectGroups['_' + topField.ProjectId].topFields.push(topField)
            }
        })

        return projectGroups
    }

    getTableColumns = (projectGroupTopFields) => { // projectGroupTopFields - array of TopFields under this project
        const filteredProjectGroup = projectGroupTopFields.filter(topField => topField.SubFields && topField.SubFields.length > 0) // remove topField without SubFields
        let rowStartIndexes = [0]
        let rowSpans = []
        filteredProjectGroup.forEach((topField, index) => {
            rowStartIndexes[index + 1] = rowStartIndexes[index] + topField.SubFields.length
            rowSpans[index] = topField.SubFields.length
        })
        const columns = [{
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

        return columns
    }

    getTableData = (projectGroupTopFields) => {
        const {Records, Users} = this.props.activities
        let data = []
        let topFieldsDict = {}
        let subFields = []
        let recordsDict = {}
        let usersDict = {}
        projectGroupTopFields.forEach((topField) => {
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
            const topFields = projectGroup.topFields
            const columns = this.getTableColumns(topFields)
            const data = this.getTableData(topFields)
            const title = () => project.Name

            return (
                <Table
                    key={index}
                    columns={columns}
                    dataSource={data}
                    bordered
                    title={title}
                    pagination={false}
                />
            )
        })

        return (
            <div className={classNames('homeWrap loading', styles.homeWrap)}>
                <DatePicker className={styles.homeDatePicker} onChange={this.onPickDate} />
                {headTitle}
                {tables}
            </div>
        )
    }
}
