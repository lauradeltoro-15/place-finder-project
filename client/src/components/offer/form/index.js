import React, {Component} from 'react'

import LocalService from '../../../services/LocalService'

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
            userLocals: undefined
        }
        this.localService = new LocalService()

    }
    componentDidMount = () => this.setUserLocals(this.props.loggedInUser._id)

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleFormSubmit = e => {
        e.preventDefault()
        this.setState({previousLoggedUser: this.props.loggedInUser})
        this.userService
            .editUserProfile(this.props.loggedInUser._id , this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push(`/profile/${this.props.loggedInUser._id}`)
            })
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
                        <Form.Control as="select" onChange={this.handleInputChange} value={this.state.local} name="local" multiple>
                        {!this.state.userLocalsthis? <h2>cargando</h2> : this.state.userLocals.map(local => <option>{local.name}</option>)}
                        </Form.Control>
                        
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