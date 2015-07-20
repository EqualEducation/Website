ContactFields = new Mongo.Collection('contact_fields');

Contacts = new Mongo.Collection('contacts');
// Articles = new Mongo.Collection('articles');
Content = new Mongo.Collection('content');

SubmissionByEe = new Mongo.Collection("submissionsByEe");

if(Meteor.isServer) {
  Contacts._ensureIndex({city: 1, title: 1});

  SubmissionByEe.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  }
  // since there is no update field, all updates
  // are automatically denied
});
}
