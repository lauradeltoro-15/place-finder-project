import React, { Component } from 'react'

import LocalService from "../../../../../../services/LocalService"

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

class LocalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            pictures: "",
            description: "",
            location: "",
            capacity: "",
            localType: "",
            services: [],
            facilities: [],
            availability: {
                Monday: {
                    available: false,
                },
                Tuesday: {
                    available: false,
                },
                Wednesday: {
                    available: false,
                },
                Thursday: {
                    available: false,
                },
                Friday: {
                    available: false,
                },
                Saturday: {
                    available: false,
                },
                Sunday: {
                    available: false,
                }
            }
        }
        this.localService = new LocalService()
    }
    componentDidMount = () => {
        const id = this.props.match.params.localId
        this.localService.getOneLocal(id)
            .then(response => this.updateLocalState(response.data))
            .catch(err => console.log(err))
    }
    updateLocalState = data => {
        this.setState({
            name: data.name || "",
            pictures: data.pictures || "",
            description: data.description || "",
            location: data.location.address || "",
            localType: data.localType || "",
            capacity: data.capacity || "",
            services: data.services || [],
            facilities: data.facilities || [],
        })
    }

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
        const { id, localId } = this.props.match.params
        this.props.location.pathname.includes("edit") ? this.editLocal(id, this.state, localId) : this.createNewLocal(id, this.state)
    }
    handleAvailability = e => {
        this.setState({
            availability: {
                ...this.state.availability,
                [e.target.name]: {
                    available: !this.state.availability[e.target.name].available,
                    startTime: "00:00",
                    endTime: "23:59"
                }
            }
        })
    }
    handleAvailabilityHours = e => {
        const day = e.target.getAttribute("data-day")
        this.setState({
            availability: {
                ...this.state.availability,
                [day]: {
                    ...this.state.availability[day],
                    [e.target.name]: e.target.value
                }
            }
        })
    }
    createNewLocal = (id, state) => {
        this.localService.createNewLocal(id, state)
            .then(response => {
                console.log(response)
                this.props.history.push(`/profile/${this.props.loggedInUser._id}`)
            })
            .catch(err => this.setErrorMessage(err.response.data.message))
    }

    setErrorMessage = errorMsg => this.setState({ errorMsg })

    editLocal = (id, state, localId) => {
        this.localService.editLocal(id, state, localId)
            .then(() => this.props.history.push(`/profile/${this.props.loggedInUser._id}`))
        //.catch(err => this.setErrorMessage(err.response.data.message))
    }

    getAvailableForm = () => {
        const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return weekDays.map(day =>
            <Form.Group>
                <Form.Label>{day}</Form.Label>
                <input onChange={this.handleAvailability} checked={this.state.availability[day].available} value="1" name={`${day}`} type="checkbox" />
                {this.state.availability[day].available &&
                    <>
                        <Form.Label>Start time</Form.Label>
                        <Form.Control type="time" onChange={this.handleAvailabilityHours} value={this.state.availability[day].startTime} data-day={day} name="startTime" />
                        <Form.Label>End time</Form.Label>
                        <Form.Control type="time" onChange={this.handleAvailabilityHours} value={this.state.availability[day].endTime} data-day={day} name="endTime" min={this.state.availability[day].startTime} />
                    </>}
            </Form.Group>)
    }
    getLocalTypes = () => {
        const localTypes = ["restaurant", "gym", "hotel", "others"]
        return localTypes.map(local =>
            <Form.Group>
                <label>{local}</label>
                <input onChange={this.handleInputChange} checked={this.state.localType === local} value={local} name="localType" type="radio" />
            </Form.Group>)
    }
    getServices = () => {
        const services = ["staff", "food-service", "music", "others",]
        return services.map(service =>
            <Form.Group>
                <label>{service}</label>
                <input onChange={this.handleInputChange} checked={this.state.services.includes(service)} value={service} name="services" type="checkbox" />
            </Form.Group>)
    }
    getFacilities = () => {
        const facilities = ["kitchen", "bathrooms", "dinning-hall", "terrace", "garden", "pool", "audio equipment", "sport equipment", "conference room", "dance floor", "stage", "pit", "video equipment", "others"]
        return facilities.map(facility =>
            <Form.Group>
                <label>{facility}</label>
                <input onChange={this.handleInputChange} checked={this.state.facilities.includes(facility)} value={facility} name="facilities" type="checkbox" />
            </Form.Group>)
    }
    render() {
        const availableForm = this.getAvailableForm()
        const localTypes = this.getLocalTypes()
        const services = this.getServices()
        const facilities = this.getFacilities()

        return (
            <Container as="section">
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="textarea" onChange={this.handleInputChange} value={this.state.description} name="description" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.location} name="location" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.capacity} name="capacity" type="number" />
                    </Form.Group>
                    <hr></hr>
                    <Form.Label><h2>LocalType</h2></Form.Label>
                    {localTypes}
                    <hr></hr>
                    <Form.Label><h2>Services</h2></Form.Label>
                    {services}
                    <hr></hr>
                    <Form.Label><h2>Facilities</h2></Form.Label>
                    {facilities}
                    <hr></hr>
                    <Form.Label><h2>Availability</h2></Form.Label>
                    {availableForm}
                    <hr></hr>
                    {this.state.errorMsg && <p className="errorMsg">{this.state.errorMsg}</p>}
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </Container>
        )
    }
}

export default LocalForm