var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var Connection = require('tedious').Connection;
  var config = {
    userName: '',
    password: '',
    server: '',
    options: {encrypt: true, database : ''}
  };
  var connection = new Connection(config);
  connection.on('connect', function(err){
    if(err){
       res.render('index', { title : "はじめてのDB",message:err});
    }else{
        console.log("Connected");
        executeStatement();
    }
});

 var Request = require('tedious').Request;
 var TYPES = require('tedious').TYPES;
  
 function executeStatement() {
   request = new Request("SELECT TOP(10) CompanyName FROM SalesLT.Customer;", function(err){
     if(err){
       console.log(err);}
   });
   
 var result = '<table>';
   request.on('row', function(columns) {
     result += '<tr>';
     columns.forEach(function(column){
       if(column.value === null){
         console.log('NULL');
       }else{
         result += '<td>' + column.value + '</td>';
       }
       result += '</tr>';
     });
   });
   
   request.on('doneProc', function(rowCount, more, returnStatus, rows){
     result += "</table>";
     res.render('index', {title : "はじめてのDB",message:result});
   });
   
   connection.execSql(request);
 }
});
  
module.exports = router;
