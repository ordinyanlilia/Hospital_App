import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchData} from "../../services/apiService";

export type Doctor = {
    id?: string;
    name?: string;
    surname?: string;
    specialty?: string;
    photoUrl?: string;
    gender?: string;
    email?: string;
    doc_id?: string;
    yearsOfExperience?: number;
    bio?: string;
};

export const fetchDoctors = createAsyncThunk(
    "doctors/fetchDoctors",
    async () => {
        return await fetchData<Doctor>("doctors");
    }
);

interface DoctorsState {
    doctors: Doctor[];
    isLoading: boolean;
    error: string | null;
}

const initialState: DoctorsState = {
    doctors: [],
    isLoading: false,
    error: null,
};

const doctorsSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDoctors.fulfilled, (state, action: { payload: Doctor[] }) => {
                state.doctors = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? null;
            });
    }
});
export const selectDoctors = (state: { doctors: DoctorsState }) => state.doctors.doctors;
export const selectLoading = (state: { doctors: DoctorsState }) => state.doctors.isLoading;
export default doctorsSlice;
