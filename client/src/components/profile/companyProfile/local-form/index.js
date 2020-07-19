import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

class LocalForm extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            pictures: "",
            description: "",
            address: "",
            capacity: "",
            localType: "",
            services: [],
            facilities: [],
            events: "",


        }
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
                        <Form.Control onChange={this.handleInputChange} value={this.state.address} name="address" type="text" />
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
                        <Form.Label>Services</Form.Label>
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
                        <Form.Label>Facilities</Form.Label>
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
                        <Form.Label>Others</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.facilities.includes("other")} value="other" name="facilities" type="checkbox" />
                    </Form.Group>
                    <hr></hr>
                </Form>
            </Container>
        )
    }
}

export default LocalForm