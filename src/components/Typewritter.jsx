import React from "react";
import Typical from "react-typical";
import "../scss/typewritter.scss";

const Typewritter = () => {
    return (
        <div className="typical container">
            <Typical
                steps={[
                    "Hello everyone",
                    2000,
                    "I present to you",
                    1000,
                    "A special chat",
                    1000,
                    "X-Chat",
                ]}
                loop={1}
                wrapper="h1"
            />
        </div>
    );
};

export default Typewritter;
