Vines = new Meteor.Collection('vines');
Users = new Meteor.Collection('users');

if (Meteor.isServer) {
  // publish all the vines
  Meteor.publish('vines', function () {
    this.ready();
    return Vines;
  });
}

