var db = require("../db"),
	Q = require("q");

module.exports = {
	saveStoryIds: function(data){
		var deferred = Q.defer();
		//data.type and data.ids
		var dbConn = db.get();
		var collectionName = "story_ids";
		var collection = dbConn.collection(collectionName);
		collection.insert(data, function(err, results){
			if( err ){
				deferred.reject(err);
			} else {
				deferred.resolve(results);
			}
		});

		return deferred.promise;

	},
	saveStory: function(data){
		var deferred = Q.defer();
		var dbConn = db.get();
		var collectionName = "stories";
		var collection = dbConn.collection(collectionName);
		collection.insert(data, function(err, results){
			if( err ){
				deferred.reject(err);
			} else {
				deferred.resolve(results);
			}
		});
		return deferred.promise;
	},
	isAvailable: function(){
		
	}
}