import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Components
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./components/Auth";

function App() {
	const [count, setCount] = useState(0);

	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} exact />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
