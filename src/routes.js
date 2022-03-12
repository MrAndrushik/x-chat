import Registration from "./components/Registration";
import Chat from "./pages/Chat";
import Main from "./pages/Main";
import Notfound from "./pages/Notfound";
import {
    CHAT_ROUTE,
    MAIN_ROUTE,
    NOT_FOUND_ROUTE,
    REGISTRATION_ROUTE,
} from "./utils/const";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration,
    },
    {
        path: NOT_FOUND_ROUTE,
        Component: Notfound,
    },
];

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: Chat,
    },
    {
        path: NOT_FOUND_ROUTE,
        Component: Notfound,
    },
];
