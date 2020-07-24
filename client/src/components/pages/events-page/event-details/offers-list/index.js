import React, { Component } from 'react'

import OfferService from "../../../../../services/OfferService"

import OfferCard from './card'
import Row from 'react-bootstrap/Row'


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
            .catch(err => console.log(err))
    }

    render() {
        console.log('las props', this.props)
        console.log((this.props.loggedInUser._id == this.props.event.owner))
        return (
            <section>
                <Row>
                    {this.state.offers.map(offer => 
                        this.props.loggedInUser._id == this.props.event.owner || 
                        this.props.loggedInUser._id == offer.local.owner._id ?
                        <OfferCard event={this.props.event} updateEventOffers={this.updateEventOffers} loggedInUser={this.props.loggedInUser} offer={offer}/>
                        :
                        null)
                   }
                </Row>
            </section>
        )
    }
}

export default OfferList

