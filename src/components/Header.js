import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-light justify-content-between">
                <p className="navbar-brand header-signature">
                    Stefan Đorđević
                </p>
                <a className="navbar-brand header-icon" target="_blank" href="https://github.com/stedjor/movie-search">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </nav>
        )
    }
}

export default Header
