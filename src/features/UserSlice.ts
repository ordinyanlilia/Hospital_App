import { createAppSlice } from '../app/CreateAppSlice';
import { type Patient } from './PatientSlice';
import { type Doctor } from './DoctorSlice';

export interface UserState {
  data: Patient | Doctor | null;
  role: 'patient' | 'doctor' | null;
}

const initialState: UserState = {
  data: null,
  role: null,
};

const userSlice = createAppSlice({
  name: 'userSlice',
  initialState,
  reducers: create => ({
    setUser: create.reducer((state, action: { payload: { data: Patient | Doctor; role: 'patient' | 'doctor' } }) => {
      state.data = action.payload.data;
      state.role = action.payload.role;
    }),
    clearUser: create.reducer(state => {
      state.data = null;
      state.role = null;
    }),
  }),
  selectors: {
    selectUserData: state => state.data,
    selectUserRole: state => state.role,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const { selectUserData, selectUserRole } = userSlice.selectors;
export default userSlice;
