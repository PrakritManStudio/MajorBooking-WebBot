import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import firebaseConfig from "../firebase_config";
import { getAuth } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const auth = getAuth(firebaseConfig);
		auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
