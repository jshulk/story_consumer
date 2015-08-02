var Q = require("q");
var channel;

exports.create = function(connection){
	var deferred = Q.defer();
	connection.createChannel()
	.then(function(chan){
		channel = chan;
		deferred.resolve(channel)
	})
	.catch(function(err){
		deferred.reject(err);
	})
	return deferred.promise;

}

exports.get = function(){
	return channel;
}