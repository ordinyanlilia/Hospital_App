import {FileDoneOutlined, InfoCircleTwoTone, ScheduleTwoTone} from '@ant-design/icons'
import {type Appointment, selectAppointments,} from "../../../features/appointments/appointmentsSlice.ts";
import { DatePicker, Modal, Space, Table} from "antd";
import type {ColumnsType} from 'antd/es/table';
import {useAppSelector} from "../../../app/hooks.ts";
import dayjs, {type Dayjs} from "dayjs";
import {useEffect, useState} from "react";

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
            filters: [
                {
                    text: 'Online',
                    value: 'online',
                },
                {
                    text: 'In Person',
                    value: 'in_person',
                },
                {
                    text: "Phone Call",
                    value: "phone",
                },
                {
                    text: "Home Visit",
                    value: "home_visit",
                },
            ],
            onFilter: (value, record) => record.mode.indexOf(value as string) === 0,
            render: (text: string) => text.split('_').join(' '),
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
        },
        {
            title: 'Date',
            dataIndex: 'startTime',
            key: 'startTime',
            defaultSortOrder: 'ascend',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(date:Dayjs) => {
                            setSelectedKeys(date ? [date.format('YYYY-MM-DD')] : []);
                            confirm();
                        }}
                        value={selectedKeys[0] ? dayjs(selectedKeys[0] as string) : null}
                    />
                </div>
            ),
            onFilter: (value, record):boolean => {
                return dayjs(record.startTime).isSame(dayjs(value as string), 'day');
            },
            sorter: (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf(),
            render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (date: string) => dayjs(date).format('HH:mm'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'Scheduled',
                    value: 'scheduled',
                },
                {
                    text: 'Visited',
                    value: 'visited',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value as string) === 0,
            render: (text: string) => (
                <Space>{text === 'scheduled' ?
                    <ScheduleTwoTone className={'blue-text'}/> :
                    <FileDoneOutlined/>}
                    {text}</Space>
            ),
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [time, setTime] = useState<string>('');

    const appointments = useAppSelector(selectAppointments);
    useEffect(() => {
        appointments.forEach(appointment => {
            const date = dayjs(appointment.startTime);
            if (date.isSame(dayjs(), 'day') && !dayjs().isAfter(date)) {
                setTime(dayjs(appointment.startTime).format('HH:mm'));
                setIsModalOpen(true);
            }
        })
    }, []);

    return (
        <>
            <Table
                columns={columns}
                dataSource={appointments}
                rowKey={record => record.doc_id || ''}
                showSorterTooltip={{target: 'sorter-icon'}}
                size="small"/>
            <Modal
                open={isModalOpen}
                closable={true}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    // <Button key="ok" type="primary" onClick={() => setIsModalOpen(false)}>
                    //     OK
                    // </Button>
                ]}
            >
                <Space><InfoCircleTwoTone/> Today you have appointment at {time}, Don't be late</Space>
            </Modal>
        </>
    )
}

export default AppointmentsTable;