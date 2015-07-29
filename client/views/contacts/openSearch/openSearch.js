Template.modal_open.events({
  'click .open_search' : function() {
    var searchTerm = this.quickSearchTerm;
    $(".reactive-table-input").val(searchTerm);
    Session.set("quickSearchTerm", searchTerm);
    $('#open').closeModal();
    $(".reactive-table-input").keyup();
  }
});
