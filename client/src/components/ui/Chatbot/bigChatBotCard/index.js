import React from "react"


const BigCard = ({ event }) => {
    const obtainDateInFormat = date => {
        const newDate = new Date(date)
        let dd = String(newDate.getDate()).padStart(2, '0')
        let mm = String(newDate.getMonth() + 1).padStart(2, '0')
        let yyyy = newDate.getFullYear()
        return `${dd}-${mm}-${yyyy}`
    }
    return (
        <article >
            <img src={event.avatar} />
            <p>{event.acceptedOffer ? "Confirmed" : "Not confirmed"}</p>
            <p>Prefered local: {event.typeOfLocal}</p>
            <p>Participants: {event.participants.length}</p>
            <p c>{event.name}</p>
            <small>{obtainDateInFormat(event.startTime)}</small>
        </article>
    )
}

export default BigCard