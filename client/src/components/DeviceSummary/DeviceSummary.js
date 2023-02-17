import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DataEntry from "../DataEntry/DataEntry";

function DeviceSummary(props) {
  const useHasChanged= (val) => {
    const prevVal = usePrevious(val)
    return prevVal !== val
    }
    const usePrevious = (value) => {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
    }

  const [deviceIdPrefix, setDeviceIdPrefix] = React.useState('');
  const [deviceTypePrefix, setDeviceTypePrefix] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const hasDeviceIdPrefixChanged = useHasChanged(deviceIdPrefix);
  const hasDeviceTypePrefixChanged = useHasChanged(deviceTypePrefix);

  let navigate = useNavigate();
  React.useEffect(() => {
    if (hasDeviceIdPrefixChanged || hasDeviceTypePrefixChanged) loadData();
  });

  async function loadData() {
    const response = await fetch('/ListAllLocations', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'deviceIdPrefix': deviceIdPrefix,
        'deviceTypePrefix': deviceTypePrefix,
      })
  }).then(res => res.json());
    setRows(response.rows);
  }

  function logout() {
    props.setLoggedIn(false);
  }

  
  return (
    <div className="App">
      <h3>Device Summary</h3>
      <input type = "text" name = "deviceIdPrefix" id = "deviceIdPrefix" placeholder="Search by device ID" value ={deviceIdPrefix || ""} onChange={(event) => setDeviceIdPrefix(event.target.value)}/>
      <input type = "text" name = "deviceTypePrefix" id = "deviceTypePrefix" placeholder="Search by device Type" value ={deviceTypePrefix || ""} onChange={(event) => setDeviceTypePrefix(event.target.value)} />
      <button onClick={logout}>Logout</button>
      <button onClick={() => navigate('/DataEntry')}>Enter new Data</button>
      <TableContainer component={Paper}>
     <Table aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell>Device ID</TableCell>
           <TableCell>Device Type</TableCell>
           <TableCell>Timestamp</TableCell>
           <TableCell>Location</TableCell>
           <TableCell></TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {rows.map((row) => (
           <TableRow key={row.number}>
             {/* <TableCell component="th" scope="row">
               {row.number}
             </TableCell> */}
             <TableCell>{row.deviceId}</TableCell>
             <TableCell>{row.deviceType}</TableCell>
             <TableCell>{row.timestamp}</TableCell>
             <TableCell>{row.location}</TableCell>
             <TableCell> <button onClick={() => navigate('/device/'+row.deviceId)}>Open</button></TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
        
    </div>
  );
}

export default DeviceSummary;
