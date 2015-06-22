Contacts = new Mongo.Collection('contacts');

if(Meteor.isServer) {
  Contacts._ensureIndex({city: 1, title: 1});
}
