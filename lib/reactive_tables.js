var Contacts = new Meteor.Collection("contacts");

if (Meteor.isServer) {
  ReactiveTable.publish('contacts', function () { return Contacts; }, {});
}
