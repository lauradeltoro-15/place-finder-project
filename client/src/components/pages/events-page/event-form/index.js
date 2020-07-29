import React, { Component } from 'react'

import "./form.css"

import EventService from '../../../../services/EventService'
import FilesService from "../../../../services/FilesService"

//Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EventForm extends Component {
    constructor(props) {
        super(props)
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
        this.filesService = new FilesService()

    }

    componentDidMount = () => {
        const id = this.props.eventToEdit
        if (id) {
            this.eventService
                .getOneEvent(id)
                .then(response => this.updateEventState(response.data))
                .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
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

    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("avatar", e.target.files[0])
        this.filesService.handleUpload(uploadData)
            .then(response => this.setState({ avatar: response.data.secure_url }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
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
        const id = this.props.eventToEdit
        this.props.eventToEdit ? this.editEvent(id, this.state) : this.createEvent()
    }

    setErrorMessage = errorMsg => this.setState({ errorMsg })

    createEvent = () => {
        this.eventService
            .createEvent(this.state, this.props.loggedInUser._id)
            .then(() => {
                this.props.handleEventSubmit()
            })
            .catch(err => !err.response ? null :
                err.response.status === 400 ? this.setState({ errorMsg: err.response.data.message }) :
                    this.props.handleToast(true, err.response.data.message))
    }

    editEvent = (id, newEvent) => {
        this.eventService
            .editEvent(id, newEvent, this.props.loggedInUser._id)
            .then(() => this.props.handleEventSubmit())
            .catch(err => !err.response ? null :
                err.response.status === 400 ? this.setState({ errorMsg: err.response.data.message }) :
                    this.props.handleToast(true, err.response.data.message))
    }

    getThemes = () => {
        const theme = ["sport", "music", "learning", 'technology', 'health and wellness', 'kids', 'adults', 'photography', 'art', 'food', 'languajes', 'culture', 'cinema', 'games', 'fashion', 'dance', 'bussiness']
        return <><h5 className='int-title'>Theme</h5>

            <div className='check checked'>
                {theme.map((theme,i) =>
                    <div className='theme' key={i}>
                        <label>{theme}</label>
                        <input onChange={this.handleInputChange} checked={this.state.theme.includes(theme)} value={theme} name="theme" type="checkbox" />
                    </div>
                )}
            </div>
        </>
    }

    render() {
        return (
            <>
                {this.state.name == undefined ? null :
                    <main className="main-bg">
                        <Form className="local-form-col-new-event" onSubmit={this.handleFormSubmit}>
                            {this.props.eventToEdit ? <h1 className='color-text'>Edit Event</h1> : <h1 className='color-text'>Create Event</h1>}
                            <Form.Group className="col-md-12">
                                <Form.Label className="color-text-black">Name*</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                            </Form.Group>
                            <Form.Group className="col-md-12">
                                <Form.Label className="color-text-black">Description*</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="textarea" />
                            </Form.Group>
                            <Form.Group className="col-md-12">
                                <Form.Label>Main image</Form.Label>
                                <Form.Control onChange={this.handleFileUpload} name="avatar" type="file" />
                            </Form.Group>
                            <div class="small-input-container">
                                <Form.Group className="col-md-6">
                                    <Form.Label className="color-text-black">Start time*</Form.Label>
                                    <Form.Control className="small-input" onChange={this.handleInputChange} type="datetime-local" name="startTime" value={this.state.startTime} />
                                </Form.Group>
                                <Form.Group className="col-md-6">
                                    <Form.Label className="color-text-black">End time*</Form.Label>
                                    <Form.Control className="small-input" onChange={this.handleInputChange} type="datetime-local" name="endTime" value={this.state.endTime} min={this.state.startTime} />
                                </Form.Group>
                            </div>
                            <Form.Group className="col">
                                <Form.Label className="color-text-black">City*</Form.Label>
                                <Form.Control className="small-input" onChange={this.handleInputChange} value={this.state.city} name="city" type="text" />
                            </Form.Group>
                            <Form.Group className="col-md-12">
                                <Form.Label className="color-text-black">Type of local</Form.Label>
                                <div class="small-input-container check">
                                    <Form.Group>
                                        <Form.Label>Restaurant</Form.Label>
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
                                </div>
                            </Form.Group>

                            <Form.Group>
                                {this.getThemes()}
                            </Form.Group>

                            {this.state.errorMsg && <p className="errorMsg">{this.state.errorMsg}</p>}
                            <div className="button-center">
                                <Button variant="dark" type="submit">Submit</Button>
                            </div>
                        </Form>
                    </main>

                }
            </>
        )
    }
}

export default EventForm