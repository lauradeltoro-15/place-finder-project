import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import Events from '../../event/details/'

//Boostrap
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'

class Profile extends Component {
    constructor (props){
        super (props)
        this.state = {}
    }

    render () {
        
        return (
            <>

            {!this.props.loggedInUser ? <h1>Cargando</h1>:
            <Container>

                <h1>Username: {this.props.loggedInUser.username}</h1>
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
                <Events loggedInUser={this.props.loggedInUser}/>
            
                <Link to={`/profile/edit/${this.props.loggedInUser._id}`} ><Button variant="dark" type="submit">Edit</Button></Link>
                <Link to={`/event/create`} ><Button variant="dark" type="submit">Create a new event!</Button></Link>

            </Container>

            }
            </>
        )
    }
}

export default Profile