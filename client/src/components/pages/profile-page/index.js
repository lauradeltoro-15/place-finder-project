import React, {Component} from 'react'

import PersonProfile from "./personProfile"
import CompanyProfile from "./companyProfile"

import "./profile.css"

import Container from 'react-bootstrap/esm/Container'
import SpinnerContainer from "../../ui/Spinner"

import UserService from '../../../services/UserService'
import LocalService from '../../../services/LocalService'


class ProfilePage extends Component {
    constructor (props){
        super (props)
        this.state = {
            userDetails: undefined,
            locals: undefined,
        }
        this.UserService = new UserService()
        this.localService = new LocalService()
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.updateUserDetails(this.props.match.params.userId)
    }
 
    updateUserDetails = id => {
        this.UserService
            .getUserDetails(id)
            .then((response) => {
                this.setState({ userDetails: response.data })
                response.data.companyDetails && this.updateLocalList(id)
            })
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }

    updateLocalList = id => {
        this.localService.getUserLocals(id)
            .then(response => this.setState({ locals: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }

    getProfile = () => {
        if (this.state.userDetails) {
            return !this.state.userDetails.companyDetails ?
                <PersonProfile handleToast={this.props.handleToast} userDetails={this.state.userDetails} {...this.props} loggedInUser={this.props.loggedInUser} paramId={this.props.match.params.userId} /> : 
                !this.state.locals ? null:
                <CompanyProfile updateUserDetails={this.updateUserDetails} locals={this.state.locals} handleToast={this.props.handleToast} userDetails={this.state.userDetails} loggedInUser={this.props.loggedInUser} paramId={this.props.match.params.userId} />  
        }
    }

    render() {
        const profile = this.state.userDetails && this.getProfile()
        return (
            <>
                {this.state.userDetails && profile ?
                    <main className="main-bg main-profile">
                        <Container className="profile-container">
                            <h1 className="big-title">{this.state.userDetails.username}'s profile</h1>
                            <div className="sub-profile-container">
                                <small className="subtitle">{this.state.userDetails.personDetails ? "Event-lover" : "Event-maker"}</small>
                                <div className="image-container">
                                    <img className="profile-image" alt={this.state.userDetails.username} src={this.state.userDetails.avatar} />
                                </div>
                            </div>
                            {profile}
                        </Container>
                    </main>
                : <SpinnerContainer/>
            }
            </>     
        )
    }
}

export default ProfilePage
