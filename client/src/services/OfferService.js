import axios from 'axios'

export default class EventService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/offer',
            withCredentials: true
        })
    }

    createOffer = offer => this.service.post(`/create`, offer)

}