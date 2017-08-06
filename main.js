const express = require("express")
const app = express()

//app.get("/", function(req, res) {
//	res.send("Hello world, it's cold in here")
//})

app.get("/", homepage)

app.listen(80, function(){
	console.log("Running app on port 80")
})

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
		res.send(response);
	});

}