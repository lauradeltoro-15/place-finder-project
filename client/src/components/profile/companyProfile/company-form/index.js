import React, { Component } from 'react'

class CompanyForm extends Component {
    constructor() {
        super()
        this.state = {
            description: "",
            phone: "",
            address: "",
        }
    }
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()

    }
    render() {
        return (
            <form>
                <label>Description</label>
                <textarea onChange={this.handleInputChange} value={this.state.description} name="description"></textarea>
                <label>Phone number</label>
                <input onChange={this.handleInputChange} value={this.state.phone} name="phone" type="number" />
                <label>Address</label>
                <input onChange={this.handleInputChange} value={this.state.address} name="address" type="text" />
            </form>
        )
    }
}

export default CompanyForm