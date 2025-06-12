import {FileDoneOutlined, ScheduleTwoTone} from '@ant-design/icons'
import {type Appointment, MODE_HOURS, selectAppointments,} from "../../../features/appointments/appointmentsSlice.ts";
import {DatePicker, notification, Space, Table} from "antd";
import type {ColumnsType} from 'antd/es/table';
import {useAppSelector} from "../../../app/hooks.ts";
import dayjs, {type Dayjs} from "dayjs";
import {useEffect, useRef} from "react";
import { useTranslate } from '../../../context/TranslationProvider.tsx';

const AppointmentsTable = () => {
    const { translate } = useTranslate();
    const columns: ColumnsType<Appointment> = [
        {
            title: translate("patient"),
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: translate("doctor"),
            dataIndex: 'doctorName',
            key: 'doctorName',
        },
        {
            title: translate("reason1"),
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: translate("mode"),
            dataIndex: 'mode',
            key: 'mode',
            filters: Object.keys(MODE_HOURS).map(key => ({
                text: key.split('_').join(' '),
                value: key
            })),
            onFilter: (value, record) => record.mode.indexOf(value as string) === 0,
            render: (text: string) => text.split('_').join(' '),
        },
        {
            title: translate("notes1"),
            dataIndex: 'notes',
            key: 'notes',
        },
        {
            title: translate("date"),
            dataIndex: 'startTime',
            key: 'startTime',
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => (
                <div style={{padding: 8}}>
                    <DatePicker
                        onChange={(date: Dayjs) => {
                            setSelectedKeys(date ? [date.format('YYYY-MM-DD')] : []);
                            confirm();
                        }}
                        value={selectedKeys[0] ? dayjs(selectedKeys[0] as string) : null}
                    />
                </div>
            ),
            onFilter: (value, record): boolean => {
                return dayjs(record.startTime).isSame(dayjs(value as string), 'day');
            },
            sorter: (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf(),
            render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: translate("time"),
            dataIndex: 'startTime',
            key: 'startTime',
            render: (date: string) => dayjs(date).format('HH:mm'),
        },
        {
            title: translate("status1"),
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: translate("scheduled"),
                    value: 'scheduled',
                },
                {
                    text: translate("visited"),
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

    const [api, contextHolder] = notification.useNotification();

    const appointments = useAppSelector(selectAppointments);
    const notified = useRef(false);

    useEffect(() => {
        if (notified.current) return;

        appointments.forEach(appointment => {
            const date = dayjs(appointment.startTime);
            if (date.isSame(dayjs(), 'day') && !dayjs().isAfter(date)) {
                const time = date.format('HH:mm');
                const mode = appointment.mode.split('_').join(' ');
                api.info({
                    message: translate("upcomingAppointment"),
                    description: `${translate("youHave")} ${mode} ${translate("appointmentTodayAt")} ${time}. ${translate("beOnTime")}`,
                    duration: 0
                });
            }
        })
        notified.current = true;
    }, [api, appointments, translate]);

    return (
        <>
            {contextHolder}
            <Table
                columns={columns}
                dataSource={appointments}
                rowKey={record => record.doc_id || ''}
                showSorterTooltip={{target: 'sorter-icon'}}
                size="small"/>

        </>
    )
}

export default AppointmentsTable;