import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login(props) {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: inputs.username,
                password: inputs.password        
            })
        }).then(res => res.json());

        var error = response.error;
        if (error === ""){
            props.setLoggedIn(true);
        }else {
            setError(error);
        }
    }
  return (
    <div className="Login">
        <h1>Device Tracker Application</h1>
        <h3>User login</h3>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
            <label>Enter username:
                <input type = "text" name = "username" id = "username" value ={inputs.username || ""} onChange={handleChange} />
            </label>
            <label>Enter password:
            <input type = "password" name = "password" id = "password" value ={inputs.password || ""} onChange={handleChange} />
            </label>    
        <input type = "submit" value="Login" />
        </form>
        <button onClick={() => navigate('/register')}>New User</button>
    </div>
  );
}

export default Login;
