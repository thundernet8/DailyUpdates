import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'

export default class HomePage extends React.Component {

    componentDidMount () {

    }

    render () {
        if (!this.props.data) {
            return (
                <div>No Data</div>
            )
        }
        const { name, key } = this.props.data

        return (
            <div className={classNames('homeWrap', styles.homeWrap)}>
                {`Hello, a ${key} ${name}`}
            </div>
        )
    }
}
