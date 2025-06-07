import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, fetchData } from "../../services/apiServices";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/UserSlice"; 
import { type Patient } from "../../features/PatientSlice";
import { type Doctor } from "../../features/DoctorSlice";

type Props = {
  children: React.ReactNode;
};

const AuthLoader = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem("authToken", token);

        const [patients, doctors] = await Promise.all([
          fetchData("patients") as Promise<Patient[]>,
          fetchData("doctors") as Promise<Doctor[]>,
        ]);

        const matchedPatient = patients.find(p => p.id === user.uid);
        const matchedDoctor = doctors.find(d => d.id === user.uid);

        if (matchedDoctor) {
          dispatch(setUser({ data: matchedDoctor, role: "doctor", token }));
        } else if (matchedPatient) {
          dispatch(setUser({ data: matchedPatient, role: "patient", token }));
        }
      }

      setLoading(false);
    });

    return () => unsubscribe(); 
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthLoader;
