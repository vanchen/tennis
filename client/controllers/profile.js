Template.profile.helpers({
  'user': function() {
    return Meteor.user();
  },
  'image': function() {
    return Meteor.user()
  },
  'userOff': function() {
    return Session.get('userOff')
  }

});

Template.profile.events({
  'change .myFileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function(err, fileObj) {
        if (err) {
          // handle error
        } else {
          // handle success depending what you need to do
          var userId = Meteor.userId();
          var imagesURL = {
            "profile.image": "/cfs/files/images/" + fileObj._id
          };
          Meteor.users.update(userId, {
            $set: imagesURL
          });
        }
      });
    });
  },
});


Template.profile.events({
  'click .login': function() {
    Session.set('createOrSignIn', 'signin')
  },
  'click .register': function() {
    Session.set('createOrSignIn', 'create')
  },
  'submit form': function(event) {
    event.preventDefault()
    var createOrSignIn = Session.get('createOrSignIn')
    if (createOrSignIn == "create") {
      var newUser = {
        email: $('#email2').val(),
        password: $('#password2').val(),
        profile: {
          'firstName': $('#firstName').val(),
          'lastName': $('#lastName').val(),
          'gender': $('#user_gender').val(),
          'skill': $('#user_skill').val(),
          'username' : $('#username').val()
        }
      }
      Accounts.createUser(newUser, function(error) {
        if (error) {
          bootbox.alert(error.reason)
          console.log('True')
          console.log(newUser.email)
        } else {
          Session.set('userOff', false)
          $('#userOff').hide();
          $('#profile-interface').css('visibility', 'visible');
          Session.set('profileOn', true);
          $('#userOff').hide();
          $('#email').val("");
          $('#currentOn').show();
          $('#calenderOn').show();
          $('#completedOn').show();
          $('#profileOn').show();
          $('#signinOn').hide();
          $('#registerOn').hide();
        }
      });
      /*Meteor.call('validateEmailAddress', newUser.email, function(error, response) {
        if (error) {
          bootbox.alert(error.reason)
        } else {
          if (response.error) {
            bootbox.alert(response.error)
          } else {
            Accounts.createUser(newUser, function(error) {
              if (error) {
                bootbox.alert(error.reason)
                console.log('True')
                console.log(newUser.email)
              } else {
                Session.set('userOff', false)
                $('#userOff').hide();
                $('#profile-interface').css('visibility', 'visible');
                Session.set('profileOn', true);
                $('#userOff').hide();
                $('#email').val("");
                $('#currentOn').show();
                $('#calenderOn').show();
                $('#completedOn').show();
                $('#profileOn').show();
                $('#signinOn').hide();
                $('#registerOn').hide();
              }
            });
          }
        }
      }); */
    } else {
            var newUser = {
              email: $('#email').val(),
              password: $('#password').val(),
            }
            Meteor.loginWithPassword(newUser.email, newUser.password, function(error) {
              if (error) {
                bootbox.alert(error.reason)
              } else {
                Session.set('userOff', false)
                $('#profile-interface').css('visibility', 'visible');
                Session.set('profileOn', true);
                $('#email').val("");
                $('#currentOn').show();
                $('#calenderOn').show();
                $('#completedOn').show();
                $('#profileOn').show();
                $('#signinOn').hide();
                $('#registerOn').hide();

              }
            });
          }
        }
      });
