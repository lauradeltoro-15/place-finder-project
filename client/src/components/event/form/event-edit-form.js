import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import UserService from '../../../services/UserService'

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
            .then(response => this.updateEventState(response.data))
            .catch(err => console.log(err))
    }
    updateEventState = data => {
        this.setState({
            name: data.name || "",
            description: data.description || "",
            date: data.date || "",
            city: data.city || "",
            typeOfLocal: data.typeOfLocal || "",

        })

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
        const id = this.props.match.params.eventId
        this.props.location.pathname.includes("edit") ? this.editEvent(id, this.state) : this.createEvent()
    }

    createEvent = () => {
        this.userService
        .createEvent(this.state)
        .then(() => this.props.history.push("/profile"))
        .catch(err => console.log(err))
    }
  
    editEvent = (id, newEvent) => {
        this.userService
            .editEvent(id, newEvent)
            .then(() => this.props.history.push("/profile"))
            .catch(err => console.log(err))   
    }


    render () {

        return (
            <>
            { this.state.name == undefined ? <h1>cargando</h1>:
            <Container as='main'>
                <Form onSubmit={this.handleFormSubmit}>
                {this.props.location.pathname.includes("edit") ? <h1>Edit Event</h1> : <h1>Create Event</h1>}
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