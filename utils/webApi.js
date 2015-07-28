var request = require('superagent'),
	Q = require("q"),
	appConstants = require("../constants/appConstants");

exports.fetchItem = function(storyId){
 var deferred = Q.defer();
 request(appConstants.ITEM_BASE_URL + storyId + ".json")
 .end(function(err, response){
 	if( err ){
 		deferred.reject(response);
 	} else {
 		deferred.resolve(response.body);
 	}
 });
 return deferred.promise;
}