import React from 'react';
import { useAppSelector } from '../../app/hooks'; 
import { selectUserData } from '../../features/UserSlice';
import { Navigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const userData = useAppSelector(selectUserData);

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-container">
      <h2>Welcome, {userData.name} {userData.surname}</h2>
    </div>
  );
};

export default Profile;
