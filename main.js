const express = require("express")
const app = express()

app.get("/api/airdrop_status", airdrop_status)

app.post("/api/manual_drop", manual_drop)

app.put("/api/auto_drop", auto_drop)

app.use(express.static('homepage'))

app.listen(80, function(){
	console.log("Running app on port 80")
})

function airdrop_status(req, res) {
	console.log("airdrop_status")
	res.send("airdrop_status")
}

function manual_drop(req, res) {
	console.log("manual_drop")
	res.send("manual_drop")
}

function auto_drop(req, res) {
	console.log("auto_drop")
	res.send("auto_drop")
}

/*
app.get("/", homepage)

function homepage(req, res) {
	var request = require('request');
	var response;

	request('http://latte.sitarbucks.com/plane/state', function (error, response, body) {
		if (error != null) console.log('error:', error); // Print the error if one occurred
		if (response && response.statusCode != 200) console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

		var parsedBody = JSON.parse(body);
		response = body + "<br>"
		response += "<div style=\"color: red\">"
		response += "x:" + parsedBody.plane_location.x + "<br>"
		response += "y:" + parsedBody.plane_location.y + "<br>"
		response += "</div>"
		response += "<form action=\"\" method=\"post\"> <button name=\"drop\" value=\"drop\">Drop</button> </form>"
		res.send(response);
	});
*/
/*
function postit(argument) {
	request.post({url:'http://latte.sitarbucks.com/plane/release_bottle', formData: formData}, function optionalCallback(err, httpResponse, body) {
  		if (err) {
    		return console.error('upload failed:', err);
  		}


  		console.log('Upload successful!  Server responded with:', body);
});
}
}
*/
