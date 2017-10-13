var myDBClass = require('/home/corinne/chatServerTwo/myDB.js');

function dbCallback(err,results) {
  console.log("err= " + err + "results= " + results);
}

var dbOps = new myDB("chat"); 
dbOps.insert(message,dbCallback);
return ; 



const express = require('express');
var rest = require('/home/corinne/chatServerTwo/restServer/index.js');
const app = express();
var bodyParser = require('body-parser')

app.use(express.static('public'));
//app.use(express.bodyParser());

// parse application/json
app.use(bodyParser.json());

app.get('/test',rest.restRequest);
app.post('/test',rest.restRequest);
app.delete('/test:id',rest.restRequest);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

