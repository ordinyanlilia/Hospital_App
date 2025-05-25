import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import {HOME_PAGE, ABOUT, FIND_DOCTOR, CONTACT_US, PROFILE, BOOK_APPOINTMENT} from "./paths";
import Home from "../pages/Home";
import About from "../pages/About";
import FindDoctor from "../pages/FindDoctor";
import ContactUs from "../pages/ContactUs";
import Profile from "../pages/Profile/Profile.tsx";
import BookAppointment from "../pages/BookAppointment/BookAppointment.tsx";


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
        path: BOOK_APPOINTMENT,
        element:(
            <Layout>
                <BookAppointment />
            </Layout>
        )
    },


])