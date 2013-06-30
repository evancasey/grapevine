if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup
    
    // enter in filter params here
	var url = "https://api.twitter.com/1/statuses/filter.json?track=bob";

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
    
    	// Fiber(function() { 
  
            // create a new oauth connection
            var t = new twitter(oauth);

            // call the twitter streaming api
            t.stream(
                'statuses/filter',
                { track: ['vine'] },
                function(stream) {
                    stream.on('data', Meteor.bindEnvironment(function(tweet) {

                        urls = tweet.entities['urls'];  

                        if (urls.length > 0 && urls[0].display_url.indexOf("vine.co/v/" !== -1)) {                                                  
                            
                            vine_id = parseURL(urls[0].display_url);
                            tweet_id = tweet.id; 
                            tweet_body = tweet.text;
                            user = tweet.user;  

                            // console.log(Vines.findOne());

                            Vines.insert({
                                vine_id : vine_id,
                                tweet_id : tweet_id,
                                tweet_body : tweet_body,
                                user : user,
                                created_at : new Date().getTime()
                            });

                            // console.log(Vines.findOne());
                        }                       
                    }, function(err){}));
                }
            );

		// }).run();
    }

	var parseURL = function(url) {
		return url.substring(10, 21);
	}

	getVines();

  });
}
