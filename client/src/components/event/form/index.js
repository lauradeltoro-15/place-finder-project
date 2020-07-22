import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import EventService from '../../../services/EventService'

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
            date: "",
            city: "",
            typeOfLocal: "",
            participants: [this.props.loggedInUser._id],
            previousLoggedUser: undefined,
            startTime: "",
            endTime: "",
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => {
        const id = this.props.match.params.eventId
        if (id) {
            this.eventService
                .getOneEvent(id)
                .then(response => this.updateEventState(response.data))
                .catch(err => console.log(err))
        }
    }

    updateEventState = data => {
        const date = new Date(data.date)
        let dd = String(date.getDate()).padStart(2, '0')
        let mm = String(date.getMonth() + 1).padStart(2, '0')
        let yyyy = date.getFullYear()
        console.log(`${yyyy}-${mm}-${dd}`, "esta es la fecha")
        this.setState({
            name: data.name || "",
            description: data.description || "",
            date: `${yyyy}-${mm}-${dd}` || "",
            city: data.city || "",
            typeOfLocal: data.typeOfLocal || "",

        })

    }

    enterUsernameStateValue = user => this.setState({ username: user.username })

    handleInputChange = e => {
        console.log(e.target.value, e.target.name)
        e.target.type !== "checkbox" ? this.setState({ [e.target.name]: e.target.value })
            : this.handleCheckbox(e.target)
    }

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
    setErrorMessage = errorMsg => this.setState({ errorMsg })

    createEvent = () => {
        this.eventService
        .createEvent(this.state)
            .then(() => {
                this.props.handleModal ? this.props.handleModal() :
                this.props.history.push(`/profile/${this.props.loggedInUser._id}`)
            })
            .catch(err => this.setErrorMessage(err.response.data.message))
    }
  
    editEvent = (id, newEvent) => {
        this.eventService
            .editEvent(id, newEvent)
            .then(response => {
                console.log("response.data", response.data)
                this.updateEventState(response.data)
                this.props.history.push(`/profile/${this.props.loggedInUser._id}`)
            })
            .catch(err => this.setErrorMessage(err.response.data.message))   
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
                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="textarea" />
                        <Form.Text className="text-muted">No more than 500 characters</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control onChange={this.handleInputChange}  value={this.state.date} name="date" type="date" />
                    </Form.Group>
                    <Form.Group>
                                <Form.Label>Start time</Form.Label>
                                <input onChange={this.handleInputChange} type="datetime-local" name="startDate" value={this.state.startDate}  />
                        <Form.Control onChange={this.handleInputChange} value={this.state.startTime} name="startTime" type="time" />
                    </Form.Group>
                    <Form.Group>
                                <Form.Label>End time</Form.Label>
                                <input onChange={this.handleInputChange} type="datetime-local" name="enDate" value={this.state.endDate} min={this.state.startdDate} />

                                <Form.Control onChange={this.handleInputChange} value={this.state.endTime} name="endTime" type="time" />
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
                            <Form.Label>Others</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.typeOfLocal === "others"} value="others" name="typeOfLocal" type="radio" />
                        </Form.Group>
                    </Form.Group>
                    {this.state.errorMsg && <p className="errorMsg">{this.state.errorMsg}</p>}
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </Container>
            }
            </>
        )
    }
}

export default EditEvent