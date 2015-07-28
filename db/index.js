var Q = require('q');
var client = require("mongodb").MongoClient;
var db;
var appConstants = require("../constants/appConstants");

var mongo_uri = appConstants.mongo_uri;
/**
* returns Promise
*/
exports.get = function(){
    return db;
}


exports.create =  function(){
    var deferred = Q.defer();
    client.connect(mongo_uri, {auto_reconnect: true}, function(err, database){
        if( err ){
            deferred.reject(err);
        } else {
            db = database;
            deferred.resolve(db);
        }
    });
    
    return deferred.promise;
}

