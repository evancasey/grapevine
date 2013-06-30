if (Meteor.isClient) {
  
  var handle = Meteor.subscribe('vines');

  function getRandomVineId(){   
    var v = Vines.find({}).fetch();
    var index=Math.floor(Math.random()*v.length)
    return v[index].vine_id;
  }

  Meteor.methods({
    setUrl: function(){
      if (handle.ready()){
        var id = getRandomVineId();
        var vineframe = document.getElementById('vineframe');
        vineframe.src = "https://vine.co/v/" + id + "/embed/simple";
      }  
    }
  });
  
  setInterval(function(){console.log("seturl"); Meteor.call("setUrl")},10000);

  // function setUrl() {
  //   // if (handle.ready()){
  //     var id = getRandomVineId();
  //     var vineframe = document.getElementById('vineframe');
  //     vineframe.src = "https://vine.co/v/" + id + "/embed/simple";
  //   //}
  // }

  // templates
  Template.hello.greeting = function () {
      return "Welcome to grapevine.";
    };

  // Template.video.vineurl = function () {
    
  //   // todo: loading url
  // }

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}