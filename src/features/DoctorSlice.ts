import { setData } from '../services/apiService.ts';
import { createAppSlice } from '../app/createAppSlice.ts';
import type {User_Appointment} from "./appointments/appointmentsSlice.ts";

export interface Doctor {
  doc_id: string;
  id: string;
  name: string;
  surname: string;
  yearsOfExperience: number;
  gender: string;
  specialty: string;
  email: string;
  password: string;
  photoUrl?: string;
  appointments?: User_Appointment[];
  bio?:string
}

interface InitialState {
  data: Doctor[];
  status: string;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  status: '',
  error: null,
};

const doctorSlice = createAppSlice({
  name: 'doctorSlice',
  initialState,
  reducers: create => ({
    addDoctor: create.asyncThunk(
      async (doctor: Doctor) => {
        const docID = await setData('doctors', doctor);
        return { ...doctor, doc_id: docID };
      },
      {
        pending: state => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'succeeded';
          state.data.push(action.payload);
        },
        rejected: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Something went wrong';
        },
      }
    ),
  }),
  selectors: {
    selectDoctorStatus: state => state.status,
    selectDoctorError: state => state.error,
    selectDoctors: state => state.data,
  },
});

export const {selectDoctorStatus, selectDoctorError, selectDoctors,} = doctorSlice.selectors;

export const { addDoctor } = doctorSlice.actions;

export default doctorSlice;
