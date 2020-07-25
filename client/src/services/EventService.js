import axios from 'axios'

export default class EventService {

    constructor() {

        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/user/event`,
            withCredentials: true
        })
    }

    //events

    getAllEventsUser = userId => this.service.get(`/${userId}/all`)
    createEvent = (event,id) => this.service.post(`/create/${id}`, event)
    getOwnedEvents = userId => this.service.get(`/${userId}/owned`)
    getParticipantEvents = userId => this.service.get(`/${userId}/participant`)
    getOneEvent = eventId => this.service.get(`/event/${eventId}`)
    getEventByName = eventName => this.service.get(`/event/name/${eventName}`)
    editEvent = (eventId, newEvent, id) => this.service.put(`/event/${eventId}/${id}`, newEvent)
    deleteEvent = (eventId, id) => this.service.delete(`/delete/${eventId}/${id}`)
    getAllEvents = () => this.service.get('/getAllEvents')
    getEventOwner = eventId => this.service.get(`/getOwner/${eventId}`)
    joinEvent = (eventId, id) =>  this.service.put(`/join/${eventId}/${id}`)
    leaveEvent = (eventId, id) => this.service.put(`/leave/${eventId}/${id}`)
}