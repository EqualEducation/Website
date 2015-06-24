Contacts = new Mongo.Collection('contacts');
Articles = new Mongo.Collection('articles');

if(Meteor.isServer) {
  Contacts._ensureIndex({city: 1, title: 1});
}
