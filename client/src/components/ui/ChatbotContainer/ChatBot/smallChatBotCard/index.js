
import React, { Component } from "react"

import "./smallChatBotCard.css"

import Collapse from 'react-bootstrap/Collapse'

class SmallCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClick = () => {
        this.setState({ open: !this.state.open })
    }

    obtainDateInFormat = date => {
        const newDate = new Date(date)
        let dd = String(newDate.getDate()).padStart(2, '0')
        let mm = String(newDate.getMonth() + 1).padStart(2, '0')
        let yyyy = newDate.getFullYear()
        return `${dd}-${mm}-${yyyy}`
    }

    render() {
        const { open } = this.state
        const themes = this.props.event.theme.map((elem, i) => <small className="btn btn-grey" key={i}>{elem}</small>)
        return (
            <div className="small-cont">
                <article className="small-card">
                    <div className="image-container-small">
                        <img src={this.props.event.avatar} alt={ this.props.event.name }/>
                    </div>
                    <div>
                        <p
                            className="small-card-info"
                            onClick={this.handleClick}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}>{this.props.event.name}</p>
                        <small>{this.obtainDateInFormat(this.props.event.startTime)}</small>
                    </div>
                </article>
                <Collapse in={open} timeout={0}>
                    <div id="example-collapse-text">
                        <hr></hr>
                        <div>
                            <p className="small-text-expanded">{this.props.event.acceptedOffer ? "Confirmed" : "Not confirmed"}</p>
                            <p className="small-text-expanded">Prefered local: {this.props.event.typeOfLocal}</p>
                            <p className="small-text-expanded">Participants: {this.props.event.participants.length}</p>
                            <div className="center-elements">
                                {themes}
                            </div>
                          
                        </div>
                </div>
                </Collapse>
            </div>
        );
    }
}

export default SmallCard;
