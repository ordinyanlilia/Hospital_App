import { createAppSlice } from '../app/createAppSlice.ts';
import { type Patient } from './PatientSlice';
import { type Doctor } from './DoctorSlice';

interface UserState {
  data: Patient | Doctor | null;
  role: 'patient' | 'doctor' | null;
  token: string | null;
  emailStatus: boolean
}

const initialState: UserState = {
  data: null,
  role: null,
  token: null,
  emailStatus: false,
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
    setEmailVerified: create.reducer((state, action: { payload: boolean }) => {
      state.emailStatus = action.payload;
    })
  }),
  selectors: {
    selectUserData: state => state.data,
    selectUserRole: state => state.role,
    selectUserToken: state => state.token,
    selectUserStatus: state => state.emailStatus,
  },
});

export const { setUser, clearUser, setEmailVerified } = userSlice.actions;
export const { selectUserData, selectUserRole, selectUserToken, selectUserStatus } = userSlice.selectors;
export default userSlice;
