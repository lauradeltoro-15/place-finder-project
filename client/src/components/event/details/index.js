import React, {Component} from 'react'
import EventService from '../../../services/EventService'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

class EventDetails extends Component {

    constructor (props){
        super (props)
        this.state = {
            eventDetails: undefined,
            owner: undefined
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => {
        
        this.updateState(this.props.match.params.eventId, this.props.match.params.userId )
    }

    updateState = (eventId, userId) => {

        this.eventService
            .getOneEvent(eventId)
            .then(response => this.setState({eventDetails: response.data}))
            .catch(error => console.log(error))

        this.eventService
            .getEventOwner(userId)
            .then((response) => this.setState({owner: response.data.owner.username}))
            .catch(err => console.log(err))
    }


    render () {

        return (
            <>
            {!this.state.eventDetails ? <h1>cargando</h1> : 
                <>
                <Container>
                    <Row>
                        <Col>
                        <h1>{this.state.eventDetails.name}</h1>
                        <p>Creator: {this.state.owner}</p>
                        <p>Description: {this.state.eventDetails.name}</p>
                        <p>Date: {this.state.eventDetails.date}</p>
                        <p>City: {this.state.eventDetails.city}</p>
                        <p>Type of local: {this.state.eventDetails.typeOfLocal}</p>
                        <p>Number of participants:{this.state.eventDetails.participants.length} </p>
                        <ul>Theme: {this.state.eventDetails.theme.map(theme => <li>{theme}</li>)} </ul>
                        </Col>
                    </Row>
                </Container>
                
                </>
            }
            </>
        )
    }
}

export default EventDetails