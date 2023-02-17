import React, { useState } from "react";
import "./DataEntry.css";
import { useNavigate } from "react-router-dom";

function DataEntry(props) {
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
    const response = await fetch("/DataEntry", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            deviceid: inputs.deviceid,
            devicetype: inputs.devicetype,
            timestamp: inputs.timestamp,
            location: inputs.location
        })
    }).then(res => res.json());
    if(response.error === "") {
      props.setLoggedIn(true);
    }else {
      setError(response.error);
    }
  }

  return (
    <div className="DataEntry">
        <h1>Device Tracker Application</h1>
        <h3>Enter new data</h3>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
            <label>Enter Device Id:
                <input type = "text" name = "deviceid" id = "deviceid" value ={inputs.deviceid || ""} onChange={handleChange} />
            </label>
            <label>Enter Device Type:
                <input type = "text" name = "devicetype" id = "devicetype" value ={inputs.devicetype || ""} onChange={handleChange} />
            </label>
            <label>Enter Timestamp:
                <input type = "text" name = "timestamp" id = "timestamp" value ={inputs.timestamp || ""} onChange={handleChange} />
            </label>
            <label>Enter Location:
              <input type = "text" name = "location" id = "location" value ={inputs.location || ""} onChange={handleChange} />
            </label>  
        <input type = "submit" value="Enter" /> 
        <button onClick={() => navigate('/')}>Back to DeviceSummary</button>
        </form>
    </div>
  );
}

export default DataEntry;
