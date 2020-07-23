import React, { Component } from 'react'

import LocalService from "../../../../../../services/LocalService"
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'

class LocalDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            local: undefined
        }
        this.localService = new LocalService()
    }
    componentDidMount = () => {
        const id = this.props.match.params.localId
        this.getLocalDetails(id)
    }
    getLocalDetails = id => {
        this.localService.getOneLocal(id)
            .then(response => this.setState({ local: response.data }))
            .catch(err => console.log(err))
    }
    isUserOwner = () => this.props.match.params.id === this.props.loggedInUser._id
    render() {
        return (
            <>
                {!this.state.local ? <h1>Cargando</h1> :
                    <Container as="main">
                        <h1>{this.state.local.name}</h1>
                        <p>{this.state.local.description}</p>
                        <h5>Facilities</h5>
                        <ul>
                            {this.state.local.facilities.map((facility, i) => <li key={i}>{facility}</li>)}
                        </ul>
                        <h5>Services</h5>
                        <ul>
                            {this.state.local.services.map((service, i) => <li key={i}>{service}</li>)}
                        </ul>
                        <h5>Location</h5>
                        <p>{this.state.local.location.address}</p>
                        {this.isUserOwner() &&
                            <Link to={`/user/${this.state.local.owner._id}/local/${this.state.local._id}/edit`} className="btn btn-dark btn-block btn-sm">Edit local</Link>
                        }

                    </Container>
                }
            </>
        )
    }
}

export default LocalDetail