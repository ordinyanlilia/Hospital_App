import { configureStore } from '@reduxjs/toolkit';
import patientSlice from '../features/PatientSlice';
import doctorSlice from '../features/DoctorSlice';
import userSlice from '../features/UserSlice';

const store = configureStore({
  reducer: {
    patientSlice: patientSlice.reducer,
    doctorSlice: doctorSlice.reducer,
    userSlice: userSlice.reducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

