import {setData} from "../../services/apiService.ts";
import {createAppSlice} from "../../app/createAppSlice.ts";

export interface Appointment {
    patient?: string,
    patientId: string,
    doctorId: string,
    location: string,
    reason: string,
    mode: string,
    notes: string,
    status: string,
    doc_id?: string,
}

interface InitialState {
    data: string[];
    status: string;
    error: string | null;
}

const initialState: InitialState = {
    data: [],
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
                    console.log('Log ::: Pending ===');
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    console.log('Log ::: Success ===');
                    state.status = 'succeeded';
                    console.log(action, 'action');
                    state.data.push(action.payload);
                },
                rejected: (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || null;
                },
            })
    }),
    selectors: {
        selectStatus: state => state.status,
    }
})

export const {selectStatus} = appointmentsSlice.selectors;
export const {addAppointment} = appointmentsSlice.actions;
export default appointmentsSlice