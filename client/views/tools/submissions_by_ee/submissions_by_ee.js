Template.submissions_by_ee.onRendered(function() {
    $('.modal-trigger').leanModal();
})

if(Meteor.isClient){
  // This code only runs on the client
  Meteor.subscribe("submissionsByEe");

  Template.submissions_by_ee.helpers({
    submissionsByEe: function () {
      return SubmissionByEe.find().fetch();
    }


  });

  Template.submissions_by_ee.events({

    "click .save" : function(event, template ){
      //event.preventDefault();
      //var pdfFile  = template.find('.pdfFile').value;
      var descript = template.find('.description').value;
      console.log(descript);
      console.log("insert");
      SubmissionByEe.insert({
        description: descript,
        createdBy : Meteor.userId()
      });
      console.log(SubmissionByEe.find());
    console.log(Meteor.userId());
      //Meteor.call("addFile", description);

      //return false;
    }

  });
}
  // Meteor.methods({
  //   addFile : function(description){
  //     console.log("insert called");
  //       SubmissionByEe.insert({
  //         description: description
  //       });
  //     }
  //
  // });
