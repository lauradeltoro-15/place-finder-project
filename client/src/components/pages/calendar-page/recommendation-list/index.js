import React from "react"

import RecommendationCard from "./recommendation-card"

const RecommendationList = props => {
    return(
    <section>
        <h3>For you <img className='logo-heart' src='https://res.cloudinary.com/dlsnvevxk/image/upload/v1596120541/avatar/fainder-love_bz4ic5.png'></img> by <span className='logo'>fainder</span></h3>
            <div className='recommendations-container' >
                {props.recommendations &&
                    props.recommendations.map((event, i) => <RecommendationCard handleToast={props.handleToast} updateEvents={props.updateEvents} key={i} {...event} loggedInUser={props.loggedInUser}/>)}      
            </div>
        </section>
)
}

export default RecommendationList