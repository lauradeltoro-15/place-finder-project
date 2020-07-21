import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import Events from '../../event/details/'

//Boostrap
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'

class Profile extends Component {
    constructor (props){
        super (props)
        this.state = {}
    }
    isUserTheProfileOwner = () =>  this.props.loggedInUser._id === this.props.paramId

    render () {
        console.log(this.props.loggedInUser, "logged in user en person  profile", this.props.paramId, "logged in user en person  profile" )
        return (
            <>

            {!this.props.loggedInUser ? <h1>Cargando</h1>:
            <Container>

                        <h1>Username: {this.props.userDetails.username}</h1>
                <hr></hr>
                <h5>Age</h5>
                {this.props.userDetails.personDetails.age}
                <hr></hr>
                <h5>Genre</h5>
                {this.props.userDetails.personDetails.genre}
                <hr></hr>
                <h5>Interests:</h5>

                {this.props.userDetails.personDetails.interests.map(hobbie => <h6>{hobbie}</h6>)}
                <hr></hr>
                <h5>Your events</h5>
                        <Events loggedInUser={this.props.loggedInUser} paramId={this.props.paramId}/>
                {this.isUserTheProfileOwner() && 
                    <>
                        <Link to={`/profile/edit/${this.props.loggedInUser._id}`} ><Button variant="dark" type="submit">Edit</Button></Link>
                        <Link to={`/user/${this.props.loggedInUser._id}/event/create`} ><Button variant="dark" type="submit">Create a new event!</Button></Link>
                    </>
                }
           
            </Container>

            }
            </>
        )
    }
}

export default Profile