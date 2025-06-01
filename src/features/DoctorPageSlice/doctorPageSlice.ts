import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchData, getData } from "../../services/apiService";


interface Appointment {
  date: string;
  patientName?: string;
  reason: string;
  notes: string;
  status: string;
}

export interface DoctorA {
  doc_id: string;
  name: string;
  surname: string;
  email: string;
  gender: string;
  specialty: string;
  yearsOfExperience: string;
  appointments: string[];
  bio?: string
}

interface DoctorPageState {
  doctor: DoctorA | null;
  appointments: Appointment[];
  filteredAppointments: Appointment[];
  loading: boolean;
  error: string | null;
  searchValue: string;
  statusFilter: string;
}

const initialState: DoctorPageState = {
  doctor: null,
  appointments: [],
  filteredAppointments: [],
  loading: false,
  error: null,
  searchValue: "",
  statusFilter: "All",
};

function filterAppointmentsHelper(state: DoctorPageState) {
  state.filteredAppointments = state.appointments.filter((appointment) => {
    if (!appointment) return false;

    const matchesName =
      state.searchValue.trim() === ""
        ? true
        : appointment.patientName
        ? appointment.patientName
            .toLowerCase()
            .includes(state.searchValue.toLowerCase())
        : false;

    const matchesStatus =
      state.statusFilter === "All" || appointment.status === state.statusFilter;

    return matchesName && matchesStatus;
  });
}

export const fetchDoctorAppointments = createAsyncThunk(
  "doctorPage/fetchDoctorAppointments",
  async (doctorId: string, thunkAPI) => {
    try {
      const doctors = (await fetchData("doctors")) as DoctorA[];
      const doctor = doctors.find((doc) => doc.doc_id === doctorId);

      if (!doctor) throw new Error("Doctor not found");

      const appointments = await Promise.all(
        doctor.appointments.map(async (id) => {
          const appointment = await getData(id, "appointments");
          return appointment as Appointment;
        })
      );

      return { doctor, appointments };
    } catch (err) {
      let message = "Unknown error";
      if (err instanceof Error) {
        message = err.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchDoctorById = createAsyncThunk(
  "doctorPage/fetchDoctorById",
  async (doctorId: string, thunkAPI) => {
    try {
      const doctors = (await fetchData("doctors")) as DoctorA[];
      const doctor = doctors.find((doc) => doc.doc_id === doctorId);
      if (!doctor) throw new Error("Doctor not found");
      return doctor;
    } catch (err) {
      let message = "Unknown error";
      if (err instanceof Error) {
        message = err.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const doctorPageSlice = createSlice({
  name: "doctorPage",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
      filterAppointmentsHelper(state);
    },
    setStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
      filterAppointmentsHelper(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload.doctor;
        state.appointments = action.payload.appointments;
        filterAppointmentsHelper(state);
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Unknown error";
      })
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || "Unknown error";
      });
  },
});

export const { setSearchValue, setStatusFilter } = doctorPageSlice.actions;

export default doctorPageSlice.reducer;
