import axios from 'axios'

export default class UserService {

    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    editUserProfile = (id, updatedUser) => this.service.put(`user/profile/edit/${id}`, updatedUser)
    getUserDetails = id => this.service.get(`user/profile/${id}`)
    
}