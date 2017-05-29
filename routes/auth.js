
var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();

var auth = {
    url : 'https://autocollectapi.cmpayments.com/v1.0/token',
    method: 'POST',
    headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'X-CM-MERCHANT':'AMR-745B5C98-648A-45A1-ACB4-BDAD2AB9E936'
    },
    body: 'grant_type=password&username=Avans1ApiUser&password=59bf8b536a0802561c8be4e3fd1b300847f5549d190499670921a3e40467d707'
};
request(auth, function(err, res, data) {  
    body.data = data;    
    body.emit('update');

});

body.on('update', function (response) {
    var result = JSON.parse(body.data);
    var token = result.access_token;
   
   var payment_plan_get = {
    url : 'https://autocollectapi.cmpayments.com/v1.0/payment-plans',
    method: 'GET',
    headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token +'' 
    }  
};
console.log(payment_plan_get.headers);
request(payment_plan_get, function(err, res, data) {  
    var result = JSON.parse(data);
    console.log(result)
});
});
console.log(body.token)
module.exports = token
module.exports = router;