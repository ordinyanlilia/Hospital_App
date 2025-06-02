import {FileDoneOutlined, ScheduleTwoTone} from '@ant-design/icons'
import {useEffect} from "react";
import {
    type Appointment,
    selectAppointments,
    setAppointments
} from "../../../features/appointments/appointmentsSlice.ts";
import {Space, Table} from "antd";
import type {ColumnsType} from 'antd/es/table';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {getData} from "../../../services/apiService.ts";
import {selectPatient} from "../../../features/PatientSlice.ts";

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
    const user = useAppSelector(selectPatient);

    useEffect(() => {
        const fetchAppointments = async () => {
            const results = await Promise.all(
                (user?.appointments ?? []).map(id => getData<Appointment>(id, 'appointments'))
            );

            dispatch(setAppointments(results));
        };

        fetchAppointments();
    }, [user?.appointments?.length]);


    return (
        <Table columns={columns} dataSource={appointments} rowKey={record => record.doc_id || ''}
               size="small"/>
    )
}

export default AppointmentsTable;