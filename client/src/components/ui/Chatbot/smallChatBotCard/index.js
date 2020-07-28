import React from "react"

import "./smallChatBotCard.css"

const SmallCard = ({ event }) => {
    const obtainDateInFormat = date => {
        const newDate = new Date(date)
        let dd = String(newDate.getDate()).padStart(2, '0')
        let mm = String(newDate.getMonth() + 1).padStart(2, '0')
        let yyyy = newDate.getFullYear()
        return `${dd}-${mm}-${yyyy}`
    }
    return (
        <article class="small-card">
            <div className="image-container-small">
                <img src={event.avatar} />
            </div>
            <div>
                <p class="small-card-info">{event.name}</p>
                <small>{obtainDateInFormat(event.startTime)}</small>
            </div>
                

            
        </article>
    )
}

export default SmallCard