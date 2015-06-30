ContactFields = new Mongo.Collection('contact_fields');

Contacts = new Mongo.Collection('contacts');
// Articles = new Mongo.Collection('articles');
Content = new Mongo.Collection('content');

if(Meteor.isServer) {
  Contacts._ensureIndex({city: 1, title: 1});
}
