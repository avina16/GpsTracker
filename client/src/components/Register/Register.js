import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register(props) {
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
    console.log(inputs);
    const response = await fetch("/Register", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            firstname: inputs.firstname,
            lastname: inputs.lastname,
            username: inputs.username,
            password: inputs.password,
            dateofbirth: inputs.dateofbirth,
            contactno: inputs.contactno
        })
    }).then(res => res.json());
    if(response.error === "") {
      props.setLoggedIn(true);
    }else {
      setError(response.error);
    }
  }

  return (
    <div className="Register">
        <h1>Device Tracker Application</h1>
        <h3>Register as new User</h3>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
            <label>Enter First Name:
                <input type = "text" name = "firstname" id = "firstname" value ={inputs.firstname || ""} onChange={handleChange} />
            </label>
            <label>Enter Last Name:
                <input type = "text" name = "lastname" id = "lastname" value ={inputs.lastname || ""} onChange={handleChange} />
            </label>
            <label>Enter Username:
                <input type = "text" name = "username" id = "username" value ={inputs.username || ""} onChange={handleChange} />
            </label>
            <label>Enter Password:
              <input type = "password" name = "password" id = "password" value ={inputs.password || ""} onChange={handleChange} />
            </label>  
            <label>Enter Date of Birth:
              <input type = "date" name = "dateofbirth" id = "dateofbirth" value ={inputs.dateofbirth || ""} onChange={handleChange} />
            </label>    
            <label>Enter Contact No:
              <input type = "text" name = "contactno" id = "contactno" value ={inputs.contactno || ""} onChange={handleChange} />
            </label>
        <input type = "submit" value="Register" />
        <button onClick={() => navigate('/login')}>Back to Login page</button>
        </form>
    </div>
  );
}

export default Register;
