Accounts.onCreateUser(function(options, user) {
  userData = {
    'email': user.emails[0].address,
    'name': (options.profile) ? options.profile.name : ""
  }
  user.owner = user._id;
  if (options.profile) {
    user.profile = options.profile
  }
  user.profile.image = "http://tennisweek.com/wp-content/uploads/2014/03/Tennis-Ball.jpg"
  return user;
});
