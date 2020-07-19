import React, {Component} from 'react'
import { Link } from 'react-router-dom'

//Boostrap
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'

class Profile extends Component {
    constructor (props){
        super (props)
        this.state = {}
    }

    render () {
        console.log('los detalles' , this.props.userDetails.personDetails)
        
        return (
            <>

            {!this.props.loggedInUser ? <h1>Cargando</h1>:
            <Container>

            <h1>Username: {this.props.loggedInUser.username}</h1>
            <h3>Interests:</h3>

                {this.props.userDetails.personDetails.interests.map(hobbie => <h6>{hobbie}</h6>)}
            
                <Link to={`/profile/edit/${this.props.loggedInUser._id}`} ><Button variant="dark" type="submit">Edit</Button></Link>

            </Container>

            }
            </>
        )
    }
}

export default Profile