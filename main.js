const express = require("express")
const app = express()

app.get("/", function(req, res) {
	res.send("Hello world, it's cold in here")
})

app.listen(8000,function(){
	console.log("Running app on port 8000")
})