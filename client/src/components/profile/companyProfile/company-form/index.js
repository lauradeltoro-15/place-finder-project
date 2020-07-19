import React, { Component } from 'react'

import UserService from "../../../../services/UserService"

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CompanyForm extends Component {
    constructor() {
        super()
        this.state = {
            description: "",
            phone: "",
            address: "",   
            facebook: "",
            instagram: "",
            website: "",
            username: null,
            password: ""
        }
        this.userService = new UserService()
    }
    componentDidMount = () => this.enterUsernameStateValue(this.props.loggedInUser)
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.userService
            .editUserProfile(this.props.loggedInUser._id , this.state)
            .then(response => {
                console.log("this is the api response", response)
                this.props.setTheUser(response.data)
                this.props.history.push('/')
            })
            .catch(err => console.log(err))   

    }
    enterUsernameStateValue = user => this.setState({ username: user.username })

    render() {
        return (
            <Container as="section">
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="textarea" readOnly={true}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.phone} name="phone" type="number" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="textarea" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.address} name="address" type="text" />
                    </Form.Group>
                    <h5>Social Media</h5>
                    <Form.Group>
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.instagram} name="instagram" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.facebook} name="facebook" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Website</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.website} name="website" type="text" />
                    </Form.Group>
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </Container>
        )
    } 
}

export default CompanyForm