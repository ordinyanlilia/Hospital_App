import { setData } from '../services/apiServices';
import { createAppSlice } from '../app/CreateAppSlice';


export interface Patient {
    id: string;
    name?: string;
    surname?: string;
    dob?: string;
    gender?: string;
    email?: string;
    phoneNumber?: string;
    bloodType?: string;
    registeredAt?: string;
    allergies?: string[];
    currentMedications?: string[];
    medicalHistory?: string[];
    appointments?: number[];
    password?: string;
}


interface InitialState {
  data: Patient[];
  status: string;
  error: string | null;
};

const initialState: InitialState = {
  data: [],
  status: "",
  error: null,
};


const patientSlice = createAppSlice({
    name: "patientSlice",
    initialState,
    reducers: create => ({
        addPatient: create.asyncThunk(async(patient: Patient) => {
            const docID =  await setData("patients", patient);
            return { ...patient, doc_id: docID}
        },
        {
            pending: state => {
                state.status = 'loading';
            },
            fulfilled: (state, action) => {
                state.status = "succeeded";
                state.data.push(action.payload);
            },
            rejected: (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Something went wrong";
            }

        }
    )
    }),
    selectors: {
        selectPatientStatus: state => state.status,
        selectPatientError: state => state.error,
        selectPatient: state => state.data
    }

})

export const {selectPatientStatus, selectPatientError, selectPatient} = patientSlice.selectors;
export const {addPatient} = patientSlice.actions;
export default patientSlice;




