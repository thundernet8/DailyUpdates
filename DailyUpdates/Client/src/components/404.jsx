import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'

export default class NotFoundPage extends React.Component {

    render () {
        return (
            <div className={classNames('404Page', styles._404Page)}>
                <h1>404</h1>
            </div>
        )
    }
}
