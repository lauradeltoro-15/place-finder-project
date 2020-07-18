import React from "react"

const ProfilePage = ({ user }) => {
    console.log(user)
    return (
        <main>
            <h1>Welcome to your profile, {user.username}</h1>
            <span>{user.personDetails ? "User" : "Company"}</span>
        </main>
    )
}

export default ProfilePage