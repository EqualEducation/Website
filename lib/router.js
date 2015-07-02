//GLOBAL
Router.configure({
  layoutTemplate: 'main',
  template: 'home'

});

var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause) {
      if (!Meteor.userId()) {
        this.render('accounts');
        return pause();
      } else {
        return this.next();
      }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['staff']
});

//ROUTES
Router.route('/', function () {
  Meteor.subscribe("published_articles");
  this.render('home');
});


Router.route('/accounts', function () {
  this.render('accounts');
});

Router.route('/accounts/register', function () {
  this.render('register');
});

Router.route('/staff', function () {
  this.render('staff');
});

Router.route('/contacts', function () {
  Meteor.subscribe("visible_contact_fields");
  Meteor.subscribe("contacts");

  this.render('contacts');
});

Router.route('/tools', function () {
  this.render('tools');
});

Router.route('/contactus', function () {
  this.render('contact_us');
});
