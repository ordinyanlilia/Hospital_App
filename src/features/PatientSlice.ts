import {setData, updateData} from '../services/apiService.ts';
import {createAppSlice} from '../app/createAppSlice.ts';

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
    appointments?: string[];
    password?: string;
    imageUrl?: string;
    doc_id?: string;
}


interface InitialState {
    patient: Patient | null;
    status: string;
    error: string | null;
};

const initialState: InitialState = {
    patient: null,
    status: "",
    error: null,
};


const patientSlice = createAppSlice({
    name: "patientSlice",
    initialState,
    reducers: create => ({
        setPatient: create.reducer((state, action: { payload: Patient | null }) => {
            state.patient = action.payload;
        }),
        addPatient: create.asyncThunk(async (patient: Patient) => {
                const docID = await setData("patients", patient);
                return {...patient, doc_id: docID}
            },
            {
                pending: state => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = "succeeded";
                    state.patient = action.payload;
                },
                rejected: (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message ?? "Something went wrong";
                }

            }
        ),
        editPatient: create.asyncThunk(async (args: {
                user_doc_id: string,
                data: Partial<Patient>
            }) => {
                const {user_doc_id, data} = args;
                await updateData<Partial<Patient>>(
                    user_doc_id,
                    "patients",
                    data
                );
                return data
            },
            {
                pending: state => {
                    state.status = 'loading';
                },
                fulfilled: (state, action: { payload: Partial<Patient> }) => {
                    state.status = "succeeded";
                    state.patient = {
                        ...(state.patient as Patient),
                        ...action.payload,
                    };
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
        selectPatient: state => state.patient
    }

})

export const {selectPatientStatus, selectPatientError, selectPatient} = patientSlice.selectors;
export const {setPatient, addPatient, editPatient} = patientSlice.actions;
export default patientSlice;




