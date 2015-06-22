SearchSource.defineSource('messages', function(searchText, options) {
  console.log(searchText)
  var options = {sort: {isoScore: -1}, limit: 1000};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {title: regExp},
      {city: regExp}
    ]};

    return Packages.find(selector, options).fetch();
  } else {
    return Packages.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
