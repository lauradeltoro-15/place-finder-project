import axios from 'axios'

export default class AuthService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }
    findOneUser(id) {
        
    }
}