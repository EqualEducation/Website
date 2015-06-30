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

Template.registerHelper("userSelectedOrDefault", function (field, isDefault) {
  var ret = false;
  var fieldsToSearch = Session.get("fieldsToSearch")
  console.log(fieldsToSearch)
  if (fieldsToSearch != undefined) {
    if (fieldsToSearch[field] != undefined) {
      console.log(field+": " + ret);
      ret = true;
    }
  }
  // else if (isDefault != undefined) {
  //     ret = isDefault;
  // }
  return ret;
});


//SEARCH
Template.searchResult.rendered = function() {
  ContactsSearch.search('');
};

var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};

var fields = ['city', 'contact_type', 'contact_sub_type', 'member', 'first_name', 'last_name', 'email', 'cellphone','grade','youth_group','year_group'];

ContactsSearch = new SearchSource('contacts', fields, options);

Template.searchResult.helpers({
  getContacts: function() {
    return ContactsSearch.getData({
      // transform: function(matchText, regExp) {
      //   return matchText.replace(regExp, "<b>$&</b>")
      // },
      sort: {isoScore: -1}
    });
  },
  isLoading: function() {
    return ContactsSearch.getStatus().loading;
  },
  getFieldValueForContact: function(visibleContactFields, contact) {
    var visibleFieldValues = []
    visibleContactFields.forEach(function(field){
      if (field.default) {
        var fieldName = field.name
        visibleFieldValues.push(contact[fieldName])
      }
    })
    return visibleFieldValues;
  }
});

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    ContactsSearch.search(text);
  }, 200)
});

//ADVANCED SEARCH
Template.advancedSearch.events({
  "click .edit_search_fields": function(e,t) {
  },
  "click .save_fields": function(e,t) {
    var searchIDs = $("input:checkbox:checked").map(function(){
         return $(this).attr("id");
    }).get();
    Session.set("fieldsToSearch",searchIDs)

    return;
  }
})
