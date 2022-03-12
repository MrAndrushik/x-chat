import React from "react";
import { Route, Routes } from "react-router";
import { privateRoutes, publicRoutes } from "../routes";
import { auth } from "../firebase-config";

const AppRouter = () => {
    const [currentUser, setCurrentUser] = React.useState(null);
    auth.onAuthStateChanged(() => setCurrentUser(auth.currentUser));

    return !currentUser ? (
        <Routes>
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
        </Routes>
    ) : (
        <Routes>
            {privateRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
        </Routes>
    );
};

export default AppRouter;
