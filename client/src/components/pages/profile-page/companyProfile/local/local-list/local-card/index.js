import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import LocalService from "../../../../../../../services/LocalService"

import './local-card.css'
import '../../../../../../App.css'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import UiModal from "../../../../../../ui/Modal"
import LocalForm from "../../local-form"

class LocalCard extends Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
        }
        this.localService = new LocalService()
    }

    deleteCard = (localId) => {
        this.localService.deleteLocal(localId, this.props.loggedInUser._id)
            .then(() => this.props.updateLocalList())
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }

    handleFormModal = status => this.setState({ showModal: status })

    handleFormSubmit = () => {
        this.handleFormModal(false)
        this.props.updateLocalList()
    }

    isUserTheProfileOwner = () => this.props.paramId ? this.props.loggedInUser._id === this.props.paramId : false

    render() {
        return (
            <Col md={4}>
                <Card className="local-card">
                    <Card.Img variant="top" src={this.props.avatar} />
                    <Card.Body>
                        <Card.Title className="local color-text">{this.props.name}</Card.Title>
                        <Card.Text><span className="color-text-black">Description: </span> {this.props.description}</Card.Text>
                        <Card.Text><span className="local color-text-black">Type: </span>{this.props.localType} </Card.Text>
                        <Card.Text><span className="fac-sev color-text-black">Address:  </span>{this.props.location.address}</Card.Text>
                        <Card.Text><span className="fac-sev color-text-black">Capacity:  </span>{this.props.capacity}</Card.Text>
                    </Card.Body>
                    <div className='local-btn'>
                        {this.isUserTheProfileOwner() &&
                            <>
                                <Button variant="danger" type="button" onClick={() => this.deleteCard(this.props._id)}>Delete local</Button>
                            <Button variant="primary"  onClick={() => this.handleFormModal(true)} type="button">Edit local</Button>
                            </>
                        }
                        <Link to={`/profile/local/${this.props._id}/calendar`} ><Button variant="primary" type="submit">See your calendar!</Button></Link>
                        <Link to={`/user/${this.props.owner}/local/${this.props._id}`} ><Button className=" btn btn-yellow" type="submit">See more</Button></Link>
                    </div>
                    <UiModal handleModal={this.handleFormModal} show={this.state.showModal} >
                        <LocalForm eventToEdit={this.props._id} localToEdit={this.props._id} loggedInUser={this.props.loggedInUser} handleToast={this.props.handleToast} handleFormSubmit={this.handleFormSubmit} />
                    </UiModal>
                </Card>
            </Col>
        )
    }
}

export default LocalCard
