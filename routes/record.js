const express = require('express');

// recordRoutes is an instance of express Routers
// We use it to define out routes.
// the router will be added as a middleware and will take control of requests starting with /record
const recordRoutes = express.Router();

// this will help us connect to database
const dbo = require('../db/conn');

// this section will help you get a list of all records
recordRoutes.route('/users').get(function (req,res) {
	let db_connect = dbo.getDb('users');

	db_connect
		.collection('users')
		.find({})
		.toArray(function (err, result) {
			if(err) throw err;
			res.json(result);
		});
});

recordRoutes.route('/users/find').get( async function (req,res) {
	let db_connect = dbo.getDb('users');

	console.log(req.query.email);
	console.log(req.query.password)

	let temp = await db_connect.collection('users').find({email: req.query.email, password: req.query.password}).count();

	console.log(temp);

	if(temp > 0){
		res.json({ isThere: true });
	} else {
		res.json({ isThere: false });
	}
})

// this section will help you create a new record
recordRoutes.route('/users/add').post(async function (req,res) {
	let db_connect = dbo.getDb('users');
	
	let myObj = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	};

	await db_connect.collection('users').insertOne(myObj, function (err, res) {
		if(err) throw err;
	});
})

// this section will help you update a record by id
recordRoutes.route('/update/:id').post(function (req,res) {
	let db_connect = dbo.getDb('users');

	let myQuery = { id: req.body.id };

	let newValues = {
		$set: {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		}
	};

	db_connect
		.collection('users')
		.updateOne(myQuery, newValues, function (err,res) {
			if(err) throw err;
			console.log('1 document updated');
		})
});

// this section will help you delete a record
recordRoutes.route('/:id').post(function (req,res) {
	let db_connect = dbo.getDb('users');

	var myQuery = { id: req.body.id };

	db_connect.collection('users').deleteOne(myQuery, function (err, res) {
		if(err) throw err;
		console.log('1 document deleted');
	});
});

module.exports = recordRoutes;