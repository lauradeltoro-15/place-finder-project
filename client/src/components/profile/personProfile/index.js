import React, {Component} from 'react'
import { Link } from 'react-router-dom'

//Boostrap
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Profile extends Component {
    constructor (props){
        super (props)
        this.state = {}
    }

    render () {
        
        return (
            <>

        {!this.props.loggedInUser ? <h1>Cargando</h1>:

                    
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{this.props.loggedInUser.username}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Link to={`/profile/edit/${this.props.loggedInUser._id}`} ><Button variant="dark" type="submit">Edit</Button></Link>
                </Card.Body>
 
            </Card>}
            </>
        )
    }
}

export default Profile