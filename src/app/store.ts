import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AppointmentsSlice from "../features/appointments/appointmentsSlice.ts";
import DoctorsSlice from "../features/doctors/doctorsSlice.tsx";
import userSlice from "../features/UserSlice.ts";
import patientSlice from "../features/PatientSlice.ts";
import DoctorSlice from "../features/DoctorSlice.ts";

const rootReducer = combineSlices(
  AppointmentsSlice,
  DoctorsSlice,
  userSlice,
  patientSlice,
  DoctorSlice,
);

export type RootState = ReturnType<typeof rootReducer>;
export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
