import React from "react"

import PersonProfile from "./personProfile/"
import CompanyProfile from "./companyProfile"


const ProfilePage = ({ loggedInUser }) => {
    const detailedProfile = loggedInUser.companyDetails ? <CompanyProfile loggedInUser={loggedInUser}/> : <PersonProfile loggedInUser={loggedInUser}/>
    return (
        <main>
            <h1>Welcome to your profile, {loggedInUser.username}</h1>
            <span>{loggedInUser.personDetails ? "User" : "Company"}</span>
            {detailedProfile}
        </main>
    )
}

export default ProfilePage