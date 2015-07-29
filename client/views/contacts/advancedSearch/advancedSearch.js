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
