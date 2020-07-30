import React, {Component} from 'react'

import CommentForm from "./comment-form"
import CommentCard from "./comment-card"

import "./comment-list.css"
class CommentList extends Component {
    constructor (){
        super ()
        this.state = {
            comments: undefined,
        }
    }

    render () {
        return (
            <section className="comments">  
                {this.props.comments.length > 0 ? this.props.comments.map(comment => <CommentCard key={comment._id} {...comment}/>) : <p>There are no comments yet.</p>}
                <CommentForm loggedInUser={this.props.loggedInUser} updateEventInfo={this.props.updateEventInfo} eventId={this.props.eventId}/>
            </section>
        )
    }
}

export default CommentList