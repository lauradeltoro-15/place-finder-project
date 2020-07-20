import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import LocalService from "../../../../../services/LocalService"

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class LocalCard extends Component {
    constructor (){
        super ()
        this.state = {

        }
        this.localService = new LocalService()
    }
    deleteCard = (id) => {
        this.localService.deleteLocal(id)
            .then(() => this.props.updateLocalList())
            .catch(err => console.log(err))
    }
    render() {
        const facilities = this.props.facilities.map((facility, i) => <li key={i}>{facility}</li>)
        const services = this.props.services.map((service, i) => <li key={i}>{service}</li>)
        return (
            <Col md={4}>
                <Card className="local-card">
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>{this.props.description}</Card.Text>
                        <Card.Text>{this.props.localType}</Card.Text>
                        <ul>
                            {facilities}
                        </ul>
                        <ul>
                            {services}
                        </ul>
                        <Card.Text>{this.props.location.address}</Card.Text>
                    </Card.Body>
                    <Button variant="dark" type="button" onClick={() => this.deleteCard(this.props._id)}>Delete local</Button>
                    <Link to={`/local/${this.props._id}`} className="btn btn-dark btn-block btn-sm">See details</Link>
                    <Link to={`user/${this.props.owner}/local/${this.props._id}/edit`} className="btn btn-dark btn-block btn-sm">Edit local</Link>
                </Card>
            </Col>
        )
    }
}

export default LocalCard
