if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to grapevine.";
  };

  var id = "bTxjnvrueTe"

  Template.video.vineurl = function () {
    return "https://vine.co/v/" + id + "/embed/simple";
  }

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}