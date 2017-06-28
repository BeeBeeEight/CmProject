var express = require('express');
var request = require('request');
var routes = express.Router();


var token
var debitor

var auth = {
    url : 'https://autocollectapi.cmpayments.com/v1.0/token',
    method: 'POST',
    headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'X-CM-MERCHANT':'AMR-745B5C98-648A-45A1-ACB4-BDAD2AB9E936'
    },
    body: 'grant_type=password&username=Avans1ApiUser&password=59bf8b536a0802561c8be4e3fd1b300847f5549d190499670921a3e40467d707'
};

routes.post('/ticketBestellen', function(req, response) {
    request(auth, function(err, res, data) {  
        var result = JSON.parse(data);
        token = result.access_token;
//        console.log(token)
        var debitor_reference = req.body.debitor_reference
        var phone_number = req.body.phone_number
        var total_amount = req.body.total_amount
        
        // if (phone_number = "undefined"){
        //     debitor = {
        //     url : 'https://autocollectapi.cmpayments.com/v1.0/groups/AGR-EBA031C1-625E-42C4-B072-E0E89EBC14D5/debtors',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type' : 'application/json',
        //         'Authorization': 'bearer ' + token
        //     },
        //     body: '[{"reference": "' + debitor_reference + '", "total_amount": '+ total_amount +', "no_direct_debit": true, "currency": "EUR", "locale": "nl-NL",}]'
        //     }
        // }else{
        //     debitor = {
        //     url : 'https://autocollectapi.cmpayments.com/v1.0/groups/AGR-EBA031C1-625E-42C4-B072-E0E89EBC14D5/debtors',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type' : 'application/json',
        //         'Authorization': 'bearer ' + token
        //     },
        //     body: '[{"reference": "' + debitor_reference + '", "phone_number": "' + phone_number + '", "total_amount": '+ total_amount +', "no_direct_debit": true, "currency": "EUR", "locale": "nl-NL",}]'
        //     }
        // }
        // /*
        // response.status(200).json({
        //     "token":token,
        //     "debitor":debitor
        // });
        // */
                
        // request(debitor, function(err, res, data){
            
            
            var checkout ={
                url : 'https://autocollectapi.cmpayments.com/v1.0/groups/AGR-D3311306-C7A0-415B-835B-7D07B5508513/check-outs',
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'bearer ' + token
                },
                body: '{ "reference": "'+debitor_reference+'", "currency": "EUR", "locale": "nl-NL", "total_amount": '+ total_amount +'}'
            }

            request(checkout, function(err, res, data){
                //response
              //  console.dir(data);
            var result = JSON.parse(data);
            var checkout_url = result.check_out_url;
              response.status(200).json(
                  {"checkout": checkout_url}
              )
            })
        });
    });
// });

module.exports = routes;