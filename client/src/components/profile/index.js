import React from "react"

import PersonProfile from "./personProfile/"
import CompanyProfile from "./companyProfile"


const ProfilePage = props => {
    console.log(props, "props passed to profile")
    const detailedProfile = props.loggedInUser.companyDetails ? <CompanyProfile {...props}/> : <PersonProfile loggedInUser={props.loggedInUser}/>
    return (
        <main>
            <h1>Welcome to your profile, {props.loggedInUser.username}</h1>
            <span>{props.loggedInUser.personDetails ? "User" : "Company"}</span>
            {detailedProfile}
        </main>
    )
}

export default ProfilePage