import {getData, setData, updateData} from "../../services/apiService.ts";
import { createAppSlice } from "../../app/createAppSlice.ts";
import { arrayUnion } from "firebase/firestore";

export const MODE_HOURS:MODE_HOURS = {
  online: 30,
  home_visit: 40,
  in_person: 30,
  phone: 10
}

type MODE_HOURS = {
  online: number,
  home_visit: number,
  in_person: number,
  phone: number,
}

export type Mode = keyof MODE_HOURS;

export interface Appointment {
  patientName?: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  reason: string;
  mode: Mode;
  notes?: string;
  status: string;
  doc_id?: string;
  startTime?: string;
  endTime?: string;
  created_at?: string;
}

export interface User_Appointment{
    appointmentId: string;
    startTime: string;
    endTime: string;
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
    fetchAppointments: create.asyncThunk(
        async (args: {
          appointments: User_Appointment[] | undefined;
        }) => {
          const results = await Promise.all(
              (args.appointments ?? [])
                  .filter((appointment:User_Appointment) => !!appointment?.appointmentId)
                  .map(appointment =>
                      getData<Appointment>(appointment.appointmentId, 'appointments')
                  )
          );

          return [...results];
        },
        {
          pending: (state) => {
            state.status = "loading";
          },
          fulfilled: (state, action) => {
            state.status = "succeeded";
            state.appointments = action.payload;
          },
          rejected: (state, action) => {
            state.status = "failed";
            state.error = action.error.message || null;
          },
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
          appointments: arrayUnion({
            appointmentId,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
          }),
        });

        await updateData(user_doc_id, 'patients', {
          appointments: arrayUnion({
            appointmentId,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
          }),
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
export const { addAppointment, resetStatus, setAppointments, fetchAppointments } =
  appointmentsSlice.actions;
export default appointmentsSlice;
