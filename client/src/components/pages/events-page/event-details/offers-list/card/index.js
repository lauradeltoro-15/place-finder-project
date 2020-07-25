import React, {Component} from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import OfferService from '../../../../../../services/OfferService'

class OfferCard extends Component {
    constructor (props){
        super (props)
        this.state = {
        }
        this.offerService = new OfferService()
    }

    acceptOffer = (offerId, eventId) => {
        this.offerService
            .acceptOffer(offerId, eventId, this.props.loggedInUser._id)
            .then(() => this.props.updateEventOffers(this.props.event._id))
            .catch(err => console.log(err))
    }

    deleteOffer = offerId => {
        this.offerService
            .deleteOffer(offerId, this.props.loggedInUser._id)
            .then(() => this.props.updateEventOffers(this.props.event._id))
            .catch(err => console.log(err))
    }

    render () {
 
        return (
            <>           
                <Col md={4}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title><h2>{this.props.offer.local.name}</h2></Card.Title>
                            <Card.Subtitle>Owner: {this.props.offer.local.owner.username} </Card.Subtitle>
                            <Card.Text>Price per person: {this.props.offer.price}</Card.Text>
                            <Card.Text>Status: {this.props.offer.status}</Card.Text>
                            <Card.Text>Capacity: {this.props.offer.local.capacity}</Card.Text>
                            <Card.Text>Address: {this.props.offer.local.location.address}</Card.Text>
                            <Card.Text>Facilities: <ul>{this.props.offer.local.facilities.map(facility => <li>{facility}</li>)}</ul></Card.Text>
                            <Card.Text>Services: <ul>{this.props.offer.local.services.map(services => <li>{services}</li>)}</ul></Card.Text>
                            <Card.Text>Address: {this.props.offer.local.localType}</Card.Text>
                            <Card.Text>Comments: {this.props.offer.description}</Card.Text>

                            {!this.props.loggedInUser.companyDetails && this.props.event.owner == this.props.loggedInUser._id && this.props.offer.status == 'pending' &&
                                <Button variant="primary" onClick={() => this.acceptOffer(this.props.offer._id, this.props.event._id)}>Accept Offer</Button>
                            }
                            {this.props.loggedInUser._id === this.props.offer.local.owner._id &&
                                <Button variant="danger" onClick={() => this.deleteOffer(this.props.offer._id)}>Delete Offer</Button>
                            }
                            
                        </Card.Body>
                    </Card>
                </Col>
            </>
        )
    }
}

export default OfferCard