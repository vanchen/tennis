Template.chat.helpers({
  'comments': function() {
    Comments.find({
      'postId': Session.get('match-id')
    }).forEach(function(comment) {
      if (comment.author === Meteor.user().username) {
        Comments.update({
          _id: comment._id
        }, {
          $set: {
            'toggle': true
          }
        });
      } else {
        Comments.update({
          _id: comment._id
        }, {
          $set: {
            'toggle': false
          }
        });
      }
    });
    return Comments.find({
      'postId': Session.get('match-id')
    })
  },
  'match': function() {
    var id = Session.get('match-id');
    var match = Matches.findOne({
      'match_id': id
    });
    return match;
  },
  'post': function() {
    var post = Posts.findOne(Session.get('match-id'));
    return post;
  },
  'host': function() {
    var id = Session.get('match-id');
    var match = Matches.findOne({
      'match_id': id
    });
    return Meteor.users.findOne({
      'username': match.host
    });
  },
  'time': function() {
    var id = Session.get('match-id');
    var time = Posts.findOne(id).time.split(" ")
    time = time[1] + ' ' + time[2]
    return time
  },
  'challenger': function() {
    var id = Session.get('match-id');
    var match = Matches.findOne({
      'match_id': id
    });
    return Meteor.users.findOne({
      'username': match.challenger
    });
  }
});

Template.chat.events({
  'click .chat-off': function(event) {
    Session.set('chatOn', false)
  }
});
