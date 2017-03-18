import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import classNames                                   from 'classnames'
import styles                                       from '../styles/app.scss'

export default class AboutPage extends React.Component {

    render () {
        return (
            <div className={classNames('aboutWrap', styles.aboutWrap)}>
                About page
            </div>
        )
    }
}
