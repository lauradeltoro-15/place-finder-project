import axios from 'axios'

export default class EventService {

    constructor() {

        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/offer`,
            withCredentials: true
        })
    }

    createOffer = offer => this.service.post(`/create`, offer)
    getAllLocalOffers = localId => this.service.get(`/getAllLocalOffers/${localId}`)
    getAllEventsOffers = eventId => this.service.get(`/getAllEventsOffers/${eventId}`)
    deleteOffer = offerId => this.service.delete(`/delete/${offerId}`)
    acceptOffer = (offerId, eventId) => this.service.put(`/accept/${offerId}/event/${eventId}`)
    
}