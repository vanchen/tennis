
Router.onBeforeAction(function() {
  GoogleMaps.load();
  Session.setDefault('profileOn', true)
  Session.setDefault('matchesOn', true)
  Session.setDefault('userOff', true);
  this.next();
});

Router.route('/', function() {
  this.render('map');
},{
  name: 'map'
});
