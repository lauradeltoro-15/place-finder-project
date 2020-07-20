import axios from 'axios'

export default class LocalService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    createNewLocal = (id,newLocal) => this.service.post('/local/add', {id, newLocal})
    getUserLocals = id => this.service.get(`/local/${id}`)
    getOneLocal = id => this.service.get(`local/details/${id}`)
    deleteLocal = id => this.service.delete(`/local/delete/${id}`)
    editLocal = (id, updatedLocal, localId) => this.service.put(`/local/edit/${localId}`, { id, updatedLocal })

}