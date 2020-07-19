import React, {Component} from 'react'

import LocalService from "../../../../services/LocalService"

class LocalList extends Component {
    constructor (){
        super ()
        this.state = {
            locals: undefined,
        }
        this.localService = new LocalService()
    }
    //componentDidMount = () => this.updateLocalList()

    updateLocalList = () => {
        this.localService
    }

    render () {
        return (
            <>
            </>
        )
    }
}

export default LocalList