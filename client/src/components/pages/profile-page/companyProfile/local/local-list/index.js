import React, {Component} from 'react'

import Row from 'react-bootstrap/Row'

import LocalCard from "./local-card"

import LocalService from "../../../../../../services/LocalService"

import { Link } from "react-router-dom"

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
        this.localService.getUserLocals(this.props.user)
            .then(response => this.setState({locals: response.data}))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }
    render () {
        return (
            <>
                {!this.state.locals ? <h1>Cargando</h1> :
                    <Row>
                        {this.state.locals.map(local => <LocalCard handleToast={this.props.handleToast} key={local._id} loggedInUser={this.props.loggedInUser} paramId={this.props.user} {...local} handleToast={this.props.handleToast} updateLocalList={this.updateLocalList}/>)}  
                    </Row>
                }
                {this.state.locals && this.state.locals.length === 0 && <p style={{ marginBottom: "100px" }}>You don't have any locals created. <Link className="color-text" to={`/user/${this.props.user}/local/add`}>Start adding yours!</Link></p>}
            </>
        )
    }
}

export default LocalList