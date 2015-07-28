var config = require("../config/messagingConfig"),
	_ = require("lodash"),
	storyService = require("../services/storyService"),
	webApi = require("../utils/webApi"),
	async = require("async");

exports.consume = function(message){
	var data = message.data.toString(config.publishProps.contentEncoding);
	var parsedData = JSON.parse(data)
	if( parsedData && !_.isEmpty(parsedData)){

		if( parsedData.type ){
			storyService.saveStoryIds(parsedData);
		} else {
			processStoryId(parsedData);
		}
	}
	console.log("Received");

}

function processStoryId(data){
	//check if present in database
	var tasks = [
		fetchStory,
		saveStory
	];

	var isAvailable = storyService.isAvailable(data.id);
	if(! isAvailable ){

		async.waterfall(tasks.unshift(async.constant(data.id)), function(err, results){
			if( err ){
				console.log("error occurred while processing story Id");
			} else {
				console.log("story processed successfully");
			}
		}); 		
	}

}

function fetchStory(storyId, callback){
	webApi.fetchItem(storyId);
	.then(function(data){
		callback(null, data);
	})
	.catch(function(){
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