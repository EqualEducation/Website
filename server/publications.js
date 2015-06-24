SearchSource.defineSource('contacts', function(searchText, options) {
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
    // return Contacts.find({}, options).fetch();
    return nil;
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  console.log("Start Search");
  console.log(searchText);
  var partsByQuotes = searchText.trim().split(/[\"]+/);
  var parts = searchText.trim().split(/[ \-\:]+/);
  console.log(partsByQuotes);
  var regex = new RegExp("(" + parts.join('|') + ")", "ig");
  console.log(regex);
  return regex;
}

Meteor.publish("published_articles", function () {
  return Content.find(
    //query predicate (where clause)
    {
      content_type : "article",
      mainpic: { $exists: true, $ne : ""}
    },
    //filter object
    {
      sort: {start_date: -1},
      limit: 10

    });
});
