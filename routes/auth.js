var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();
var token;
var groupid;
var amount;
//var phonenumber = NULL; //Wel nodig voor Alexa

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
    console.log(token);

                var payment_plan_get = {
                    url : 'https://autocollectapi.cmpayments.com/v1.0/payment-plans',
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization':'Bearer '+ token + '' 
                    }  
                };

                var group_get = {
                    url : 'https://autocollectapi.cmpayments.com/v1.0/groups',
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization':'Bearer ' + token + ''
                    }
                };

                          




                request(payment_plan_get, function(err, res, body) {
                    var result = JSON.parse(body);
                    console.log(result);

                        request(group_get, function(err, res, body) {
                        var result = JSON.parse(body);
                        groupid = result[0].group_id;
                        console.log(result);
                        console.log("groupid: " + groupid);



                        var debtor_get = {
                            url: 'https://autocollectapi.cmpayments.com/v1.0/groups/' + groupid + '/debtors',
                            method: 'GET',
                            headers: {
                            'Content-Type':'application/json',
                            'Authorization':'Bearer ' + token + ''
                            }
                        }
    
                        var check_out_get = {
                            url: 'https://autocollectapi.cmpayments.com/v1.0/groups/' + groupid + '/check-outs', 
                            method: 'GET',
                            headers: {
                                'Content-type':'application/json',
                                'Authorization':'Bearer ' + token + ''
                            }
                        }  

                            request(debtor_get, function(err, res, body) {
                            var result = JSON.parse(body);
                            console.log(result);


                                request(check_out_get, function(err, res, body){
                                var result = JSON.parse(body);
                                console.log(result);


                                    amount = 13.37; //Deze moet de waarde hebben die meegegeven wordt foor alexa/facebook

                                    var debtor_post = {
                                        url: 'https://autocollectapi.cmpayments.com/v1.0/groups/' + groupid + '/debtors',
                                        method: 'POST',
                                        headers: {
                                            'Content-type':'application/json',
                                            'Authorization':'Bearer ' + token + ''
                                        },
                                        body: '[{"reference": "' + "OWN-DEBTOR-REF" + '", "currency": "EUR", "total_amount": ' + amount + ', "locale": "nl-NL", "no_direct_debit": false}]'
                                    }
 
                                    var checkout_post = { 
                                        url: 'https://autocollectapi.cmpayments.com/v1.0/groups/' + groupid + '/check-outs', 
                                        method: 'POST',
                                        headers: {
                                            'Content-Type':'application/json',
                                            'Authorization':'Bearer ' + token + ''
                                        },
                                        body: '{"reference": "OWN-DEBTOR-REF", "total_amount":' + amount + ', "currency": "EUR", "locale": "nl-NL"}' //verander reference en total amount naar een var
                                    }

                                        request(debtor_post, function(err, res, body){
                                            var result = JSON.parse(body);
                                            console.log(result);
                                        

                                            request(checkout_post, function(err, res, body){
                                                var result = JSON.parse(body);
                                                console.log(result);
                                            });
                                        });
                                }); 
                            });
                        });
                });
});

module.exports = router;