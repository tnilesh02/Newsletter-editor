const { MongoClient } = require('mongodb');
const Db = "mongodb+srv://user:mongodb@cluster0.gijot.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(Db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let _db;

module.exports = {
	connectToServer: function (callback) {
		client.connect(function (err,db) {
			// verify if we got a good db object
			if(db){
				_db = db.db('myFirstDatabase');
				console.log('Successfully connected to MongoDB');
			}
			return callback(err);
		});
	},

	getDb: function() {
		return _db;
	},
};