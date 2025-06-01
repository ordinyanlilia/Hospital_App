import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks'; 
import { selectUserData, clearUser } from '../../features/UserSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/apiServices'; // ensure auth is correctly imported
import { Button } from 'antd';

const Profile: React.FC = () => {
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  const handlePatientLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('authToken');
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {userData.name} {userData.surname}</h2>
      <Button type="primary" danger onClick={handlePatientLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default Profile;
