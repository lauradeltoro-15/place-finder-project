import React, { Component } from 'react'

import OfferService from "../../../../../services/OfferService"

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
            .catch(err => console.log(err))
    }
    render() {
        return (
            <section>
                {this.state.offers.map(offer => <OfferCard loggedInUser={this.props.loggedInUser}
                    offer={offer} />)}
            </section>
        )
    }
}

export default OfferList

