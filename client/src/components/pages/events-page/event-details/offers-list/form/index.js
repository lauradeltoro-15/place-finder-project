import React, { Component } from 'react'

import LocalService from '../../../../../../services/LocalService'
import OfferService from '../../../../../../services/OfferService'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import SpinnerContainer from "../../../../../ui/Spinner"

class OfferForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            price: undefined,
            local: undefined,
            event: this.props.event,
            description: '',
            userLocals: undefined,
        }
        this.localService = new LocalService()
        this.offerService = new OfferService()

    }
    componentDidMount = () => this.setUserLocals(this.props.loggedInUser._id)

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleFormSubmit = e => {
        const stateCopy = { ...this.state }
        delete stateCopy.userLocals;
        e.preventDefault()
        this.offerService
            .createOffer(stateCopy, this.props.loggedInUser._id)
            .then(() => {
                this.props.handleEventSubmit()
                this.props.updateCalendarOffers && this.props.updateCalendarOffers()
            })
            .catch(err => !err.response ? null :
                err.response.status === 400  ? this.setState({ errorMsg: err.response.data.message }) :
                this.props.handleToast(true, err.response.data.message)) 
    }

    setUserLocals = (userId) => {
        this.localService
            .getUserLocals(userId)
            .then((response) => this.setState({ userLocals: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }

    render() {

        return (
            <>
                {!this.state.userLocals ? <SpinnerContainer /> :
                    <Container className='local-form-col'>
                        <Form onSubmit={this.handleFormSubmit}>
                            <h1 className='color-text'>New offer</h1>
                            <Form.Group>
                                <Form.Label>Price*</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.price} name="price" type="number" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Local*</Form.Label>
                                {this.state.userLocals && this.state.userLocals.map(local =>
                                    <div className='checked'>
                                    <label>{local.name}</label>
                                    <input onChange={this.handleInputChange} value={local._id} name="local" type="radio" />
                                    </div>
                                        
                                    
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description*</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="textarea" />
                            </Form.Group>
                            {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                            <Button variant="dark" type="submit">Submit</Button>
                        </Form>
                    </Container>
                }
            </>
        )
    }
}

export default OfferForm