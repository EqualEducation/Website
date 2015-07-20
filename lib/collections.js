ContactFields = new Mongo.Collection('contact_fields');

// Contacts = new Mongo.Collection('contacts');

// Articles = new Mongo.Collection('articles');
SubmissionByEe = new Mongo.Collection('submissionsByEe');

Content = new Mongo.Collection('content');
//
// if(Meteor.isServer) {
//   Contacts._ensureIndex({city: 1, title: 1});
// }
if(Meteor.is_server) {

  SubmissionByEe.allow({
    'insert': function () {
      return true;
    },
    'update': function () {
      return true;
    },
    'remove': function () {
      return true;
    },

  });

}
