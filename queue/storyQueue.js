var config = require("../config/messagingConfig"),
	Q = require("q"),
	queue;


exports.get = function(){
	return queue;
}

exports.configure = function(channel){
	var deferred = Q.defer();
	channel.assertQueue(config.STORY_QUEUE, config.queueProps)
	.then(function(storyQueue){
		queue = storyQueue;
		deferred.resolve(storyQueue);
	})
	.catch(function(err){
		deferred.reject(err);
	});

	return deferred.promise;
}