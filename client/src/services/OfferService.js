import axios from 'axios'

export default class EventService {

    constructor() {

        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/offer`,
            withCredentials: true
        })
    }

    createOffer = (offer,id) => this.service.post(`/create/${id}`, offer)
    getAllLocalOffers = localId => this.service.get(`/getAllLocalOffers/${localId}`)
    getAllEventsOffers = eventId => this.service.get(`/getAllEventsOffers/${eventId}`)
    deleteOffer = (offerId,id) => this.service.delete(`/delete/${offerId}/${id}`)
    acceptOffer = (offerId, eventId,id) => this.service.put(`/accept/${offerId}/event/${eventId}/${id}`)
    
}