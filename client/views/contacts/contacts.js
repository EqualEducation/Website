Template.contacts.onRendered(function() {
  console.log(this.data);

});

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
  }
});

Template.searchResult.rendered = function() {
  ContactsSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    ContactsSearch.search(text);
  }, 200)
});
