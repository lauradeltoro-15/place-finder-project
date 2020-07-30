import React, {Component} from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import EventService from "../../../../../services/EventService"

class CommentForm extends Component {
    constructor (){
        super ()
        this.state = {
            comment: undefined
        }
        this.eventService = new EventService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value }) 

    handleFormSubmit = e => {
        e.preventDefault()
        this.eventService.postAComment(this.props.eventId, this.state.comment, this.props.loggedInUser._id)
            .then(() => {
                this.setState({comment: ""})
                this.props.updateEventInfo()
            })
            .catch(err => console.log(err))
    }
    
    render () {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <Form.Group className="comment-form">
                    <Form.Label htmlFor="comment">Enter your comment</Form.Label>
                    <Form.Control id="comment" onChange={this.handleInputChange} value={this.state.comment} name="comment" type="text"></Form.Control>
                    <Button className='button' size="lg" variant="dark" type="submit">Comment!</Button>
                </Form.Group>
            </Form>
        )
    }
}

export default CommentForm