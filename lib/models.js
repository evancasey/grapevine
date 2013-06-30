Vines = new Meteor.Collection('vines');
Users = new Meteor.Collection('users');

var tt = "When your parents open the blinds while you're sleeping... https://vine.co/v/habHXtzqMlg"


if (Meteor.isServer) {
  // publish all the vines
  Meteor.publish('vines', function () {
    this.ready();
    return Vines;
  });
}


// mongo API
Meteor.methods({
    addVine: function(vine_id, tweet_id, tweet_body, user){
        Vines.insert({
            vine_id : vine_id,
            tweet_id : tweet_id,
            tweet_body : tweet_body,
            user : user,
            created_at : new Date().getTime()
        });
    },
    // getNewestVineId: function(){
    //     var c = Vines.find({}, {sort: {created_at: -1}});
    //     var v = c.fetch()[0];
    //     id = v.vine_id;
    //     return id;
    // }
});


// function getNewestVine(){

// }
