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
            owner: this.props.loggedInUser._id,
            name: '',
            description: '',
            date: undefined,
            city: undefined,
            typeOfLocal: undefined,
            previousLoggedUser: undefined
        }
        this.userService = new UserService()
    }
    componentDidMount = () => {

        const id = this.props.match.params.eventId

        this.userService
            .getOneEvent(id)
            .then(response => this.setState({name: response.data.name, description: response.data.description, date: response.data.date, city: response.data.city, typeOfLocal: response.data.typeOfLocal,}))
            .catch(err => console.log(err))
    }

    enterUsernameStateValue = user => this.setState({ username: user.username })

    handleInputChange = e => e.target.type !== "checkbox" ? this.setState({ [e.target.name]: e.target.value })
        : this.handleCheckbox(e.target)

    handleCheckbox = (target) => {
        const stateToChange = [...this.state[target.name]]
        const index = stateToChange.indexOf(target.value)
        index === -1 ? stateToChange.push(target.value) : stateToChange.splice(index, 1)
        this.setState({ [target.name]: stateToChange })
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.userService
            .editEvent(this.props.match.params.eventId, this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push("/profile")
            })
            .catch(err => console.log(err))   

    }

    render () {

        return (
            <>
            { this.state.name == undefined ? <h1>cargando</h1>:
            <Container as='main'>
                <Form onSubmit={this.handleFormSubmit}>
                <h1>Edit Event</h1>
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
            }
            </>
        )
    }
}

export default EditEvent