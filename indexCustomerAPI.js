var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var apiversion='/api/v1';


//MYSQL Connection
var db = require('./config/db.config');


var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());



app.get(apiversion + '/customers',  function (req, res)  {  

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  db.query('SELECT * FROM customers', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'customers list', data: results });
  });

  
});


app.put(apiversion + '/customer/:customerId',  function (req, res)  {  

  var customerId = req.body.customerId;
  var customerName = req.body.customerName;
  var customerAddress = req.body.customerAddress;
  var customerAge = req.body.customerAge;
  var customerPicture = req.body.customerPicture;


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  
  db.query(`UPDATE customers 
            Set
               customerId = ${customerId},
               customerName = '${customerName}',
               customerAddress = '${customerAddress}',
               customerAge = '${customerAge}',
               customerPicture ='${customerPicture}'

  
            where customerId='${customerId}';`,function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, message: ' Modified customer' });
   });

});

app.delete(apiversion + '/customer/:customerId',  function (req, res)  {  

  var customerId = req.params.customerId;

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  
  db.query(`DELETE from customers WHERE customerId =${customerId};`,function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: ' delete ' });
  });

});

app.listen(port, function () {
    console.log("Server is up and running...");
});
