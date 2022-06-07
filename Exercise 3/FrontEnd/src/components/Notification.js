import React from "react"

const Notification = ({message}) => {
    if (message === '')
    {
        return <div></div>
    }
    
    else return(
        <div className = "notif">
            {message}
        </div>
    )
}

export default Notification