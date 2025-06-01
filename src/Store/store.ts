import { configureStore } from "@reduxjs/toolkit";
import doctorPageReducer from "../features/DoctorPageSlice/doctorPageSlice";
// import patientSlice from "../features/SignInSignUpSlice/PatientSlice";
// import doctorSlice from "../features/SignInSignUpSlice/DoctorSlice";
// import userSlice from "../features/SignInSignUpSlice/UserSlice";

export const store = configureStore({
  reducer: {
    doctorPage: doctorPageReducer,
    // patientSlice: patientSlice.reducer,
    // doctorSlice: doctorSlice.reducer,
    // userSlice: userSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
