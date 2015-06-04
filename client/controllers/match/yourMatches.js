Template.yourMatches.helpers({
  'match': function() {
    return Session.get('thisMatch')
  },
  'thisMatch': function() {
    if (Session.get('thisMatch').host === Meteor.user().username) {
      return true
    } else {
      return false
    }
  }
});
