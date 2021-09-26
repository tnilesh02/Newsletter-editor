const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));
app.use(express.static(path.join( __dirname, "client")));
//get driver connection
const dbo = require('./db/conn');

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
	// perform a database connection when server starts
	dbo.connectToServer(function (err) {
		if(err) console.log(err);
	});

	console.log(`server is running on port: ${port}`)
})