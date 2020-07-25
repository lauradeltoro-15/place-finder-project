import React, { Component } from 'react'

import LocalService from "../../../../../../services/LocalService"
import { Link } from 'react-router-dom'
import './local-det.css'

import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }
    isUserOwner = () => this.props.match.params.id === this.props.loggedInUser._id
    render() {
        return (
            <>
                {!this.state.local ? <h1>Cargando</h1> :
                    <Container fluid  as="main" className='main-cont' >
                        <Row>
                            
                            <Col md={{ span: 5, offset: 1 }} className='content'>
                            <h1 className='color-text'>{this.state.local.name}</h1>
                            
                            <span className="color-text-black">Owner: </span> {this.state.local.owner.username}
                            <br></br>
                            <br></br>
                            <span className="color-text-black">Description: </span> {this.state.local.description}
                            <br></br>
                            <br></br>
                            <span className="color-text-black">Capacity: </span> {this.state.local.capacity}
                            <br></br>
                            <br></br>
                            <span className="color-text-black">Location: </span> {this.state.local.location.address}
                            <br></br>
                          
                            <hr></hr>
                            <h5>Facilities</h5>
                            
                                {this.state.local.facilities.map((facility, i) => <small className="btn btn-grey" key={i}>{facility}</small>)}
                            <hr></hr>
                            <h5 className='color-text-black'>Services</h5>
                            
                                {this.state.local.services.map((service, i) => <small className="btn btn-grey" key={i}>{service}</small>)}

                            </Col>

                            <Col className='img-local' md={{span: 5, offset: 1}}>
                                <img src={this.state.local.avatar} />
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col md={{span: 2, offset: 5}}>
                            {this.isUserOwner() &&
                            <Link to={`/user/${this.state.local.owner._id}/local/${this.state.local._id}/edit`} className="btn btn-dark btn-block btn-sm local-btn">Edit local</Link>
                            }
                            </Col>
                        </Row>


                    </Container>
                }
            </>
        )
    }
}

export default LocalDetail