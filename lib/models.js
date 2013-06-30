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