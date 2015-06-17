Router.configure({
  layoutTemplate: 'main',
  template: 'home'

});

Router.route('/', function () {
  // this.layout('main');
  this.render('home');
});


Router.route('/accounts', function () {
  // this.layout('main');
  this.render('accounts');
});

Router.route('/accounts/register', function () {
  // this.layout('main');
  this.render('register');
});

Router.route('/staff', function () {
  // this.layout('main');
  this.render('staff');
});
