import React, { Component } from 'react'

import "./comment-card.css"

class CommentCard extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        console.log(this.props, "las props de la carta")
        return (
            <>
                <article className="comment-card">
                    <div className="person-info-container">
                        <div className="avatar">
                            <img src={this.props.owner.avatar} alt="user avatar" />
                        </div>
                        <p>{this.props.owner.username}</p>
                    </div>
                    <div className="message-info-container">
                        <p>{this.props.message}</p>
                    </div>
                </article>
                <hr></hr>
            </>
        )
    }
}

export default CommentCard