import './Profile.css'

import {useEffect, useState} from "react";
import type {Patient} from "../../services/apiService.ts";
import {getData} from '../../services/apiService.ts'
import {Button, Divider} from "antd";
import AppointmentsTable from "./components/AppointmentsTable.tsx";
import UserInfo from "./components/UserInfo.tsx";
import {useNavigate} from "react-router-dom";
import {BOOK_APPOINTMENT} from "../../routes/paths.ts";

const Profile = () => {
    const [user, setUser] = useState<Patient>();
    const navigate = useNavigate();
    useEffect(() => {
        getData('2e3C5vE5WSVC6LJ9Zjc0').then((response) => {
            setUser(response);
        })

        // user?.appointments.forEach((id: string) => {
        //     getAppointment(id).then((appointment) => {
        //         setAppointments([...appointments, {...appointment, patient: user.name}]);
        //     })
        // })
    }, []);

    return (
        <>
            <UserInfo user={user}/>
            <Divider>Your Appointments</Divider>
            <Button type="primary" onClick={() => navigate(BOOK_APPOINTMENT)}>Book Appointment</Button>
            <AppointmentsTable/>
        </>
    )
}

export default Profile;