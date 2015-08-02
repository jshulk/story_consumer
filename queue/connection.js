var amqp = require("amqplib"),
	config = require('../config/messagingConfig'),
	Q = require("q");
var connection;

module.exports = {
	get: function(){
		return connection;
	},
	create: function(){
		var deferred = Q.defer();
		amqp.connect(config.connectionProps.url)
		.then(function(conn){
			connection = conn;
			deferred.resolve(connection);
		})
		.catch(function(err){
			deferred.reject(err)
		})

		return deferred.promise;
	}

};