import axios from 'axios'

export default class EventService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/user/event',
            withCredentials: true
        })
    }

    //events

    getAllEventsUser = userId => this.service.get(`/${userId}/all`)
    createEvent = event => this.service.post(`/create`, event)
    getOwnedEvents = userId => this.service.get(`/${userId}/owned`)
    getParticipantEvents = userId => this.service.get(`/${userId}/participant`)
    getOneEvent = eventId => this.service.get(`/event/${eventId}`)
    editEvent = (eventId, newEvent) => this.service.put(`/event/${eventId}`, newEvent)
    deleteEvent = (eventId) => this.service.delete(`/delete/${eventId}`)
    getAllEvents = () => this.service.get('/getAllEvents')
    getEventOwner = eventId => this.service.get(`/getOwner/${eventId}`)
    joinEvent = (eventId, userId) =>  this.service.put(`/join/${eventId}/${userId}`)
    leaveEvent = (eventId, userId) => this.service.put(`/leave/${eventId}/${userId}`)

    //offer-event interaction
    addOffer = (eventId, offerId) => this.service.put(`/${eventId}/offer/add/${offerId}`)
}