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
		var con =  amqp.createConnection(config.connectionProps);
		con.on("ready", function(){
			connection = con;
			deferred.resolve(connection);
		});
		return deferred.promise;
	}

};