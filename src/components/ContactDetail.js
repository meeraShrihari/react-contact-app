import React from "react";
import user from "../images/user1.JPG";
import { useLocation, Link } from "react-router-dom";

const ContactDetail = (props) => {
    const location = useLocation();
    const {name, email} = location.state.contact;
    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user"></img>
                    <div className="content">
                        <div className="header">{name}</div>
                        <div className="description">{email}</div>
                    </div>
                </div>
                <div className="center-div">
                    <Link to="/">
                    <button style={{position: "relative", left: "50%", transform: "translate(-50%)"}} 
                        className="ui button blue center">
                            Back to Contact List
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ContactDetail;