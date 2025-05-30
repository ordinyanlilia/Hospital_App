import {FileDoneOutlined, ScheduleOutlined, ScheduleTwoTone} from '@ant-design/icons'
import {useEffect} from "react";
import {
    type Appointment,
    selectAppointments,
    setAppointmentsInitialState
} from "../../../features/appointments/appointmentsSlice.ts";
import {Space, Table} from "antd";
import type {ColumnsType} from 'antd/es/table';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {getData} from "../../../services/apiService.ts";

const AppointmentsTable = () => {
    const columns: ColumnsType<Appointment> = [
        {
            title: 'Patient',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'Doctor',
            dataIndex: 'doctorName',
            key: 'doctorName',
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
                <Space>{text === 'scheduled' ?
                    <ScheduleTwoTone className={'blue-text'}/> :
                    <FileDoneOutlined/>}
                    {text}</Space>
            ),
        },
    ];

    const appointments = useAppSelector(selectAppointments);
    const dispatch = useAppDispatch();
    const user = {
        name: 'Mariam',
        appointments: [
            'GNKkT9yoOwo7pee7bHDx'
        ]
    }

    useEffect(() => {
        const fetchAppointments = async () => {
            let results = await Promise.all(
                user.appointments.map(id => getData<Appointment>(id, 'appointments'))
            );

            // results = results.map(result => result.date.toString());

            dispatch(setAppointmentsInitialState(results));
        };

        fetchAppointments();
    }, []);

    return (
        <Table columns={columns} dataSource={appointments} size="small"/>
    )
}

export default AppointmentsTable;