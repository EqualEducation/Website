
var fields = ['city', 'contact_type', 'contact_sub_type', 'member', 'first_name', 'last_name', 'email', 'cellphone','grade','youth_group','year_group'];

Template.contacts.onRendered(function() {
  Session.set("fieldsToSearch", fields);
  Session.set("visibleFields", fields);
  Session.set("quickSearchTerm", null);

  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false // Displays dropdown below the button
    }
  );
})

Template.add_contact.onRendered(function() {
  $('.modal-trigger').leanModal();
});

Template.searchBox.onRendered(function() {
  $('.collapsible').collapsible({
     accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
   });
});

Template.advancedSearch.onRendered(function() {
  $('.modal-trigger').leanModal();
});

Template.searchResult.onRendered(function() {
  $('.modal-trigger-columns').leanModal();
});

Template.advancedSearchSelect.onRendered(function() {
  $('select').material_select();
});

Template.registerHelper("availableContactFields", function () {
    var contactfields = ContactFields.find().fetch();
    console.log(contactfields)
    return contactfields;
});

Template.registerHelper("selectedContactFields", function (param2) {
    if (Session.get("fieldsToSearch") != undefined) {
      var contactfields = ContactFields.find( { name: { $in: Session.get("fieldsToSearch") } } ).fetch();
      return contactfields;
    } else {
      var contactfields = ContactFields.find({default: true}).fetch();
      return contactfields;
    }
});

Template.registerHelper("userSelectedSearchableOrDefault", function (field, isDefault) {
  var ret = false;
  var fieldsToSearch = Session.get("fieldsToSearch")
  var index = fieldsToSearch.indexOf(field)
  if (index > -1) {
    ret = true;
  };
  return ret;
});


Template.registerHelper("userSelectedVisibleOrDefault", function (field, isDefault) {
  var ret = false;
  var visibleFields = Session.get("visibleFields")
  var index = visibleFields.indexOf(field)
  if (index > -1) {
    ret = true;
  };
  return ret;
});

//MENU
Template.contacts.events({
  "click .menu_save": function(e,t) {
    var searchToSave = new Object()
    searchToSave.quickSearchTerm = Session.get("quickSearchTerm");
    searchToSave.createdAt = new Date();
    var userSearches = UserSearches.find({userId : Meteor.userId()}).fetch();

    if (userSearches.length == 0) {
      UserSearches.insert({
        userId : Meteor.userId(),
        createdAt: new Date(),
        searches : [searchToSave]
      });
    } else {
      UserSearches.update({ userId: Meteor.userId()},{ $push: { searches: searchToSave }})
    }
  },
  "click .menu_open": function(e,t) {
    var existingUserSearches = UserSearches.find({userId : Meteor.userId()});
    console.log(existingUserSearches);
  }
});


//QUICK SEARCH
Template.quickSearch.events({
  "keyup input": function(e,t) {
    var searchTerm = $(".reactive-table-input").val()
    console.log(searchTerm)
    Session.set("quickSearchTerm", searchTerm);
  },
});

//ADVANCED SEARCH
Template.advancedSearch.events({
  "click .edit_search_fields": function(e,t) {
  },
  "click .save_fields": function(e,t) {
    var searchIDs = $("#fields input:checkbox:checked").map(function(){
         return $(this).attr("id");
    }).get();
    Session.set("fieldsToSearch",searchIDs)

    return;
  }
});

Template.searchResult.events({
  "click .save_columns": function(e,t) {
    var searchIDs = $("#columns input:checkbox:checked").map(function(){
        var fullId = $(this).attr("id");
        var stringToRemove = "column_"
        var actualId = fullId.substring(stringToRemove.length, fullId.length);
        console.log(actualId);
        return actualId;
    }).get();
    Session.set("visibleFields",searchIDs)
    return;
  }
});

//REACTIVE TABLES
Template.searchResult.helpers({
    settings: function () {
        return {
            rowsPerPage: 20,
            showFilter: false,
            fields: Session.get("visibleFields"),
            filters: ['myFilter'],
            showNavigation: 'auto'
        };
    }
});
