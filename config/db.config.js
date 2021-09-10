'use strict';
const mysql = require('mysql');
const dbConn = mysql.createConnection({
  host     : 'localhost',
  port : '3306',
  user     : 'root',
  password : '624235036',
  database : 'bookshopdb_036'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;