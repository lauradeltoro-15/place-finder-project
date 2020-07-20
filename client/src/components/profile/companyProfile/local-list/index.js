import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import LocalCard from "./local-card"

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

    updateLocalList = () => {
        this.localService.getCompanyLocals(this.props.company)
            .then(response => this.setState({locals: response.data}))
            .catch(err => console.log(err))
    }

    render () {
        return (
            <>
                {!this.state.locals ? <h1>Cargando</h1> :
                    <Row>
                        {this.state.locals.map(local => <LocalCard key={local._id} {...local} updateLocalList={this.updateLocalList}/>)}  
                    </Row>
                }
            </>
        )
    }
}

export default LocalList