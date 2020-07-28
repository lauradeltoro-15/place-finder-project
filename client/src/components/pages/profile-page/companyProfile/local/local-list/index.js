import React, {Component} from 'react'

import Row from 'react-bootstrap/Row'

import LocalCard from "./local-card"

import LocalService from "../../../../../../services/LocalService"

import { Link } from "react-router-dom"

import SpinnerContainer from "../../../../../ui/Spinner"

class LocalList extends Component {
    constructor (){
        super ()
        this.state = {
        }
    }

    render () {
        return (
            <>
                {!this.props.locals ? <SpinnerContainer/> :
                    <Row>
                        {this.props.locals.map(local => <LocalCard updateUserDetails={this.props.updateUserDetails} handleToast={this.props.handleToast} key={local._id} loggedInUser={this.props.loggedInUser} paramId={this.props.user} {...local} handleToast={this.props.handleToast} updateLocalList={this.updateLocalList}/>)}  
                    </Row>
                }
                {this.props.locals && this.props.locals.length === 0 && <p style={{ marginBottom: "100px" }}>You don't have any locals created. <span onClick={() => this.props.handleModal(true)} className="color-text" >Start adding yours!</span></p>}
            </>
        )
    }
}

export default LocalList