import React, { Component } from 'react'



class CompanyForm extends Component {
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
    handleInputChange = e => e.target.type !== "checkbox" ? this.setState({ [e.target.name]: e.target.value }) : this.handleCheckbox(e.target)

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
            <form >
                <label>Name</label>
                <input onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                <label>Description</label>
                <textarea onChange={this.handleInputChange} value={this.state.description} name="description"></textarea>
                <label>Address</label>
                <input onChange={this.handleInputChange} value={this.state.address} name="address" type="text" />
                <label>Capacity</label>
                <input onChange={this.handleInputChange} value={this.state.capacity} name="capacity" type="number" />
                <hr></hr>
                <label>Type of local </label>
                <label>Restaurant</label>
                <input onChange={this.handleInputChange} checked={this.state.localType === "restaurant"} value="restaurant" name="localType" type="radio" />
                <label>Gym</label>
                <input onChange={this.handleInputChange} checked={this.state.localType === "gym"} value="gym" name="localType" type="radio" />
                <label>Hotel</label>
                <input onChange={this.handleInputChange} checked={this.state.localType === "hotel"} value="hotel" name="localType" type="radio" />
                <label>Others</label>
                <input onChange={this.handleInputChange} checked={this.state.localType === "others"} value="others" name="localType" type="radio" />
                <hr></hr>
                <label>Services</label>
                <label>Staff</label>
                <input onChange={this.handleInputChange} checked={this.state.services.includes("staff")} value="staff" name="services" type="checkbox" />
                <label>Food Service</label>
                <input onChange={this.handleInputChange} checked={this.state.services.includes("food-service")} value="food-service" name="services" type="checkbox" />
                <label>Music</label>
                <input onChange={this.handleInputChange} checked={this.state.services.includes("music")} value="music" name="services" type="checkbox" />
                <label>Others</label>
                <input onChange={this.handleInputChange} checked={this.state.services.includes("others")} value="others" name="services" type="checkbox" />
                <hr></hr>
                <label>Facilities</label>
                <label>Kitchen</label>
                <input onChange={this.handleInputChange} checked={this.state.facilities.includes("kitchen")} value="kitchen" name="facilities" type="checkbox" />
                <label>Bathrooms</label>
                <input onChange={this.handleInputChange} checked={this.state.facilities.includes("bathrooms")} value="bathrooms" name="facilities" type="checkbox" />
                <label>Dinning hall</label>
                <input onChange={this.handleInputChange} checked={this.state.facilities.includes("dinning-hall")} value="dinning-hall" name="facilities" type="checkbox" />
                <label>Terrace</label>
                <input onChange={this.handleInputChange} checked={this.state.facilities.includes("terrace")} value="terrace" name="facilities" type="checkbox" />
                <label>Garden</label>
                <input onChange={this.handleInputChange} checked={this.state.facilities.includes("garden")} value="garden" name="facilities" type="checkbox" />
                <label>Pool</label>
                <input onChange={this.handleInputChange} checked={this.state.facilities.includes("pool")} value="pool" name="facilities" type="checkbox" />
                <label>Others</label>
                <input onChange={this.handleInputChange} checked={this.state.facilities.includes("other")} value="other" name="facilities" type="checkbox" />
                <hr></hr>
            </form>
        )
    }
}

export default CompanyForm