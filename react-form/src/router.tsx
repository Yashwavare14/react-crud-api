import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import App from "./App";
//import path from "path";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "signup",
        element: <Signup/>
    },
    {
        path: "login",
        element: <Login/>
    }
]);

export default router;