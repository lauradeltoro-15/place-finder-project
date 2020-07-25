import React, { Component } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import AuthService from '../../../services/AuthService'

import "./navbar.css" 

import { Link, NavLink } from 'react-router-dom'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.AuthService = new AuthService()
    }

    logout = () => {
        this.AuthService
            .logout()
            .then(() => {
                this.props.setTheUser(false)
                // this.props.handleToast(true, 'Usuario desconectado')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Navbar className='nav' bg="light" variant="light" expand="lg" sticky="top" >
                <Navbar.Brand>
                    <Link to="/">Fainder</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as="span">
                            <NavLink to="/" exact activeStyle={{ color: 'black', fontWeight: 300 }}>Home</NavLink>
                        </Nav.Link>
                

                        {this.props.loggedInUser ?
                            (
                                <Nav.Link as="span">
                                    <span onClick={this.logout}>Log out</span>
                                </Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link as="span">
                                        <NavLink to="/signup" activeStyle={{ color: 'black', fontWeight: 300 }}>Sign up</NavLink>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <NavLink to="/login" activeStyle={{ color: 'black', fontWeight: 300 }}>Log in</NavLink>
                                    </Nav.Link>
                                </>
                            )
                        }
                        <Nav.Link as="span">
                            {this.props.loggedInUser ?
                                <NavLink to={`/profile/${this.props.loggedInUser._id}`} activeStyle={{ color: 'black', fontWeight: 300 }}> Hi, {this.props.loggedInUser.username}</NavLink> :
                                <NavLink to={`/login`} >Hi, friend</NavLink>
                            }
                        </Nav.Link>
                        <Nav.Link as="span" className="green-bg-btn">
                            <NavLink to={`/events`}  activeStyle={{ color: 'white', fontWeight: 400 }}>Events</NavLink>
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation