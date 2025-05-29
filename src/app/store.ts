import { configureStore } from '@reduxjs/toolkit';
import patientSlice from '../features/PatientSlice';
import doctorSlice from '../features/DoctorSlice';

const store = configureStore({
  reducer: {
    patientSlice: patientSlice.reducer,
    doctorSlice: doctorSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

