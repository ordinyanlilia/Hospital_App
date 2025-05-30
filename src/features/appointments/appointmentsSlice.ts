import {setData, updateData} from "../../services/apiService.ts";
import {createAppSlice} from "../../app/createAppSlice.ts";
import {arrayUnion, type Timestamp} from "firebase/firestore";

export interface Appointment {
    patientName?: string,
    patientId: string,
    doctorId: string,
    doctorName: string,
    reason: string,
    mode: string,
    notes?: string,
    status: string,
    doc_id?: string,
    date: Timestamp,
}

interface InitialState {
    appointments: Appointment[];
    status: string;
    error: string | null;
}

const initialState: InitialState = {
    appointments: [],
    status: '',
    error: '',
}

const appointmentsSlice = createAppSlice({
    name: "appointmentsSlice",
    initialState,
    reducers: create => ({
        resetStatus: create.reducer((state) => {
            state.status = '';
            state.error = null;
        }),
        setAppointmentsInitialState: create.reducer((state, action:{payload: Appointment[]}) => {
            state.appointments = action.payload;
        }),
        addAppointment: create.asyncThunk(async (appointment: Appointment) => {
                const appointmentId: string = await setData('appointments', appointment);
                await updateData('2e3C5vE5WSVC6LJ9Zjc0', 'patients', {
                    appointments: arrayUnion(appointmentId),
                });
                await updateData('doctor_1', 'doctors', {
                    appointments: arrayUnion(appointmentId),
                })
                return appointment;
            },
            {
                pending: state => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'succeeded';
                    state.appointments.push(action.payload);
                },
                rejected: (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || null;
                },
            }),
    }),
    selectors: {
        selectStatus: state => state.status,
        selectError: state => state.error,
        selectAppointments: state => state.appointments,
    }
})

export const {selectStatus, selectError, selectAppointments} = appointmentsSlice.selectors;
export const {addAppointment, resetStatus, setAppointmentsInitialState} = appointmentsSlice.actions;
export default appointmentsSlice