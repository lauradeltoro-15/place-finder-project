import React, {Component} from 'react'

import LocalService from '../../../services/LocalService'
import OfferService from '../../../services/OfferService'
import EventService from '../../../services/EventService'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class OfferForm extends Component {
    constructor (props){
        super (props)
        this.state = {
            price: undefined,
            local: undefined,
            event: this.props.match.params.eventId,
            description: '',
            userLocals: [],
            offerId: ''
        }
        this.localService = new LocalService()
        this.offerService = new OfferService()
        this.eventService = new EventService()

    }
    componentDidMount = () => this.setUserLocals(this.props.loggedInUser._id)

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleFormSubmit = e => {
        e.preventDefault()
        this.offerService
            .createOffer(this.state)
            .then(response => this.setState({offerId: response.data._id}))
            .then(()=> {this.eventService.addOffer(this.props.match.params.eventId, this.state.offerId)})
            .then((response) => console.log('la respuesta del serves es:', response))
            .catch(err => this.setState({ errorMsg: err.response.data.message }))

    }

    setUserLocals = (userId) => {
        this.localService
            .getUserLocals(userId)
            .then((response) => this.setState({userLocals: response.data}))
            .catch(err => console.log(err))

    }

    render () {
        
        return (
            <>
            <Container>
            <Form onSubmit={this.handleFormSubmit}>

                <Form.Label><h1>New offer</h1></Form.Label>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.price} name="price" type="number" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Local</Form.Label>
                        
                        {!this.state.userLocals? <h2>cargando</h2> : this.state.userLocals.map(local => 
                        
                        <Form.Group>
                                    <label>{local.name}</label>
                                    <input onChange={this.handleInputChange}  value={local._id} name="local" type="radio" />
                        </Form.Group>
                        
                        )}
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="textarea" />
                    </Form.Group>


                    {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                    
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>

            </Container>
            </>
        )
    }
}

export default OfferForm