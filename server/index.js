const cors = require("cors");
const path = require("path");
const express = require("express");
var bodyParser = require('body-parser');
const connection = require("./database");


const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));


app.get('/GetAircraftLocations/:deviceId', function(req, res) {
  var deviceId = req.params.deviceId;
  connection.query("SELECT deviceId, deviceType, timestamp, location FROM DeviceLogs WHERE deviceId = ?;", [deviceId], function (err, rows){
    // if(err) {
    //   res.json({"rows": []});
    // } else{
    //   res.json({"rows": rows});
    // }


    if(err){
      res.json({"data": {
        "error": err.message
      }});
      return;
    }
    if (rows.length == 0){
      res.json({"data": {
        "error": "No location found for specified device."
      }});
      return;
    }
    res.json({"data": {
      "type": rows[0]['deviceType'],
      "rows": rows
    }})
  });
});

app.post("/ListAllLocations", (req, res, next) => {
  var deviceIdPattern = req.body.deviceIdPrefix+"%";
  var deviceTypePattern = req.body.deviceTypePrefix+"%";
  connection.query("SELECT x.deviceId, x.deviceType, x.timestamp, x.location FROM DeviceLogs x INNER JOIN (SELECT t.deviceId, MAX(t.timestamp) AS max_timestamp FROM DeviceLogs t GROUP BY deviceId) y ON x.timestamp = y.max_timestamp AND x.deviceId = y.deviceId AND x.deviceId LIKE ? AND x.deviceType LIKE ?;", [deviceIdPattern, deviceTypePattern], function(err, rows){
    if(err) {
      console.log(err);
      res.json({"rows": []});
    } else{
      res.json({"rows": rows});
    }
  });
});

app.post('/Register', function (req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var password = req.body.password;
  var dateofbirth = req.body.dateofbirth;
  var contactno = req.body.contactno;
  // TODO: 
  connection.query("INSERT INTO Users VALUES(?, ?, ?, CONCAT('*', UPPER(SHA1(UNHEX(SHA1(?))))), ?, ?);", [firstname, lastname, username, password, dateofbirth, contactno], (err, rows) => {
    if (err){
      res.json({"error": err.message});
      return;
    }
    res.json({"error": ""})
  });
});

app.post('/DataEntry', function (req, res) {
  var deviceid = req.body.deviceid;
  var devicetype = req.body.devicetype;
  var timestamp = req.body.timestamp;
  var location = req.body.location;
  // TODO: validations
  connection.query("INSERT INTO DeviceLogs VALUES(?, ?, ?, ?);", [deviceid, devicetype, timestamp, location], (err, rows) => {
    if (err){
      res.json({"error": err.message});
      return;
    }
    res.json({"error": ""})
  });
});


app.post('/Login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  // TODO: validations
  connection.query("SELECT COUNT(*) as count FROM Users WHERE username=? AND password=CONCAT('*', UPPER(SHA1(UNHEX(SHA1(?)))));", [username, password], (err, rows, fields) => {
    if (err) {
      res.json({"error": "Unable to connect to database." + err});
      return;
    }
    if(rows[0]['count'] == 1) {
      res.json({"error": ""});
    }else {
      res.json({"error": "Invalid username or password."});
    }
  })
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

