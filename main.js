const express = require("express")
const app = express()

var bodyParser = require('body-parser');
var autoDropMode = "off";
var bottles = 1 // number of bottles to drop

app.use(bodyParser.json())
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
	console.log("manual_drop called")
	var parsedBody;
	if(bottles > 0) {
		bottles--;
		var request = require('request');
		var response;
		request.post('http://128.253.51.87/plane/release_bottle', function(error, response, body) {
			if (error != null) console.log('Bottle release failed:', error);
			if (response && response.statusCode != 200) console.log('statusCode:', response && response.statusCode);
			parsedBody = JSON.parse(body);
			res.send({distance:parsedBody.dist_from_target})
			console.log('Bottle dropped!');
			console.log(parsedBody);
		})
	}
	else res.send({distance:-1})
}

function auto_drop(req, res) {
	autoDropMode = req.body.auto_mode
	console.log("auto_drop called, mode = ", autoDropMode)

	var x;	// x location of plane
	var y;	// y location of plane
	var dx;	// x distance from plane to target
	var dy;	// y distance from plane to target
	var d;	// distance from plane to target
	var vx;	// x velocity of plane
	var vy;	// y velocity of plane
	var v;	// velocity of plane
	var tx = 135	// x location of target
	var ty = 100	// y location of target
	var tick = 1;	// timer interval in seconds
	var md = 0.5;	// mechanical delay
	var ttt;		// time to target
	
	var autoModeTimerInterval = setInterval(autoModeTimer, tick * 1000);

	function autoModeTimer() {
		if(autoDropMode == "on") {
			var request = require('request');
			var response;
			request('http://128.253.51.87/plane/state', function(error, response, body) {
				if (error != null) console.log('error:', error);
				if (response && response.statusCode != 200) console.log('statusCode:', response && response.statusCode);
				var parsedBody = JSON.parse(body);
				
				x = parsedBody.plane_location.x;
				y = parsedBody.plane_location.y;

				vx = parsedBody.plane_velocity.vx;
				vy = parsedBody.plane_velocity.vy;

				dx = tx - x;
				dy = ty - y;
				
				d = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
				
				v = Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2));
				
				ttt = d / v;
				
				console.log("x,y:%d,%d  vx,vy:%d,%d  dx,dy:%d,%d  d:%d  v:%d  ttt:%d", x.toFixed(2), y.toFixed(2), vx.toFixed(2), vy.toFixed(2), dx.toFixed(2), dy.toFixed(2), d.toFixed(2), v.toFixed(2), ttt.toFixed(2));
				
				if(ttt <= tick + md) { // Time to drop!
					if(bottles > 0) {
						bottles--;
						console.log("Auto drop!")

						request.post('http://128.253.51.87/plane/release_bottle', function(error, response, body) {
							if (error != null) console.log('Bottle drop failed:', error);
							if (response && response.statusCode != 200) console.log('statusCode:', response && response.statusCode);
							var parsedBody = JSON.parse(body);
							console.log('Bottle dropped!');
							console.log(parsedBody);
						})
					}
				}
			});
			
		}
		else clearInterval(autoModeTimerInterval);
	}

	res.send({result:"success"})
}

//app.get("/", homepage)
//	res.send({distance:parsedBody.dist_from_target})

/*
function homepage(req, res) {
	var request = require('request');
	var response;

	request('http://128.253.51.87/plane/state', function (error, response, body) {
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
}

*/
