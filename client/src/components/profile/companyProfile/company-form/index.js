import React, { Component } from 'react'

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
        }
    }
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        console.log(this.state)

    }
    render() {
        return (
            <Container as="section">
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="textarea" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.phone} name="phone" type="number" />
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