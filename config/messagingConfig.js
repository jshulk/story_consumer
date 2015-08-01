
var messagingConfig = {
	STORY_EXCHANGE: "HN_STORIES_EX",
	STORY_QUEUE: "HN_STORIES_Q",
	ROUTING_KEY: "HN_STORIES_KEY",
	connectionProps: { 
		host: 'localhost', 
		port: 5672,
		login: 'guest',
		password: 'guest', 
		connectionTimeout: 10000, 
		authMechanism: 'AMQPLAIN', 
		vhost: '/', 
		noDelay: true, 
		ssl: { enabled : false}
	},
	exchangeProps: {
		type: "topic",
		durable: true,
		autoDelete: false,
		confirm: true
	},
	queueProps: {
		durable: true,
		autoDelete: false
	},
	publishProps: {
		contentType: "application/json",
		contentEncoding: "utf-8"
	},
	subscriptionProps: {
		ack: true
	}
};

module.exports = messagingConfig; 