import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import EventService from '../../../../services/EventService'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EventForm extends Component {
    constructor (props){
        super (props)
        this.state = {
            owner: this.props.loggedInUser._id,
            name: '',
            description: '',
            city: "",
            typeOfLocal: "",
            theme: [],
            participants: [this.props.loggedInUser._id],
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
        this.props.calendarDate && this.setState({ startTime: this.props.calendarDate, endTime: this.props.calendarDate })
    }
    formatDate = date => {
        const newDate = new Date(date)
        const hh = String(newDate.getHours()).padStart(2, '0')
        const min = String(newDate.getMinutes()).padStart(2, '0')
        let dd = String(newDate.getDate()).padStart(2, '0')
        let mm = String(newDate.getMonth() + 1).padStart(2, '0')
        let yyyy = newDate.getFullYear()
        return `${yyyy}-${mm}-${dd}T${hh}:${min}`
    }

    updateEventState = data => {
        this.setState({
            name: data.name || "",
            description: data.description || "",
            startTime: this.formatDate(data.startTime) || "",
            endTime: this.formatDate(data.endTime) || "",
            city: data.city || "",
            typeOfLocal: data.typeOfLocal || "",
            theme: data.theme || [],

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
                console.log("handle llega:", this.props.handleEventSubmit)

                this.props.handleEventSubmit ? this.props.handleEventSubmit() :
                this.props.history.push(`/profile/${this.props.loggedInUser._id}`) 
            })
            //.catch(err => this.setErrorMessage(err.response.data.message))
    }

    editEvent = (id, newEvent) => {
        this.eventService
            .editEvent(id, newEvent)
            .then(() => this.props.history.push(`/profile/${this.props.loggedInUser._id}`) )
            

            .catch(err => this.setErrorMessage(err.response.data.message))
    }

    render() {
        console.log(this.state)
        return (
            <>
                {this.state.name == undefined ? <h1>cargando</h1> :
                    <Container as='main'>
                        <Form onSubmit={this.handleFormSubmit}>
                            {this.props.location.pathname.includes("edit") ? <h1>Edit Event</h1> : <h1>Create Event</h1>}
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="textarea" />
                                <Form.Text className="text-muted">No more than 500 characters</Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Start time</Form.Label>
                                <Form.Control onChange={this.handleInputChange} type="datetime-local" name="startTime" value={this.state.startTime} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>End time</Form.Label>
                                <Form.Control onChange={this.handleInputChange} type="datetime-local" name="endTime" value={this.state.endTime} min={this.state.startTime} />
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
                            <Form.Group>
                                <Form.Label><h2>Theme of the event</h2></Form.Label>
                                <Form.Group>
                                    <Form.Label>Sport</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("sport")} value="sport" name="theme" type="checkbox" />
                                    <Form.Label>Learning</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("learning")} value="learning" name="theme" type="checkbox" />
                                    <Form.Label>Music</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("music")} value="music" name="theme" type="checkbox" />
                                    <Form.Label>Technology</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("technology")} value="technology" name="theme" type="checkbox" />
                                    <Form.Label>Health & Wellness</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("health and wellness")} value="health and wellness" name="theme" type="checkbox" />
                                    <Form.Label>Kids</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("kids")} value="kids" name="theme" type="checkbox" />
                                    <Form.Label>Adults</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("adults")} value="adults" name="theme" type="checkbox" />
                                    <Form.Label>Photography</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("photography")} value="photography" name="theme" type="checkbox" />
                                    <Form.Label>Art</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("art")} value="art" name="theme" type="checkbox" />
                                    <Form.Label>Food</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("food")} value="food" name="theme" type="checkbox" />
                                    <Form.Label>Languajes</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("languajes")} value="languajes" name="theme" type="checkbox" />
                                    <Form.Label>Culture</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("culture")} value="culture" name="theme" type="checkbox" />
                                    <Form.Label>Cinema</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("cinema")} value="cinema" name="theme" type="checkbox" />
                                    <Form.Label>Games</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("games")} value="games" name="theme" type="checkbox" />
                                    <Form.Label>Fashion</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("fashion")} value="fashion" name="theme" type="checkbox" />
                                    <Form.Label>Dance</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("bussiness")} value="bussiness" name="theme" type="checkbox" />
                                    <Form.Label>Bussiness</Form.Label>
                                    <input onChange={this.handleInputChange} checked={this.state.theme.includes("games")} value="games" name="theme" type="checkbox" />
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

export default EventForm