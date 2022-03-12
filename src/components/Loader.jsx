import React from "react";
import "../scss/loader.scss";

const Loader = ({ dark }) => {
    return (
        <div className={dark ? "loader__wrapper" : ""}>
            <div className="load">
                <hr />
                <hr />
                <hr />
                <hr />
            </div>
        </div>
    );
};

export default Loader;
