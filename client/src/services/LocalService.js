import axios from 'axios'

export default class LocalService {

    constructor() {

        this.service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    createNewLocal = (id,newLocal) => this.service.post('/local/add', {id, newLocal})
    getUserLocals = id => this.service.get(`/local/${id}`)
    getOneLocal = id => this.service.get(`local/details/${id}`)
    deleteLocal = id => this.service.delete(`/local/delete/${id}`)
    editLocal = (id, updatedLocal, localId) => this.service.put(`/local/edit/${localId}`, { id, updatedLocal })

}