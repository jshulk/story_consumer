var db = require("../db"),
	Q = require("q");

module.exports = {
	
	saveStoryIds: function(data){
		var deferred = Q.defer(),
			dbConn = db.get(),
			collectionName = "story_ids",
			collection = dbConn.collection(collectionName);

			collection.updateOne(
				{type: "TOP_STORIES"},
				{$set: {ids: data.ids}},
				{upsert: true}, function(err, results){
					if( err ){
						deferred.reject(err);
					} else {	
						deferred.resolve(results);
					}
			});
		return deferred.promise;

	},
	saveStory: function(data){
		var deferred = Q.defer(),
			dbConn = db.get(),
			collectionName = "stories",
			collection = dbConn.collection(collectionName);

		collection.insert(data, function(err, results){
			if( err ){
				deferred.reject(err);
			} else {
				deferred.resolve(results);
			}
		});
		return deferred.promise;
	},
	isAvailable: function(id){
		var deferred = Q.defer();
			dbConn = db.get(),
			collectionName = "stories",
			collection = dbConn.collection(collectionName);

		collection.find({id: id}).nextObject(function(err, doc){
			if( err  ){
				deferred.reject(false);
			} else if( doc ){
				deferred.reject({code: "ALREADY_PRESENT"});
			} else if(!doc){
				deferred.resolve(true);
			}	

		});

		return deferred.promise;


	}
}