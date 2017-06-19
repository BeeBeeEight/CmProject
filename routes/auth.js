var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();
var token;

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
    var result = JSON.parse(data);
    token = result.access_token;
    console.log(token)
    
    var payment_plan_get = {
        url : 'https://autocollectapi.cmpayments.com/v1.0/payment-plans',
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ token +'' 
        }  
    };
    request(payment_plan_get, function(err, res, body) {
        var result = JSON.parse(body);
        console.log(result);
    });
});

module.exports = router;