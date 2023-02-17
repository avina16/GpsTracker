import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import React, { useState } from "react";
import './index.css';
import DeviceDetails from './components/DeviceDetails/DeviceDetails';
import DeviceSummary from "./components/DeviceSummary/DeviceSummary";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import DataEntry from "./components/DataEntry/DataEntry";

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/register" element={ isLoggedIn ? <Navigate to="/" /> : <Register isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} /> } />;
          <Route path="/login" element={ isLoggedIn ? <Navigate to="/" /> : <Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} /> } />;
          <Route path="/" element={ isLoggedIn ? <DeviceSummary isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to="/login" /> } />;
          <Route path="/device/:id" element={isLoggedIn ? <DeviceDetails isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>: <Navigate to="/login" />} />;
          <Route path="/DataEntry" element={isLoggedIn ? <DataEntry isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to="/login" /> } />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);