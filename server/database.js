var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: '', // TODO
  password: '', // TODO
  database: 'GpsTracker',
})
connection.connect((err) => {
  if (err) {
    console.log(err)
    return;
  }
})
module.exports = connection
