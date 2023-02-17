import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./DeviceDetails.css";

function DeviceDetails(props) {
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

  React.useEffect(() => {});
  let navigate = useNavigate();
  const { id } = useParams();
  const hasIdChanged = useHasChanged(id);
  const [rows, setRows] = React.useState([]);
  const [type, setType] = React.useState('');
  const [error, setError] = React.useState([]);
  const [pieChartData, setPieChartData] = React.useState([]);

  React.useEffect(() => {
    if (hasIdChanged) loadData();
  });

  async function loadData() {
    const response = await fetch('/GetAircraftLocations/'+id, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then(res => res.json());
    if (response.data.error) {
      setError(response.data.error);
    } else{
      setType(response.data.type);
      setRows(response.data.rows);
      setPieChartData(buildPieChartData(response.data.rows));
    }
  }

  function buildPieChartData(rows){
    var data = [["Time spent at Location", "count"]];
    var map = new Map();
    rows.forEach(row => {
      if(map.has(row.location)) map.set(row.location, map.get(row.location)+1);
      else map.set(row.location, 1);
    });
    for (const [key, value] of map) {
      data.push([key, value]);
    }
    return data;
  }

  function logout() {
    props.setLoggedIn(false);
  }
  return (
    <div className="DeviceDetails">
        
        <h3>Aircraft ID: {id}</h3>
        <h4>Aircraft Type: {type}</h4>
        <p>{error}</p>
        <button class= "back_button" onClick={() => navigate('/')}>
          Back to Device summary page
        </button>
        <button class="logout-button" onClick={logout}>Log out</button>
        <TableContainer component={Paper}>
     <Table aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell>Timestamp</TableCell>
           <TableCell>Location</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {rows.map((row) => (
           <TableRow key={row.number}>
             <TableCell>{row.timestamp}</TableCell>
             <TableCell>{row.location}</TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>

    <Chart
      chartType="PieChart"
      data={pieChartData}
      options={{
        title: "Time spent on each Location",
        is3D: true,
      }}
      width={"100%"}
      height={"400px"}
    />
    
    
        
    </div>
  );
}

export default DeviceDetails;
