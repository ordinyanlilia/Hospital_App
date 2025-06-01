import { configureStore } from "@reduxjs/toolkit";

import doctorsReducer from "../features/doctors/doctorsSlices.tsx";

export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
