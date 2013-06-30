if (Meteor.isClient) {
  
  Meteor.startup(function () {
    Deps.autorun(function () {
    Meteor.subscribe('vines', function onComplete() {
      Session.set('vinesLoaded', true);
      });
    });
  });


  function getRandomVineId(){    
    var v = Vines.find({}).fetch();
    var rando=Math.floor(Math.random()*11) // random number between 1 and 10..
    var index = rando % v.length;
    return v[index].vine_id;
  }

  // templates
  Template.hello.greeting = function () {
      return "Welcome to grapevine.";
    };

  Template.video.vineurl = function () {
    var v = Vines.find({vine_id : "ha7Wbmnq6Ph"}).fetch()[0];
    if (v){
      var id = getRandomVineId();
      return "https://vine.co/v/" + id + "/embed/simple";
    }
    // todo: loading url
  }

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}