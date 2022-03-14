import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import "../scss/header.scss";
import { MAIN_ROUTE } from "../utils/const";
import Login from "./Login";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);

    auth.onAuthStateChanged(() => setCurrentUser(auth.currentUser));
    const navigate = useNavigate();
    const logout = async () => {
        await signOut(auth)
            .then(() => {
                console.log("Sign-out successful");
                navigate(MAIN_ROUTE);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <header className="header">
            <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <div className="container header__container">
                <Link to="/">
                    <img
                        src="images/logo-nobg.svg"
                        alt="xchat"
                        className="header__logo"
                    />
                </Link>
                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__item">
                            {!currentUser ? (
                                <button
                                    className="login-btn"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Login
                                </button>
                            ) : (
                                <button
                                    className="login-btn--user"
                                    onClick={() => logout(true)}
                                >
                                    <img
                                        src="images/profile.svg"
                                        alt="profile"
                                    />
                                </button>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
