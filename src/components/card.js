import React from "react";
import Statistics from "../../public/assets/images/statistics.png"
let Card = ({ title, description }) => {
    return (
        <>
            <div className="card setCardWidth cardHover">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </div>


        </>
    );
};

export default Card;
