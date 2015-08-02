var async = require("async"),
	Q = require("q"),
	db = require("../db");
	connection = require("./connection"),
	consumerChannel = require("../channels/consumerChannel"),
	config  = require("../config/messagingConfig"),
	queue = require("./storyQueue");

exports.init = function(){
	var deferred = Q.defer(),
		tasks = [
			createDbConnection,
			createConnection,
			createChannel,
			configureChannel,
			configureQueue,
			bindQueue
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
		callback({msg: "Could not establish connection"}, null);
	});
}

function configureQueue(channel, callback){
	queue.configure(channel)
	.then(function(){
		callback(null, channel);
	})
	.catch(function(){
		callback({msg: "Could not create queue"}, null);
	});
}

function createChannel(connection, callback){
	consumerChannel.create(connection)
	.then(function(chan){
		callback(null, chan)
	})
	.catch(function(err){
		callback(err, null);
	});
}

function configureChannel(channel, callback){
	channel.prefetch(config.channelProps.prefetchCount)
	.then(function(){
		callback(null, channel);
	})
	.catch(function(err){
		callback(err, null);
	});
}

function bindQueue(channel, callback){
	channel.bindQueue(config.STORY_QUEUE, config.STORY_EXCHANGE, config.ROUTING_KEY)
	.then(function(){
		callback(null, channel);
	})
	.catch(function(err){
		callback(err, null);
	})
}
