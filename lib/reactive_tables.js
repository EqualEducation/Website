var Contacts = new Meteor.Collection("contacts");

if (Meteor.isServer) {
  // ReactiveTable.publish('contacts', function ()
  // { return Contacts; },
  // {});
  ReactiveTable.publish("contacts", function () {
  if (this.userId) {
    return Contacts;
  } else {
    return [];
  }
});

}
