
exports.consume = function(message){
	console.log("Received");
	console.log(message.data.toString('utf8'));
}