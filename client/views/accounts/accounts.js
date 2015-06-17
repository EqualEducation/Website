
var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
}


  var isValidPassword = function(val, field) {
      if (val.length = 6) {
        return true;
      } else {
        // Session.set('displayMessage', 'Error &amp; Too short.')
        return false;
      }
    }


Template.register.events({
  'submit #register-form' : function(e, t){
      e.preventDefault();
      var email = t.find('#register-email').value
        , password = t.find('#register-password').value;

        email = trimInput(email);
        password = trimInput(password);

        // Trim and validate the input

        if (isValidPassword(password)) // &amp;&amp; other validations)
        {
          Accounts.createUser({
            email: email,
            password : password},
            function(err){
              if (err) {
                console.log(err)
                FlashMessages.sendError(err.reason);
              } else {
                FlashMessages.sendSuccess("Successfully logged in");
                Router.go("/staff");
              }

            });
        } else {
          FlashMessages.sendError("Error. Password must be at least 6 characters.");
        }


      return false;
    }
  });

Template.login.events({

    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#login-email').value
        , password = t.find('#login-password').value;

        // Trim and validate your fields here....

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(err){
        if (err){
          console.log(err)
          FlashMessages.sendError(err.reason);
        }
        else {
          FlashMessages.sendSuccess("Successfully logged in");
          Router.go("/staff");
      }
      });
         return false;
    }
  });

Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});
