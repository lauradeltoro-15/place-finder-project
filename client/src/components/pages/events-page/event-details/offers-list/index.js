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
        return (
            <section>
                <Row>
                    {this.state.offers.map(offer => <OfferCard loggedInUser={this.props.loggedInUser}
                        offer={offer} />)}
                </Row>
            </section>
        )
    }
}

export default OfferList

