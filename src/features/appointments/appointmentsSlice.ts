import { setData, updateData } from "../../services/apiService.ts";
import { createAppSlice } from "../../app/createAppSlice.ts";
import { arrayUnion } from "firebase/firestore";

export interface Appointment {
  patientName?: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  reason: string;
  mode: string;
  notes?: string;
  status: string;
  doc_id?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  created_at?: string;
}

interface InitialState {
  appointments: Appointment[];
  status: string;
  error: string | null;
}

const initialState: InitialState = {
  appointments: [],
  status: "",
  error: "",
};

const appointmentsSlice = createAppSlice({
  name: "appointmentsSlice",
  initialState,
  reducers: (create) => ({
    resetStatus: create.reducer((state) => {
      state.status = "";
      state.error = null;
    }),
    setAppointments: create.reducer(
      (state, action: { payload: Appointment[] }) => {
        state.appointments = action.payload;
      }
    ),
    addAppointment: create.asyncThunk(
      async (args: {
        appointment: Appointment;
        doctor_doc_id: string;
        user_doc_id: string;
      }) => {
        const { appointment, doctor_doc_id, user_doc_id } = args;
        const appointmentId: string = await setData(
          "appointments",
          appointment
        );

        await updateData(doctor_doc_id, "doctors", {
          appointments: arrayUnion(appointmentId),
        });

        await updateData(user_doc_id, 'patients', {
          appointments: arrayUnion(appointmentId),
        });

        return { ...appointment, doc_id: appointmentId };
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
          state.appointments.push(action.payload);
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        },
      }
    ),
  }),
  selectors: {
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectAppointments: (state) => state.appointments,
  },
});

export const { selectStatus, selectError, selectAppointments } =
  appointmentsSlice.selectors;
export const { addAppointment, resetStatus, setAppointments } =
  appointmentsSlice.actions;
export default appointmentsSlice;
