var async = require("async"),
	Q = require("q"),
	db = require("../db");
	connection = require("./connection"),
	queue = require("./storyQueue");

exports.init = function(){
	var deferred = Q.defer(),
		tasks = [
			createDbConnection,
			createConnection,
			configureQueue
		];

	async.waterfall(tasks, function(err,results){
		if( err ){
			deferred.reject(err);
		} else {
			deferred.resolve(results);
		}
	});

	return deferred.promise;
}

function createDbConnection(callback){
	db.create()
	.then(function(conn){
		callback(null, conn);
	})
	.catch(function(){
		callback({msg: "could not connect to db"}, null);
	});
}

function createConnection(dbConn, callback){
	connection.create()
	.then(function(connection){
		callback(null ,connection);
	})
	.catch(function(){
		console.log("connection failure");
		callback({msg: "Could not establish connection"}, null);
	});
}

function configureQueue(connection, callback){
	queue.configure(connection)
	.then(function(queue){
		callback(null, queue);
	})
	.catch(function(){
		callback({msg: "Could not create queue"}, null);
	});
}

