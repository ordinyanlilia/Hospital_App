import { configureStore } from '@reduxjs/toolkit';
import patientSlice from '../features/PatientSlice';
import doctorSlice from '../features/DoctorSlice';
import userSlice from '../features/UserSlice';
import doctorsSlices from "../features/doctors/doctorsSlices.tsx";

const store = configureStore({
  reducer: {
    patientSlice: patientSlice.reducer,
    doctorSlice: doctorSlice.reducer,
    userSlice: userSlice.reducer,
    doctors: doctorsSlices
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

