import {FileDoneOutlined, ScheduleOutlined} from '@ant-design/icons'
import {useEffect, useState} from "react";
import {type Appointment, selectAppointments} from "../../../features/appointments/appointmentsSlice.ts";
import {Table} from "antd";
import type { ColumnsType } from 'antd/es/table';
import {getAppointment} from "../../../services/apiService.ts";
import {useAppSelector} from "../../../app/hooks.ts";

const AppointmentsTable = () => {
    const columns:ColumnsType<Appointment> = [
        {
            title: 'Patient',
            dataIndex: 'patient',
            key: 'patient',
        },
        {
            title: 'Doctor',
            dataIndex: 'doctorId',
            key: 'doctorId',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: 'Mode',
            dataIndex: 'mode',
            key: 'mode',
            render: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
                <>{text === 'scheduled' ?
                    <ScheduleOutlined style={{color: '#2feb32'}}/> :
                    <FileDoneOutlined/>}
                    {text}</>
            ),
        },
    ];

    const appointmentsId = useAppSelector(selectAppointments);
    console.log(appointmentsId);
    const [appointments, setAppointments] = useState<Appointment[] | []>([]);
    const user = {
        name: 'Mariam'
    }
    useEffect(() => {
        appointmentsId.forEach((id: string) => {
            getAppointment(id).then((appointment) => {
                setAppointments([...appointments, {...appointment, patient: user.name}]);
            })
        })
    }, [])
    return (
        <Table columns={columns} dataSource={appointments} size="small"/>
    )
}

export default AppointmentsTable;