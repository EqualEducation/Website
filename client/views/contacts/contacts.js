
var fields = ['city', 'contact_type', 'contact_sub_type', 'member', 'first_name', 'last_name', 'email', 'cellphone','grade','youth_group','year_group'];

Template.add_contact.onRendered(function() {
  $('.modal-trigger').leanModal();
});

Template.searchBox.onRendered(function() {
  $('.collapsible').collapsible({
     accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
   });
});

Template.advancedSearch.onRendered(function() {
  Session.set("fieldsToSearch", fields);
  $('.modal-trigger').leanModal();
});

Template.searchResult.onRendered(function() {
  Session.set("visibleFields", fields)
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

  // if (fieldsToSearch != undefined) {
  //   if (fieldsToSearch[field] != undefined) {
  //     console.log(field+": " + ret);
  //     ret = true;
  //   }
  // }
  // else if (isDefault != undefined) {
  //     ret = isDefault;
  // }
  return ret;
});


Template.registerHelper("userSelectedVisibleOrDefault", function (field, isDefault) {
  var ret = false;
  var visibleFields = Session.get("visibleFields")
  var index = visibleFields.indexOf(field)
  if (index > -1) {
    ret = true;
  };
  // if (visibleFields != undefined) {
  //   if (visibleFields[field] != undefined) {
  //     console.log(field+": " + ret);
  //     ret = true;
  //   }
  // }
  // else if (isDefault != undefined) {
  //     ret = isDefault;
  // }
  return ret;
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
        };
    }
});
