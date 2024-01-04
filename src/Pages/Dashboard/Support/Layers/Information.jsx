
import React, { useEffect } from "react";
import DetailAccount from "../../../../Components/DetailAccount/DetailAccount";

function Information(props) {
    useEffect(()=>{
        console.log('Props Chatroom :' + props)
    })

    return (
        <div className="chatDetials col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <div className="chatDetialsWrapper">
                <DetailAccount />
            </div>
        </div>
    )
}

export default Information;