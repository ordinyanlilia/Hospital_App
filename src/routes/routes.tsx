import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { HOME_PAGE, ABOUT, FIND_DOCTOR, CONTACT_US, PROFILE, SIGNUP, LOGIN } from "./paths";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import FindDoctor from "../pages/FindDoctor/FindDoctor";
import ContactUs from "../pages/ContactUs/ContactUs";
import Profile from "../pages/Profile/Profile";
import Signup from "../pages/Profile/SignUp";
import Login from "../pages/Profile/Login";


export const router = createBrowserRouter([
    {
        path: HOME_PAGE,
        element: (
            <Layout>
                <Home />
            </Layout>
        ),
    },
    {
        path: ABOUT,
        element: (
            <Layout>
                <About />
            </Layout>
        ),
    },
    {
        path: FIND_DOCTOR,
        element: (
            <Layout>
                <FindDoctor />
            </Layout>
        )
    },
    {
        path: CONTACT_US,
        element: (
            <Layout>
                <ContactUs />
            </Layout>
        )
    },
    {
        path: PROFILE,
        element: (
            <Layout>
                <Profile />
            </Layout>
        )
    },
    {
        path: SIGNUP,
        element: (
            <Layout>
                <Signup />
            </Layout>
        )
    },
    {
        path: LOGIN,
        element: (
            <Layout>
                <Login />
            </Layout>
        )
    }
])