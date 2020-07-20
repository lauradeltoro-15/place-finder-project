import React, {Component} from 'react'

import LocalService from "../../../../services/LocalService"

import Container from 'react-bootstrap/Container'

class LocalDetail extends Component {
    constructor (){
        super ()
        this.state = {

        }
        this.localService = new LocalService()
    }

    render () {
        return (
            <Container as="main">
                <h1>Here the details</h1>
            </Container>
        )
    }
}

export default LocalDetail