import axios from 'axios'

export default class EventService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/offer',
            withCredentials: true
        })
    }

    createOffer = offer => this.service.post(`/create`, offer)

    // createEvent = event => this.service.post(`/create`, event)
    // getPersonEvents = id => this.service.get(`/${id}`)
    // getOneEvent = eventId => this.service.get(`/event/${eventId}`)
    // editEvent = (eventId, newEvent) => this.service.put(`/event/${eventId}`, newEvent)
    // deleteEvent = (eventId) => this.service.delete(`/delete/${eventId}`)
}