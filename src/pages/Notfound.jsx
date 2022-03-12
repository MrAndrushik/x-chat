import React from "react";
import "../scss/404.scss";

const Notfound = () => {
    return (
        <section className="not-found">
            <div className="container not-found__container">
                <div className="not-found__content">
                    <h1 className="not-found__title">404 error</h1>
                    <p className="not-found__descr">Page not found</p>
                </div>
            </div>
        </section>
    );
};

export default Notfound;
