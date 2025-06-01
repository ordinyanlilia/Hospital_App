import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { HOME_PAGE, ABOUT, FIND_DOCTOR, CONTACT_US, PROFILE, DOCTOR_PAGE, DOCTOR_APPOINTMENTS, DOCTOR_CALENDAR, DOCTOR_PROFILE, BOOK_APPOINTMENT, BOOK_APPOINTMENT_ID } from "./paths";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import FindDoctor from "../pages/FindDoctor/FindDoctor";
import ContactUs from "../pages/ContactUs/ContactUs";
import Profile from "../pages/Profile/Profile.tsx";
import BookAppointment from "../pages/BookAppointment/BookAppointment.tsx";
import DoctorPage from "../pages/DoctorPage/index.tsx";

import Appointments from "../pages/DoctorPage/components/Appointments";
import DoctorProfile from "../pages/DoctorPage/components/DoctorProfile";
import Calendar from "../pages/DoctorPage/components/Calendar";


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
    path: DOCTOR_PAGE,
    element: <DoctorPage />,
     children: [
      {index: true, element: <Navigate to={DOCTOR_APPOINTMENTS} replace />},
      {path: DOCTOR_APPOINTMENTS, element: <Appointments/>},
      {path: DOCTOR_CALENDAR, element: <Calendar />},
      {path: DOCTOR_PROFILE, element: <DoctorProfile />}
    ]
  },
    {
        path: BOOK_APPOINTMENT,
        element:(
            <Layout>
                <BookAppointment />
            </Layout>
        )
    },
    {
        path: BOOK_APPOINTMENT_ID,
        element:(
            <Layout>
                <BookAppointment />
            </Layout>
        )
    },
])
