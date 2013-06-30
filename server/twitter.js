if (Meteor.isServer) {

	// code to run on server at startup
	Meteor.startup(function () {

		// break this out to another file later
		var oauth = 
		    {   
		        consumer_key: "bN7Daq0GmSNA8Tbd7RFMeA",
		        consumer_secret: "T3QP1XIFYzaQpxzuyKgVjgn1HfYtS6Ftwr7cAlcf8G4",
		        access_token_key: "330015261-kRM2MzI4dXVNROv7Tv6Ok5LxaBabBLlX0kofiVZY",
		        access_token_secret: "a9bKfBc6eG89SqW9FxIYfgzR2U2hqwDkHrGsWVU"
		    };   

		var twitter = Npm.require("ntwitter");	

		function getVines() {

	        // create a new oauth connection
	        var t = new twitter(oauth);

	        // call the twitter streaming api
	        t.stream(
	            'statuses/filter',
	            { track: ['vine'] },
	            function(stream) {
	                stream.on('data', Meteor.bindEnvironment(function(tweet) {

	                    var urls = tweet.entities['urls'];  

	                    if (urls.length > 0 && urls[0].display_url.indexOf("vine.co/v/" !== -1)) {   


	                        var vine_id = parseURL(urls[0].display_url);
	                        var tweet_id = tweet.id; 
	                        var tweet_body = tweet.text;
	                        var user = tweet.user;  

	                        // remove the oldest record
	                        if (Vines.find().fetch().length > 1000) {
	                        
		                        var remove_id = Vines.find().fetch().reverse()[0]._id;	                        
		                        Vines.remove({_id : remove_id});
		                    }
	                        
	                        console.log(tweet.text);
	                        Vines.insert({
	                            vine_id : vine_id,
	                            tweet_id : tweet_id,
	                            tweet_body : tweet_body,
	                            user : user,
	                            created_at : new Date().getTime()
	                        });

	                    }                       
	                }, function(err){}));
	            }
	        );
		}

		var parseURL = function(url) {
			return url.substring(10, 21);
		}

		getVines();

	});
}
