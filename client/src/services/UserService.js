import axios from 'axios'

export default class UserService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/',
            withCredentials: true
        })
    }

    //user
    editUserProfile = (id, updatedUser) => this.service.post(`user/profile/edit/${id}`, updatedUser)
    getUserDetails = id => this.service.get(`user/profile/${id}`)

    //events
    createEvent = event => this.service.post(`user/event/create`, event)
    getPersonEvents = personId => this.service.get(`user/event/${personId}`)
}