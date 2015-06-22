Packages = new Mongo.Collection('contacts');

if(Meteor.isServer) {
  Packages._ensureIndex({city: 1, title: 1});
}
