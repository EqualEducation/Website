 Template.submissions_by_ee.onRendered(function() {
    $('.modal-trigger').leanModal();
    //filepicker.constructWidget(document.getElementById('upload'));
 })

if(Meteor.isClient){

  Meteor.subscribe("fileUploads");
  Template.submissions_by_ee.helpers({
    theFiles: function () {
      return YourFileCollection.find();
    }
  });

  Template.submissions_by_ee.events({

    'click #upload-file': function (evt) {
      evt.preventDefault();
      console.log('showing')
      var self = this;
          filepicker.pick( function onSuccess(Blob){
            console.log(Blob.url);
            console.log("file picked");
          });

      // filepicker.pick(
      //     function(Blobs){
      //       console.log(Blob.url);
      //     }
      // );
    },

    'click #deleteFileButton ': function (event) {
      console.log("deleteFile button ", this);
      YourFileCollection.remove({_id: this._id});
    },
    'change .your-upload-class': function (event, template) {
      console.log("uploading...")
      FS.Utility.eachFile(event, function (file) {
        console.log("each file...");
        var yourFile = new FS.File(file);
        console.log(yourFile.url());
        YourFileCollection.insert(yourFile, function (err, fileObj) {
          console.log("callback for the insert, err: ", err);
          if (!err) {
            console.log("inserted without error");
          }
          else {
            console.log("there was an error", err);
          }
        });
      });
    }
  });

  Meteor.subscribe("submissionsByEe");
  Template.submissions_by_ee.helpers({
    submissionsByEe: function () {
      return SubmissionByEe.find().fetch();
    }


  });

  Template.submissions_by_ee.events({

    "click .save" : function(event, template ){

      var descript = template.find('.description').value;
      SubmissionByEe.insert({
        description: descript,
        createdBy : Meteor.userId()
      });
      FlashMessages.sendSuccess("Successfully saved");
    }
  });




}
