/**
 * 
 */

var accountSid = 'ACe32519f8b3a04ff7b95f661a6c41cc8f';
var authToken = 'ccd7c159aad07735ca492994d45f5266';

var client('twilio')(accountSid,authToken);

client.calls.create({
	url:"ivr.eu-gb.mybluemix.net/makeCall",
	to: "+12709778210",
	from: "+12014706266"
}, function(err,call)
{
	console.log("Prathyusha here");
	console.log(call.sid);
	console.log(err);
});