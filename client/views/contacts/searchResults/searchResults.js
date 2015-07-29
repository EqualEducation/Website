Template.searchResult.events({
  "click .save_columns": function(e,t) {
    var searchIDs = $("#columns input:checkbox:checked").map(function(){
        var fullId = $(this).attr("id");
        var stringToRemove = "column_"
        var actualId = fullId.substring(stringToRemove.length, fullId.length);
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
