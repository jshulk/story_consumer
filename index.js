var bootstrap = require("./queue/bootstrap"),
	config = require("./config/messagingConfig"),
	storyConsumer = require("./consumer/storyConsumer");
	
bootstrap.init()
.then(function(channel){
	console.log("consumer configured");
	channel.consume(config.STORY_QUEUE, function(message){
		storyConsumer.consume(channel, message);
	});
})
.catch(function(err){
	console.log(err.msg);
});