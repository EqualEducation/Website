SearchSource.defineSource('contacts', function(searchText, options) {
  console.log(searchText)
  var options = {sort: {isoScore: -1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {city: regExp},
      {contact_type: regExp},
      {contact_sub_type: regExp},
      {member: regExp},
      {first_name: regExp},
      {last_name: regExp},
      {email: regExp},
      {cellphone: regExp},
      {grade: regExp},
      {youth_group: regExp},
      {year_group: regExp}
    ]};

    return Contacts.find(selector, options).fetch();
  } else {
    return Contacts.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
