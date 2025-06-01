import { createAppSlice } from '../app/CreateAppSlice';
import { type Patient } from './PatientSlice';
import { type Doctor } from './DoctorSlice';

interface UserState {
  data: Patient | Doctor | null;
  role: 'patient' | 'doctor' | null;
  token: string | null;
}

const initialState: UserState = {
  data: null,
  role: null,
  token: null,
};

const userSlice = createAppSlice({
  name: 'userSlice',
  initialState,
  reducers: create => ({
    setUser: create.reducer((state, action: { payload: { data: Patient | Doctor; role: 'patient' | 'doctor'; token: string } }) => {
      state.data = action.payload.data;
      state.role = action.payload.role;
      state.token = action.payload.token;
    }),
    clearUser: create.reducer(state => {
      state.data = null;
      state.role = null;
      state.token = null;
    }),
  }),
  selectors: {
    selectUserData: state => state.data,
    selectUserRole: state => state.role,
    selectUserToken: state => state.token,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const { selectUserData, selectUserRole, selectUserToken } = userSlice.selectors;
export default userSlice;
