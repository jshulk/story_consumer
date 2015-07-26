var amqp = require("amqp"),
	config = require('../config/messagingConfig'),
	Q = require("q");
var connection;
module.exports = {
	getConnection: function(){
		return connection;
	},
	create: function(){
		var deferred = Q.defer();
		amqp.createConnection(config.connectionProps).on("ready", function(){
			connection = connection;
			deferred.resolve(connection);
		});
		return deferred.resolve;
	}

};