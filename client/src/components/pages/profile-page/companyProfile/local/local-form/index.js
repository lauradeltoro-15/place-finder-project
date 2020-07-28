import React, { Component } from 'react'

import LocalService from "../../../../../../services/LocalService"
import FilesService from "../../../../../../services/FilesService"

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import LocationSearchInput from "./map"

class LocalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            location: {
                address: "",
                coordinates: {
                    lat: "",
                    lng: ""
                }
            },
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
        this.filesService = new FilesService()

    }
    componentDidMount = () => {
        const id = this.props.localToEdit
        id &&
            this.localService.getOneLocal(id)
                .then(response => this.updateLocalState(response.data))
                .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }
    updateLocalState = data => {
        this.setState({
            name: data.name || "",
            pictures: data.pictures || "",
            description: data.description || "",
            location: data.location || "",
            localType: data.localType || "",
            capacity: data.capacity || "",
            services: data.services || [],
            facilities: data.facilities || [],
        })
    }
    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("avatar", e.target.files[0])
        this.filesService.handleUpload(uploadData)
            .then(response => {
                console.log(response.data.secure_url)
                this.setState({ avatar: response.data.secure_url })
            })
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
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
        const id = this.props.loggedInUser._id
        console.log(id)
        const localId = this.props.localToEdit
        this.props.localToEdit ? this.editLocal(id, this.state, localId) : this.createNewLocal(id, this.state)
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
        console.log("we are here")
        this.localService.createNewLocal(id, state)
            .then(() => this.props.handleFormSubmit())
            .catch(err => !err.response ? null :
                err.response.status === 400 ? this.setState({ errorMsg: err.response.data.message }) :
                    this.props.handleToast(true, err.response.data.message))
    }

    setErrorMessage = errorMsg => this.setState({ errorMsg })

    editLocal = (id, state, localId) => {
        this.localService.editLocal(id, state, localId)
            .then(() => this.props.handleFormSubmit())
            .catch(err => !err.response ? null :
                err.response.status === 400 ? this.setState({ errorMsg: err.response.data.message }) :
                    this.props.handleToast(true, err.response.data.message))
    }
    handleAddressSelection = ({ lat, lng, address }) => {
        this.setState({
            location: {
                address,
                coordinates: {
                    lat,
                    lng
                }
            }
        })
    }
    getAvailableForm = () => {
        const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return weekDays.map(day =>
            <Form.Group>
                <Form.Label>{day}</Form.Label> &nbsp;
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
        return <div className='checked check'>{localTypes.map(local =>
            
                <div className='theme'>
                    <label>{local}</label>
                    <input onChange={this.handleInputChange} checked={this.state.localType === local} value={local} name="localType" type="radio" />
                </div>
            )}</div>
    }
    getServices = () => {
        const services = ["staff", "food-service", "music", "others",]
        return <div className='checked check'>{services.map(service =>
            
                <div className='theme'>
                    <label>{service}</label>
                    <input onChange={this.handleInputChange} checked={this.state.services.includes(service)} value={service} name="services" type="checkbox" />
                </div>
            )}</div>
    }
    getFacilities = () => {
        const facilities = ["kitchen", "bathrooms", "dinning-hall", "terrace", "garden", "pool", "audio equipment", "sport equipment", "conference room", "dance floor", "stage", "pit", "video equipment", "others"]
        return <div className='checked check'>{facilities.map(facility =>
            <div className='theme'>
                <label>{facility}</label>
                <input onChange={this.handleInputChange} checked={this.state.facilities.includes(facility)} value={facility} name="facilities" type="checkbox" />
            </div>)}</div>
    }
    render() {
        const availableForm = this.getAvailableForm()
        const localTypes = this.getLocalTypes()
        const services = this.getServices()
        const facilities = this.getFacilities()

        return (
            <Container as="section">
                <Form className='local-form-col' onSubmit={this.handleFormSubmit}>
                <h1 className='color-text'>{this.props.localToEdit ? "Edit local" : "New local"}</h1>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="textarea" onChange={this.handleInputChange} value={this.state.description} name="description" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Main image</Form.Label>
                        <Form.Control onChange={this.handleFileUpload} name="avatar" type="file" />
                    </Form.Group>
                    <Form.Group>
                        <LocationSearchInput handleAddressSelection={this.handleAddressSelection} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.capacity} name="capacity" type="number" />
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <h5 className='int-title'>LocalType</h5>
                        {localTypes}
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <h5 className='int-title'>Services</h5>
                        {services}
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <h5 className='int-title'>Facilities</h5>
                        {facilities}
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <h5 className='int-title'>Availability</h5>
                        {availableForm}
                    </Form.Group>
                    <hr></hr>
                    {this.state.errorMsg && <p className="errorMsg">{this.state.errorMsg}</p>}
                    <div className="button-center">
                        <Button variant="dark" type="submit">Submit</Button>
                    </div>
                </Form>
            </Container>
        )
    }
}

export default LocalForm