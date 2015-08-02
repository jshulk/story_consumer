var bootstrap = require("./queue/bootstrap"),
	config = require("./config/messagingConfig"),
	storyConsumer = require("./consumer/storyConsumer");
	
bootstrap.init()
.then(function(channel){
	channel.consume(config.STORY_QUEUE, storyConsumer.consume);
})
.catch(function(err){
	console.log(err.msg);
});