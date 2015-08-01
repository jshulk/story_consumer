var config = require("../config/messagingConfig"),
	_ = require("lodash"),
	Q = require('q'),
	storyService = require("../services/storyService"),
	webApi = require("../utils/webApi"),
	async = require("async"),
	storyQueue = require("../queue/storyQueue");

exports.consume = function(message){
	console.log("consume called");
	var queue = storyQueue.get();
	var parsedData = message;

	if( parsedData && !_.isEmpty(parsedData)){

		if( parsedData.type ){
			storyService.saveStoryIds(parsedData)
			.then(function(){
				console.log("message acknowledged");
				//messageObject.acknowledge(true);
				queue.shift();
			})
			.catch(function(){
				messageObject.acknowledge(false);
			});
			
		} else {
			processStoryId(parsedData)
			.then(function(){
				console.log("message acknowledged");
				queue.shift();
				messageObject.acknowledge(true);
			})
			.catch(function(){
				messageObject.acknowledge(false);
			})
		}
	}
	console.log("Received");

}



function processStoryId(data){
	var deferred = Q.defer();
	var tasks = [
		async.constant(data.id),
		isAvailable,
		fetchStory,
		saveStory
	];
		async.waterfall(tasks, function(err, results){
			if( err ){
				console.log("error occurred while processing story Id " + data.id);
				deferred.reject(err);
			} else {
				console.log("story processed successfully");
				deferred.resolve(results);
			}
		}); 		
		
	return deferred.promise;
	

}

function isAvailable(storyId, callback){
	storyService.isAvailable(storyId)
	.then(function(response){
		callback(null, true, storyId);
	})
	.catch(function(response){
		callback({msg: "not available"}, null)
	});
}

function fetchStory(isAvailable, storyId, callback){
	webApi.fetchItem(storyId)
	.then(function(data){
		callback(null, data);
	})
	.catch(function(err){
		console.log("error while fetching stories");
		console.log(err);
		callback({msg: "Error occurred while fetching the story"}, null);
	});
}

function saveStory(story, callback){
	storyService.saveStory(story)
	.then(function(str){
		callback(null, str);
	})
	.catch(function(){
		callback({msg: "Error occurred while saving story"}, null);
	});
}