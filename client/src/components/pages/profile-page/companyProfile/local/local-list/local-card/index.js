import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import LocalService from "../../../../../../../services/LocalService"

import './local-card.css'
import '../../../../../../App.css'
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
    deleteCard = (localId) => {
        this.localService.deleteLocal(localId, this.props.loggedInUser._id)
            .then(() => this.props.updateLocalList())
            .catch(err => console.log(err))
    }
    isUserTheProfileOwner = () => this.props.paramId ? this.props.loggedInUser._id === this.props.paramId : false
    render() {
        const facilities = this.props.facilities.map((facility, i) => <small className="btn btn-grey" key={i}>{facility}</small>)
        const services = this.props.services.map((service, i) => <small className="btn btn-green" key={i}>{service}</small>)
        return (
            <Col md={4}>
                <Card className="local-card">
                    <Card.Img variant="top" src={this.props.avatar} />
                    <Card.Body>
                        <Card.Title className="local color-text">{this.props.name}</Card.Title>
                        <Card.Text><span className="color-text-black">Description: </span> {this.props.description}</Card.Text>
                        <Card.Text><span className="local color-text-black">Type: </span>{this.props.localType} </Card.Text>
                        <Card.Text><span className="fac-sev color-text-black">Address:  </span>{this.props.location.address}</Card.Text>
                            <hr></hr>
                            <h6 className="fac-sev color-text-black">Facilities </h6>
                            {facilities}
                            <hr></hr>
                        
                            <h6 className="fac-sev color-text-black">Services </h6>
                            {services}
                            <hr></hr>
                            
                    </Card.Body>
                    <div className='local-btn'>
                        { this.isUserTheProfileOwner() &&
                        <>
                        <Button variant="danger" type="button" onClick={() => this.deleteCard(this.props._id)}>Delete local</Button>
                        <Link to={`/user/${this.props.owner}/local/${this.props._id}/edit`} ><Button variant="primary" type="button">Edit local</Button></Link>
                        </>
                        }
                        <Link to={`/profile/local/${this.props._id}/calendar`} ><Button variant="primary" type="submit">See your calendar!</Button></Link>
                        <Link to={`/user/${this.props.owner}/local/${this.props._id}`} ><Button className=" btn btn-yellow" type="submit">See more</Button></Link>
                    </div>

                </Card>
            </Col>
        )
    }
}

export default LocalCard
