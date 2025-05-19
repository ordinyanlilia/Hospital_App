import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { HOME_PAGE, ABOUT, FIND_DOCTOR, CONTACT_US, PROFILE } from "./paths";
import Home from "../components/Home";
import About from "../components/About";
import FindDoctor from "../components/FindDoctor";
import ContactUs from "../components/ContactUs";
import Profile from "../components/Profile";


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
    }
])