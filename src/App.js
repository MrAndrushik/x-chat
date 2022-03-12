import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase-config";
import Loader from "./components/Loader";

function App() {
    const [, loading] = useAuthState(auth);

    if (loading) {
        return <Loader dark={true} />;
    } else {
        return (
            <BrowserRouter>
                <Header />
                <AppRouter />
            </BrowserRouter>
        );
    }
}

export default App;
