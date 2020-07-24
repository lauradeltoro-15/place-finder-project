import axios from 'axios'

export default class LocalService {

    constructor() {

        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/local`,
            withCredentials: true
        })
    }

    createNewLocal = (id,newLocal) => this.service.post('/add', {id, newLocal})
    getUserLocals = id => this.service.get(`/${id}`)
    getOneLocal = id => this.service.get(`/details/${id}`)
    deleteLocal = id => this.service.delete(`/delete/${id}`)
    editLocal = (id, updatedLocal, localId) => this.service.put(`/edit/${localId}`, { id, updatedLocal })

}