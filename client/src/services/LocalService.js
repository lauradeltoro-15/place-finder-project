import axios from 'axios'

export default class AuthService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    createNewLocal = (id,newLocal) => this.service.post('/local/add', {id, newLocal})
    getCompanyLocals = id => this.service.get(`/local/${id}`)

}