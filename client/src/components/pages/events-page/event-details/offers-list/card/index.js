import React from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import './card.css'
import OfferService from '../../../../../../services/OfferService'
import Row from 'react-bootstrap/esm/Row'
import { Link } from 'react-router-dom'


const OfferCard = props => {

    const offerService = new OfferService()

    const acceptOffer = (offerId, eventId) => {
        offerService
            .acceptOffer(offerId, eventId, props.loggedInUser._id)
            .then(() => {
                props.updateMainPage()
                props.updateEventOffers(props.event._id)
            })
            .catch(err => err.response && props.handleToast(true, err.response.data.message))
    }

    const deleteOffer = offerId => {
        offerService
            .deleteOffer(offerId, props.loggedInUser._id)
            .then(() => props.updateEventOffers(props.event._id))
            .catch(err => err.response && props.handleToast(true, err.response.data.message))
    }

        return (
            <>
                <Row className='offer-row'>
                    <Col md={5} className='offer-Card'>
                        <div  className='avatar'>
                            <img src={props.offer.local.avatar} alt={props.offer.local.name}></img>
                        </div>
                        <span>{props.offer.local.name}</span>
                    </Col>
                    <Col md={5} className='offer-det'>
                        <span className="color-text-black">Price per person: </span>{props.offer.price}
                        <br></br>
                        <span className="color-text-black">Comments: </span> {props.offer.description}
                        <br></br>
                        {!props.loggedInUser.companyDetails && props.event.owner === props.loggedInUser._id && props.offer.status === 'pending' &&
                            <><Button className='offer-btn' variant="primary" onClick={() => acceptOffer(props.offer._id, props.event._id)}>Accept Offer</Button>
                                <Link to={`/user/${props.offer.local.owner._id}/local/${props.offer.local._id}`} ><Button className=" btn btn-yellow" type="submit">See more</Button></Link>
                            </>
                        }
                        {props.loggedInUser._id === props.offer.local.owner._id &&
                            <Button className='offer-btn' variant="danger" onClick={() => deleteOffer(props.offer._id)}>Delete Offer</Button>
                        }
                    </Col>
                </Row>
            </>
        )
    
}

export default OfferCard