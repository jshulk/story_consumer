
var messagingConfig = {
	STORY_EXCHANGE: "HN_STORIES_EX",
	STORY_QUEUE: "HN_STORIES_Q",
	ROUTING_KEY: "HN_STORIES_KEY",
	connectionProps: { 
		url: "amqp://guest:guest@localhost:5672"
	},
	exchangeProps: {
		type: "topic",
		durable: true
	},
	queueProps: {
		durable: true,
		autoDelete: false
	},
	publishProps: {
		contentType: "application/json",
		contentEncoding: "utf-8"
	},
	channelProps: {
		prefetchCount: 1
	}
};

module.exports = messagingConfig;