/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var http = require("http");
var app = require('gopher');
var twilio = require('twilio');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var bodyParser = require('body-parser');

var port=process.env.VCAP_APP_PORT || 1337;
http.createServer(app).listen(port), function(){
console.log('Express server listening on port ' + port);
};

//Get the Account SID and Auth Token by parsing VCAP_SERVICES
var accountSid, authToken;
if (process.env.VCAP_SERVICES) {
	 var env = JSON.parse(process.env.VCAP_SERVICES);
	 var credentials = env['user-provided'][0]['credentials'];
     accountSid = credentials.accountSID;
     authToken = credentials.authToken;
}

// serve the files out of ./public as our main files
app.use(bodyParser.urlencoded({extended: true}));

app.get('/makeCall',function(request,response)
{
	console.log("Hit your method");
	response.type('text/xml');
	response.send('<Response><Say>Hello. This is your first automated call</Say></Response>');
	
	var client = new twilio.RestClient(accountSid, authToken);
	 
    /* Make a voice call to your mobile phone */
    // Use the Web page https://www.twilio.com/labs/twimlets/message to create a custom message
    // Setup the voice call to say "Twilio greetings from Bluemix 
    /* To make a voice call to your mobile phone uncomment the next 2 lines */
    //client.calls.create({  
    //url: "http://twimlets.com/message?Message%5B0%5D=Twilio%20greeting%20from%20Bluemix!&",
 
     /* Send a SMS to your mobile phone */
     //  to: Enter your mobile phone  for e.g.98765 43210
     // from: Enter the number Twilio alloted to your account
     // body: The message you would like to send
      client.messages.create({
         body:'Twilio notification through Bluemix!',
         to: '+919704928145',
         from: '+12014706266',      
        }, function(err, message) {
             response.send('Message sent to ! ID:' +message.sid);
    });
      
});

app.listen(1337);

// get the app environment from Cloud Foundryet
/*var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});*/
