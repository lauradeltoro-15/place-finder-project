import axios from 'axios'

export default class UserService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/',
            withCredentials: true
        })
    }

    editCompanyProfile = (id, updatedUser) => this.service.post(`profile/company/edit/${id}`, updatedUser)
    getPersonDetails = (personDet_id) => this.service.get(`person/personDetails/${personDet_id}`)

}