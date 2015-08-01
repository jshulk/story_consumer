var bootstrap = require("./queue/bootstrap"),
	config = require("./config/messagingConfig"),
	storyConsumer = require("./consumer/storyConsumer");
	
bootstrap.init()
.then(function(queue){
	queue.subscribe(storyConsumer.consume);
})
.catch(function(err){
	console.log(err.msg);
});