import axios from 'axios'

export default class CompanyServices {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/company',
            withCredentials: true
        })
    }

}