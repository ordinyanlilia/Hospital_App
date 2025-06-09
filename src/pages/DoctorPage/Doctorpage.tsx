import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { clearUser, selectUserData } from "../../features/UserSlice";
import { LOGIN } from "../../routes/paths";
import { signOut } from "firebase/auth";
import { auth } from "../../services/apiService.ts";
import { Button } from "antd";
import { useEffect } from "react";




const Doctorpage = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser || !userData) {
      navigate(LOGIN);
    }
  }, [userData, navigate]);

  const handleDoctorLogOut = async () => {
    await signOut(auth);
    localStorage.removeItem("authToken");
    dispatch(clearUser());
    navigate(LOGIN);
  };

  return (
    <>
      <h2>Welcome {userData?.name} {userData?.surname}</h2>
      <Button type="primary" danger onClick={handleDoctorLogOut}>Log Out</Button>
    </>
  );
};


export default Doctorpage;