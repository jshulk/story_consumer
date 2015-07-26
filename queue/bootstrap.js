var async = require("async"),
	Q = require("q"),
	connection = require("./connection"),
	queue = require("./storyQueue");

exports.init = function(){
	var deferred = Q.defer(),
		tasks = [
			createConnection,
			createQueue
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

function createConnection(callback){
	connection.create()
	.then(function(connection){
		callback(null ,connection);
	})
	.catch(function(){
		callback({msg: "Could not establish connection"}, null);
	});
}

function createQueue(connection, callback){
	queue.create()
	.then(function(queue){
		callback(null, queue);
	})
	.catch(function(){
		callback({msg: "Could not create queue"}, null);
	});
}

