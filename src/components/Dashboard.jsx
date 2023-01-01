import React, { useContext } from "react";
import { Navigate } from "react-router-dom"
import { AuthContext } from "./Auth";
// import { Redirect } from "react-router-dom";
import firebaseConfig from "../firebase_config"; 
import { getAuth } from "firebase/auth";


const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Navigate to="/" />;
    }

    return (
    <dav>
        <h1>Dashboard</h1>
        <p>สวัสดีคุณ {currentUser.phoneNumber}</p>
        <button onClick={() => getAuth(firebaseConfig).signOut()}>ออกจากระบบ</button>
    </dav>
    );
};

export default Dashboard;