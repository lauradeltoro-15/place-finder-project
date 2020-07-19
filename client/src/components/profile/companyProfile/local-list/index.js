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
    componentDidMount = () => this.updateLocalList()

    updateLocalList = id => {
        this.localService.getCompanyLocals(this.props.company)
            .then(response => this.setState({locals: response.data}))
            .catch(err => console.log(err))
    }

    render () {
        return (
            <>
                {!this.state.locals ? <h1>Cargando</h1>:
                <h1>Cargados los locales</h1>}
            </>
        )
    }
}

export default LocalList