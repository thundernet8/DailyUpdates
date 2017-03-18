import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'
import { Spin, Card, Col, Row, Icon }                                     from 'antd'

export default class ProjectsPage extends React.Component {

    componentWillMount () {
        this.props.onGetProjects()
    }

    // componentWillReceiveProps (nextProps) {
    //     if (nextProps.projects) {
    //         this.setState({
    //             loading: false
    //         })
    //     }
    // }

    render () {
        if (!this.props.projects) {
            return (
                <div className={classNames('projectsWrap loading', styles.projectsWrap)}>
                    <h2 className={classNames('pageTitle', styles.pageTitle)}>Projects</h2>
                    <Spin/>
                </div>
            )
        }

        const projectCards = this.props.projects.map(project => (
            <Col className={classNames('gutter-row', styles.projectCol)} span="8" key={project.Id}>
                <Card className="gutter-box" title={project.Name} extra={`ID: ${project.Id}`}>
                    <p>{project.Description}</p>
                </Card>
            </Col>
        ))

        const addBtn = this.props.me && this.props.me.IsOwner
        ? (<Col className={classNames('gutter-row', styles.projectCol)} span="8" key="add">
                <Link to="projects/new">
                    <Card className="gutter-box" title="Add New">
                        <Icon type="plus"/>
                    </Card>
                </Link>
            </Col>) : null
        return (
            <div className={classNames('projectsWrap', styles.projectsWrap)}>
                <h2 className={classNames('pageTitle', styles.pageTitle)}>Projects</h2>
                <Row gutter={16}>
                    {projectCards}
                    {addBtn}
                </Row>
            </div>
        )
    }
}
