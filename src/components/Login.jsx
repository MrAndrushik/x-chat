import React from "react";
import { useNavigate } from "react-router";
import "../scss/login.scss";
import { CHAT_ROUTE, REGISTRATION_ROUTE } from "../utils/const";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import Loader from "./Loader";

const Login = ({ isModalOpen, setIsModalOpen }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [notCorrectEmail, setNotCorrectEmail] = React.useState("");
    const [notCorrectPassword, setNotCorrectPassword] = React.useState("");
    const [userExist, setUserExist] = React.useState("");

    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const navigate = useNavigate();

    const clearErrors = () => {
        setNotCorrectEmail("");
        setNotCorrectPassword("");
        setUserExist("");
    };

    const closeModal = () => {
        setIsModalOpen(false);
        clearErrors();
    };

    const goRegPage = (e) => {
        e.preventDefault();
        setIsModalOpen(false);
        navigate(REGISTRATION_ROUTE);
    };

    const singIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        )
            .then((userCredential) => {
                // Signed in
                // const user = userCredential.user;
                // console.log(auth.currentUser);
                setIsModalOpen(false);
                clearErrors();
                navigate(CHAT_ROUTE);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(
                    "errorCode is ",
                    errorCode,
                    "| errorMessage is ",
                    errorMessage
                );
                switch (errorCode) {
                    case "auth/user-not-found":
                        setUserExist(errorMessage);
                        break;
                    case "auth/invalid-email":
                        setNotCorrectEmail(errorMessage);
                        break;
                    case "auth/wrong-password":
                        setNotCorrectPassword(errorMessage);
                        break;
                    default:
                        return null;
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        isModalOpen && (
            <div className="login__overlay">
                <div className="login__wrapper">
                    <div className="login__box">
                        <button
                            className="login__close"
                            onClick={() => closeModal()}
                        >
                            x
                        </button>
                        {isLoading && <Loader />}
                        <p className="login__text">Authentication</p>
                        {notCorrectEmail && (
                            <p className="login__error">{notCorrectEmail}</p>
                        )}
                        {notCorrectPassword && (
                            <p className="login__error">{notCorrectPassword}</p>
                        )}
                        {userExist && (
                            <p className="login__error">{userExist}</p>
                        )}
                        <form>
                            <input
                                hidden
                                className="login__input"
                                type="text"
                                autoComplete="name"
                                placeholder="Name"
                            />
                            <input
                                ref={emailRef}
                                className="login__input"
                                type="mail"
                                autoComplete="mail"
                                placeholder="Email"
                            />
                            <input
                                ref={passwordRef}
                                className="login__input"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Password"
                            />
                            <div className="login__btn-block">
                                <button
                                    onClick={(e) => singIn(e)}
                                    className="login__btn login__btn--login"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={(e) => goRegPage(e)}
                                    className="login__btn login__btn--registration"
                                >
                                    Registration
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default Login;
