if (Meteor.isClient) {
  Template.matches.helpers({
    options: function() {
      var events = [];
      Matches.find().forEach(function(match) {
        if (match.host === Meteor.user().username || match.challenger === Meteor.user().username) {
          var post = Posts.findOne(match.match_id);
          var times = post.time.split(" ");
          var test = times[0];
          date = test[6] + test[7] + test[8] + test[9] + '-' + test[0] + test[1] + '-' + test[3] + test[4];
          dateShort = date.substr(0, 7);
          events.push({
            title: '@' + post.court,
            start: date
          });
        }
      });
      return {
        defaultView: 'month',
        events: events
      }
    }
  });
}

Template.matches.onRendered(function() {
  if (Session.get('userOff') === false) {
    $('#profileOn').show();
    $('#currentOn').show();
    $('#calenderOn').show();
    $('#profileOn').show();
    $('#signinOn').hide();
    $('#registerOn').hide();
  }
  else {
    $('#signinOn').show();
    $('#registerOn').show();
    $('#completedOn').hide();
    $('#currentOn').hide();
    $('#calenderOn').hide();
    $('#profileOn').hide();
  }
});


///////////
//Helpers//
///////////


Template.matches.helpers({
  'matchOn': function() {
    return Session.get('matchOn');
  },
  'calenderOn': function() {
    return Session.get('calenderOn');
  },
  'currentOn': function() {
    return Session.get('currentOn');
  },
  'profileOn': function() {
    return Session.get('profileOn');
  },
  'completedOn' : function() {
    return Session.get('completedOn')
  },
  'user': function() {
    var id = Session.get('match-id');
    return Meteor.users.findOne({
      'username': Posts.findOne(id).author
    });
  },
  'post': function() {
    var posts = []

    Posts.find({
      'court': Session.get('courtName')
    }).forEach(function(post) {
      if (post.author === Meteor.user().username) {
        // Do nothing
      } else if (post.play) {
        // Do nothing
      } else {
        posts.push(post)
      }
    });
    return posts
  },
  'postName': function() {
    return Posts.findOne({
      'court': Session.get('courtName')
    })
  },
  'courtTrue': function() {
    return Session.get('courtTrue');
  },
  'completedPosts': function() {
    var completedPosts = [];
    Matches.find().forEach(function(match) {
          if (match.challenger === Meteor.user().username && match.completed === true || match.host === Meteor.user().username && match.completed === true) {
            var matchId = match.match_id;
            console.log("False")
            completedPosts.push(Posts.findOne(matchId))
          }
        });
   return completedPosts;
 },
  posts: function() {
    var posts = [];
    Matches.find().forEach(function(match) {
      if (match.challenger === Meteor.user().username && match.completed === false || match.host === Meteor.user().username && match.completed === false) {
        var today = new Date();
        console.log("True")
        var dd = today.getDate();
        Session.set('thisMatch', match)
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        var today = mm + '/' + dd + '/' + yyyy;
        var match_date = Posts.findOne(match.match_id).time.split(" ")[0]
        match_day = match_date[3] + match_date[4];
        match_month = match_date[0] + match_date[1]
        match_day = +match_day;
        dd = +dd;
        mm = +mm;
        match_month = +match_month;
        if (match_month > mm) {
          var matchId = match.match_id;
          posts.push(Posts.findOne(matchId))
        } else {
          if (match_day >= dd) {
            var matchId = match.match_id;
            posts.push(Posts.findOne(matchId))
          }
        }
      }
    });
    return posts;
  }
});

//////////////
// Events //
/////////////

Template.matches.events({
  'click #currentOn': function(event) {
    Session.set('calenderOn', false);
    Session.set('currentOn', true);
    Session.set('completedOn',false);
    Session.set('profileOn',false);
    $('#calenderOn').css('background-color', '#fff')
    $('#calenderOn').css('color', '#000')
    $('#currentOn').css('background-color', '#006699')
    $('#currentOn').css('color', '#fff')
    $('#completedOn').css('background-color', '#fff')
    $('#completedOn').css('color', '#000')
    $('#profile-interface').css('visibility', 'hidden');
    $('#profileOn').css('background-color', '#fff')
    $('#profileOn').css('color', '#000')
  },
  'click #calenderOn': function(event) {
    Session.set('currentOn', false);
    Session.set('calenderOn', true);
    Session.set('completedOn',false);
    Session.set('profileOn',false);
    $('#calenderOn').css('background-color', '#006699')
    $('#calenderOn').css('color', '#fff')
    $('#currentOn').css('background-color', '#fff')
    $('#currentOn').css('color', '#000')
    $('#completedOn').css('background-color', '#fff')
    $('#completedOn').css('color', '#000')
    $('#profileOn').css('background-color', '#fff')
    $('#profileOn').css('color', '#000')
  },
  'click #completedOn' : function(event) {
    Session.set('currentOn', false);
    Session.set('calenderOn', false);
    Session.set('completedOn',true);
    $('#completedOn').css('background-color', '#006699')
    $('#completedOn').css('color', '#fff')
    $('#currentOn').css('background-color', '#fff')
    $('#currentOn').css('color', '#000')
    $('#calenderOn').css('background-color', '#fff')
    $('#calenderOn').css('color', '#000')
    $('#profileOn').css('background-color', '#fff')
    $('#profileOn').css('color', '#000')
  },
  'click #profileOn' : function(event) {
    Session.set('currentOn', false);
    Session.set('calenderOn', false);
    Session.set('completedOn',false);
    Session.set('profileOn',true);
    $('#profileOn').css('background-color', '#006699')
    $('#profileOn').css('color', '#fff')
    $('#completedOn').css('background-color', '#fff')
    $('#completedOn').css('color', '#000')
    $('#currentOn').css('background-color', '#fff')
    $('#currentOn').css('color', '#000')
    $('#calenderOn').css('background-color', '#fff')
    $('#calenderOn').css('color', '#000')
    $('#profile-interface').css('visibility', 'visible');
  },
  'click #signinOn' : function(event) {
    Session.set('currentOn', false);
    Session.set('calenderOn', false);
    Session.set('completedOn',false);
    Session.set('profileOn',true);
    $('#signinOn2').show()
    $('#signinOn').css('background-color', '#006699')
    $('#signinOn').css('color', '#fff')
    $('#registerOn').css('background-color', '#fff')
    $('#registerOn').css('color', '#000')
    $('#registerOn2').hide()
    $('#profile-interface').css('visibility', 'visible');
  },
  'click #registerOn' : function(event) {
    Session.set('currentOn', false);
    Session.set('calenderOn', false);
    Session.set('completedOn',false);
    Session.set('profileOn',true);
    $('#registerOn2').show()
    $('#registerOn').css('background-color', '#006699')
    $('#registerOn').css('color', '#fff')
    $('#signinOn').css('background-color', '#fff')
    $('#signinOn').css('color', '#000')
    $('#signinOn2').hide()
    $('#profile-interface').css('visibility', 'visible');
  }




});
