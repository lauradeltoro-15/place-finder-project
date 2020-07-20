import axios from 'axios'

export default class EventService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/user/event',
            withCredentials: true
        })
    }

    //events
    createEvent = event => this.service.post(`/create`, event)
    getPersonEvents = id => this.service.get(`/${id}`)
    getOneEvent = eventId => this.service.get(`/event/${eventId}`)
    editEvent = (eventId, newEvent) => this.service.post(`/event/${eventId}`, newEvent)
    deleteEvent = (eventId) => this.service.get(`/delete/${eventId}`)
}