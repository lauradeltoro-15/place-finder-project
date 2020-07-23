import React, { Component } from 'react'

import AuthService from '../../../../services/AuthService'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class AuthForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isCompany: false,
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => {
        const name = e.target.name
        const value = name === "isCompany" ? e.target.checked : e.target.value
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        const authMethod = this.props.location.pathname === "/signup" ? "signup" : "login"
        e.preventDefault()
        this.authService[authMethod](this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                //this.props.handleToast(true, 'Sesión inciada')
                this.props.history.push('/')
            })
            .catch(err => this.setState({ errorMsg: err.response.data.message }))
    }

    render() {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                </Form.Group>
                {this.props.isSignup &&
                    <Form.Group>
                        <Form.Label>Are you a company? </Form.Label>
                        <input type="checkbox" onChange={this.handleInputChange} name="isCompany" ckecked={this.state.isCompany} />
                    </Form.Group>
                }
                {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                <Button variant="dark" type="submit">{this.props.isSignup ? "Sign up" : "Log in"}</Button>
            </Form>
        )
    }
}

export default AuthForm