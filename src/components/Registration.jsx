import React from "react";
import { useNavigate } from "react-router";
import { CHAT_ROUTE, MAIN_ROUTE } from "../utils/const";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "./Loader";
import { auth } from "../firebase-config";

const Registration = () => {
    React.useEffect(() => {
        return () => {
            emailRef.current = null;
            passwordRef.current = null;
        };
    }, []);

    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [notCorrectEmail, setNotCorrectEmail] = React.useState(false);
    const [notCorrectPassword, setNotCorrectPassword] = React.useState(false);
    const [userExist, setUserExist] = React.useState(false);

    const createNewUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        )
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                emailRef.current = null;
                passwordRef.current = null;
                console.log(user);
                navigate(CHAT_ROUTE);
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
                    case "auth/invalid-email":
                        setNotCorrectEmail(true);
                        break;
                    case "auth/weak-password":
                        setNotCorrectPassword(true);
                        break;
                    case "auth/email-already-in-use":
                        setUserExist(true);
                        break;
                    default:
                        return null;
                }
            })
            .finally(() => setIsLoading(false));
    };

    const goBack = (e) => {
        e.preventDefault();
        navigate(MAIN_ROUTE);
    };
    return (
        <div className="login__overlay login__overlay--full">
            <div className="login__wrapper">
                <div className="login__box">
                    {isLoading && <Loader />}
                    <p className="login__text">Registration</p>
                    {notCorrectEmail && (
                        <p className="login__error">Write correct e-mail :)</p>
                    )}
                    {notCorrectPassword && (
                        <p className="login__error">
                            Password should be at least 6 signs
                        </p>
                    )}
                    {userExist && (
                        <p className="login__error">
                            User with that e-amil already exist
                        </p>
                    )}
                    <form>
                        <input
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
                            placeholder="E-mail"
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
                                className="login__btn login__btn--back"
                                onClick={(e) => goBack(e)}
                            >
                                Go back
                            </button>
                            <button
                                onClick={(e) => createNewUser(e)}
                                className="login__btn login__btn--registration"
                            >
                                Registrate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
