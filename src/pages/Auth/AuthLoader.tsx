import { type ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, fetchData } from "../../services/apiService.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { setUser, clearUser, setEmailVerified } from "../../features/UserSlice.ts";
import { setPatient, type Patient } from "../../features/PatientSlice.ts";
import { type Doctor } from "../../features/DoctorSlice.ts";
import { Spin } from "antd";
import { fetchAppointments, resetStatus } from "../../features/appointments/appointmentsSlice.ts";

type Props = {
  children: ReactNode;
};

const AuthLoader = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

    if (!user) {
      localStorage.removeItem("authToken");
      dispatch(clearUser());
      dispatch(setEmailVerified(false));
      dispatch(resetStatus());
      setLoading(false);
      return;
    }


      try {
        const token = await user.getIdToken(true); 
        localStorage.setItem("authToken", token);
        dispatch(setEmailVerified(user.emailVerified));

        const [patients, doctors] = await Promise.all([
          fetchData<Patient>("patients"),
          fetchData<Doctor>("doctors"),
        ]);

        const matchedPatient = patients.find((p) => p.id === user.uid);
        const matchedDoctor = doctors.find((d) => d.id === user.uid);

        if (matchedDoctor) {
          dispatch(setUser({ data: matchedDoctor, role: "doctor", token}));
          dispatch(fetchAppointments({ appointments: matchedDoctor.appointments }));
        } else if (matchedPatient) {
          dispatch(setUser({ data: matchedPatient, role: "patient", token }));
          dispatch(setPatient(matchedPatient));
          try {
            await dispatch(fetchAppointments({ appointments: matchedPatient.appointments }));
          } catch (error) {
            console.error("Appointment fetch error:", error);
          } finally {
            dispatch(resetStatus());
          }
        } else {
          localStorage.removeItem("authToken");
          dispatch(clearUser());
          dispatch(resetStatus());
        }
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("authToken");
        dispatch(clearUser());
        dispatch(resetStatus());
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <Spin fullscreen tip="Loading..." />;

  return <>{children}</>;
};

export default AuthLoader;
