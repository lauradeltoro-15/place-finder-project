import React, {Component} from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import LocalService from '../../../services/LocalService'

class OfferCard extends Component {
    constructor (props){
        super (props)
        this.state = {}
        this.localService = new LocalService()
    }

    
    render () {
        return (
            <>
                <Col md={4}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{this.props.name}</Card.Title>
                            <Card.Subtitle>Creator: {this.state.owner}</Card.Subtitle>
                            <Card.Text>Participants:{this.props.participants.length}</Card.Text>
                            <Card.Text>City:{this.props.city}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </>
        )
    }
}

export default OfferCard