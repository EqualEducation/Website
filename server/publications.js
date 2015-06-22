SearchSource.defineSource('contacts', function(searchText, options) {
  console.log(searchText)
  var options = {sort: {isoScore: -1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {title: regExp},
      {city: regExp}
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
