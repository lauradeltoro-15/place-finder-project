import React, { Component } from 'react'

import LocalService from "../../../services/LocalService"

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
            facilities: data.facilities || []

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
        const userIid = this.props.match.params.id
        const localId = this.props.match.params.localId
        this.props.location.pathname.includes("edit") ? this.editLocal(userIid, this.state, localId) : this.createNewLocal(userIid, this.state)     
    }

    createNewLocal = (id, state) => {
        this.localService.createNewLocal(id, state)
            .then(() => this.props.history.push(`/profile/${this.props.loggedInUser._id}`))
            .catch(err => this.setErrorMessage(err.response.data.message))
    }
    setErrorMessage = errorMsg => this.setState({ errorMsg })
    
    editLocal = (id, state, localId) => {
        this.localService.editLocal(id, state, localId)
            .then(() => this.props.history.push(`/profile/${this.props.loggedInUser._id}`))
            //.catch(err => this.setErrorMessage(err.response.data.message))
    }

    render() {
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
                    <Form.Group>
                        <label>Restaurant</label>
                        <input onChange={this.handleInputChange} checked={this.state.localType === "restaurant"} value="restaurant" name="localType" type="radio" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Gym</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.localType === "gym"} value="gym" name="localType" type="radio" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hotel</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.localType === "hotel"} value="hotel" name="localType" type="radio" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Others</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.localType === "others"} value="others" name="localType" type="radio" />
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <Form.Label><h2>Services</h2></Form.Label>
                        <Form.Label>Staff</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.services.includes("staff")} value="staff" name="services" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Food Service</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.services.includes("food-service")} value="food-service" name="services" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Music</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.services.includes("music")} value="music" name="services" type="checkbox" />
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Others</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.services.includes("others")} value="others" name="services" type="checkbox" />
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <Form.Label><h2>Facilities</h2></Form.Label>
                        <Form.Label>Kitchen</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("kitchen")} value="kitchen" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bathrooms</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("bathrooms")} value="bathrooms" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dinning hall</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("dinning-hall")} value="dinning-hall" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Terrace</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("terrace")} value="terrace" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Garden</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("garden")} value="garden" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pool</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("pool")} value="pool" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Audio equipment</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("audio equipment")} value="audio equipment" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sport equipment</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("sport equipment")} value="sport equipment" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Conference Room</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("conference room")} value="conference room" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dance Floor</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("dance floor")} value="dance floor" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Stage</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("stage")} value="stage" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pit</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("pit")} value="pit" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Video equipment</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("video equipment")} value="video equipment" name="facilities" type="checkbox" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Others</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("other")} value="other" name="facilities" type="checkbox" />
                    </Form.Group>
                    <hr></hr>
                    {this.state.errorMsg && <p className="errorMsg">{this.state.errorMsg }</p>}
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </Container>
        )
    }
}

export default LocalForm