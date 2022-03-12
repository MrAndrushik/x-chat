import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./scss/normilize.scss";
import "./scss/style.scss";

import { auth } from "./firebase-config";

const Context = React.createContext(null);

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={{ auth }}>
            <App />
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
