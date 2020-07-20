import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import UserService from '../../services/UserService'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EditEvent extends Component {
    constructor (props){
        super (props)
        this.state = {
            owner: this.props.personDetails,
            name: '',
            description: '',
            date: undefined,
            city: undefined,
            typeOfLocal: undefined,
        }
        this.userService = new UserService()
    }

    render () {
        return (
            <>
            <Container as='main'>
                <Form onSubmit={this.handleFormSubmit}>
                <h1>Create Event</h1>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control  onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="text" />
                        <Form.Text className="text-muted">No mira than 500 characters</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.date} name="date" type="date" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.city} name="city" type="text" />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label><h2>Type of local</h2></Form.Label>
                    <Form.Group>
                        <label>Restaurant</label>
                        <input onChange={this.handleInputChange} checked={this.state.typeOfLocal === "restaurant"} value="restaurant" name="typeOfLocal" type="radio" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Gym</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.typeOfLocal === "gym"} value="gym" name="typeOfLocal" type="radio" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hotel</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.typeOfLocal === "hotel"} value="hotel" name="typeOfLocal" type="radio" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Other</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.typeOfLocal === "other"} value="other" name="typeOfLocal" type="radio" />
                    </Form.Group>
                    </Form.Group>
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </Container>
            </>
        )
    }
}

export default EditEvent