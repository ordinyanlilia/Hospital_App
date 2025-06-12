import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";

import {
  HOME_PAGE,
  ABOUT,
  FIND_DOCTOR,
  CONTACT_US,
  SIGNUP,
  LOGIN,
  PROFILE,
  DOCTOR_PAGE,
  BOOK_APPOINTMENT,
  DOCTOR_APPOINTMENTS,
  DOCTOR_CALENDAR,
  DOCTOR_PROFILE,
  BOOK_APPOINTMENT_ID,
  DOCTOR_INFO
} from "./paths";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import FindDoctor from "../pages/FindDoctor/FindDoctor";
import ContactUs from "../pages/ContactUs/ContactUs";
import Profile from "../pages/Profile/Profile";
import Signup from "../pages/Auth/SignUp.tsx";
import Login from "../pages/Auth/Login.tsx";
import DoctorPage from "../pages/DoctorPage";
import BookAppointment from "../pages/BookAppointment/BookAppointment";
import Appointments from "../pages/DoctorPage/components/Appointments";
import DoctorProfile from "../pages/DoctorPage/components/DoctorProfile";
import Calendar from "../pages/DoctorPage/components/Calendar";
import DoctorInfo from "../pages/DoctorInfo/DoctorInfo";

export const router = createBrowserRouter([
  {
    path: HOME_PAGE,
    element: (
      <Layout showChatbot={true}>
        <Home />
      </Layout>
    ),
  },
  {
    path: ABOUT,
    element: (
      <Layout showChatbot={true}>
        <About />
      </Layout>
    ),
  },
  {
    path: FIND_DOCTOR,
    element: (
      <Layout showChatbot={true}>
        <FindDoctor />
      </Layout>
    ),
  },
  {
    path: CONTACT_US,
    element: (
      <Layout showChatbot={true}>
        <ContactUs />
      </Layout>
    ),
  },
  {
    path: PROFILE,
    element: (
      <Layout showChatbot={true}>
        <Profile />
      </Layout>
    ),
  },
  {
    path: SIGNUP,
    element: (
      <Layout showChatbot={true}>
        <Signup />
      </Layout>
    ),
  },
  {
    path: LOGIN,
    element: (
      <Layout showChatbot={true}>
        <Login />
      </Layout>
    ),
  },
  {
    path: DOCTOR_PAGE,
    element: (
        <DoctorPage showChatbot={false}/>
    ),
    children: [
      { index: true, element: <Navigate to={DOCTOR_APPOINTMENTS} replace /> },
      { path: DOCTOR_APPOINTMENTS, element: <Appointments /> },
      { path: DOCTOR_CALENDAR, element: <Calendar /> },
      { path: DOCTOR_PROFILE, element: <DoctorProfile /> },
    ],
  },
  {
    path: BOOK_APPOINTMENT,
    element: (
      <Layout showChatbot={true}>
        <BookAppointment />
      </Layout>
    ),
  },
  {
    path: BOOK_APPOINTMENT_ID,
    element: (
      <Layout showChatbot={true}>
        <BookAppointment />
      </Layout>
    ),
  },
  {
    path: DOCTOR_INFO,
    element: (
      <Layout showChatbot={true}>
        <DoctorInfo />
      </Layout>
    ),
  },
]);
