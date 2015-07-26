var config = require("../config/messagingConfig"),
	Q = require("q"),
	queue;


exports.get = function(){
	return queue;
}

exports.configure = function(connection){
	var deferred = Q.defer();
	connection.queue(config.STORY_QUEUE, config.queueProps, function(queue){
		queue.bind(config.STORY_EXCHANGE, config.ROUTING_KEY, function(){
			queue = queue;
			deferred.resolve(queue);
		});
	});

	return deferred.promise;
}