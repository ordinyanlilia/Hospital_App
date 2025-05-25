import './Profile.css'

import {useEffect, useState} from "react";
import {getData} from '../../services/apiService.ts'
import {Button, Divider} from "antd";
import AppointmentsTable from "./components/AppointmentsTable.tsx";
import UserInfo from "./components/UserInfo.tsx";
import {useNavigate} from "react-router-dom";
import {BOOK_APPOINTMENT} from "../../routes/paths.ts";


const Profile = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        getData('2e3C5vE5WSVC6LJ9Zjc0').then((response) => {
            setUser(response);
        })
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