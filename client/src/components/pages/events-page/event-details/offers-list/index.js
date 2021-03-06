import React, { Component } from 'react'

import OfferService from "../../../../../services/OfferService"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import OfferCard from './card'

class OfferList extends Component {
    constructor() {
        super()
        this.state = {
            offers: []
        }
        this.offerService = new OfferService()
    }
    componentDidMount = () => this.updateEventOffers(this.props.eventId)

    updateEventOffers = eventId => {
        this.offerService.getAllEventsOffers(eventId)
            .then(response => this.setState({ offers: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }
    isAnOfferAccepted = () => this.state.offers.some(offer => offer.status === "accepted")

    isEventOwnerOrOfferOwner = () => {
        if (this.state.offers.length > 0) {
            return this.state.offers.some(offer => this.props.loggedInUser._id === this.props.event.owner ||
                this.props.loggedInUser._id === offer.local.owner._id)    
        }
    }
    componentWillUpdate = (prevProps, prevState) => this.state.offers !== prevState.offers && this.render()
    
    render() {
        return (
            <section className='offers'>
                <Row >
                    {this.props.loggedInUser && this.isEventOwnerOrOfferOwner() && !this.isAnOfferAccepted() &&<Col className='offer-title'><h6>OFFERS</h6></Col>}
                    {this.props.loggedInUser && this.state.offers.length > 0 && !this.isAnOfferAccepted() && this.state.offers.map(offer =>
                        (this.props.loggedInUser._id === this.props.event.owner || 
                        this.props.loggedInUser._id === offer.local.owner._id) ?
                            <OfferCard event={this.props.event} updateMainPage={this.props.updateMainPage} key={offer._id} updateEventOffers={this.updateEventOffers} loggedInUser={this.props.loggedInUser} offer={offer} handleToast={this.props.handleToast}/>
                        : null)
                   }
                </Row>
            </section>
        )
    }
}

export default OfferList

