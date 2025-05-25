import {setData} from "../../services/apiService.ts";
import {createAppSlice} from "../../app/createAppSlice.ts";
import type {Timestamp} from "firebase/firestore";
import {createAsyncThunk} from "@reduxjs/toolkit";

export interface Appointment {
    patient?: string,
    patientId: string,
    doctorId: string,
    location: string,
    reason: string,
    mode: string,
    notes?: string,
    status: string,
    doc_id?: string,
    date: Timestamp,
}

interface InitialState {
    appointments: string[];
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
        addAppointment: create.asyncThunk(async (appointment: Appointment) => {
                return await setData('appointments', appointment);
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
export const {addAppointment} = appointmentsSlice.actions;
export default appointmentsSlice