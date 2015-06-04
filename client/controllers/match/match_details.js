Template.match_details.helpers({
  'match': function() {
    var id = Session.get('match-id');
    var match = Matches.findOne({
      'match_id': id
    });

    // The Spacebars template handler seems to not like
    // to index into an array... throws an error when running!
    return match;
  },
  'post': function() {
    var post = Posts.findOne(Session.get('match-id'));
    return post;
  },
  'detailsOn': function() {
    return Session.get('detailsOn')
  },
  'directionsOn': function() {
    return Session.get('directionsOn')
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



Template.match_details.events({
  'click #detailsOn': function(event) {
    $('#googledirections').hide();
    $('#testWrapper').show()
    $('#messageBox').hide()
    $('#detailsOn').css('background-color', '#006699')
    $('#detailsOn').css('color', '#fff')
    $('#directionsOn').css('background-color', '#fff')
    $('#directionsOn').css('color', '#000')
    $('#messagesOn').css('background-color', '#fff')
    $('#messagesOn').css('color', '#000')
  },
  'click #directionsOn': function(event) {
    $('#testWrapper').hide()
    $('#googledirections').show();
    $('#messageBox').hide();
    $('#directionsOn').css('background-color', '#006699')
    $('#directionsOn').css('color', '#fff')
    $('#detailsOn').css('background-color', '#fff')
    $('#detailsOn').css('color', '#000')
    $('#messagesOn').css('background-color', '#fff')
    $('#messagesOn').css('color', '#000')
  },
  'click #messagesOn': function(event) {
    $('#testWrapper').hide()
    $('#googledirections').hide();
    $('#messageBox').show();
    $('#messagesOn').css('background-color', '#006699')
    $('#messagesOn').css('color', '#fff')
    $('#detailsOn').css('background-color', '#fff')
    $('#detailsOn').css('color', '#000')
    $('#directionsOn').css('background-color', '#fff')
    $('#directionsOn').css('color', '#000')

  },


  'click #completematch': function(event) {
    bootbox.dialog({
      title: "Please report your match score.",
      message: '<div class="row">  ' +
        '<div class="col-md-12"> ' +
        '<form class="form-horizontal"> ' +
        '<div class="form-group"> ' +
        '<div class="form-group"> ' +
        '<label class="col-md-4 control-label" for="awesomeness">Who won the match?</label> ' +
        '<div class="col-md-4"> <div class="radio"> <label for="awesomeness-0"> ' +
        '<input type="radio" name="awesomeness" id="awesomeness-0" value="Really awesome" checked="checked"> ' +
        'Host</label> ' +
        '</div><div class="radio"> <label for="awesomeness-1"> ' +
        '<input type="radio" name="awesomeness" id="awesomeness-1" value="Super awesome"> Challenger </label> ' +
        '</div> ' +
        '</div> </div>' +
        '<label class="col-md-4 control-label" for="name">First Set:</label>' +
        '<div class="col-md-6"> ' +
        '<select class="form-control" id="set1">' +
        '<option>0-0</option>' +
        '<option>6-0</option>' +
        '<option>6-1</option>' +
        '<option>6-2</option>' +
        '<option>6-3</option>' +
        '<option>6-4</option>' +
        '<option>7-5</option>' +
        '<option>7-6</option>' +
        '<option>0-6</option>' +
        '<option>1-6</option>' +
        '<option>2-6</option>' +
        '<option>3-6</option>' +
        '<option>4-6</option>' +
        '<option>5-7</option>' +
        '<option>6-7</option>' +
        '</select>' +
        '</div> ' +
        '<label class="col-md-4 control-label" for="name">Second Set:</label>' +
        '<div class="col-md-6"> ' +
        '<select class="form-control" id="set2">' +
        '<option>0-0</option>' +
        '<option>6-0</option>' +
        '<option>6-1</option>' +
        '<option>6-2</option>' +
        '<option>6-3</option>' +
        '<option>6-4</option>' +
        '<option>7-5</option>' +
        '<option>7-6</option>' +
        '<option>0-6</option>' +
        '<option>1-6</option>' +
        '<option>2-6</option>' +
        '<option>3-6</option>' +
        '<option>4-6</option>' +
        '<option>5-7</option>' +
        '<option>6-7</option>' +
        '</select>' +
        '</div> ' +
        '<label class="col-md-4 control-label" for="name">Third Set:</label>' +
        '<div class="col-md-6"> ' +
        '<select class="form-control" id="set3">' +
        '<option>0-0</option>' +
        '<option>6-0</option>' +
        '<option>6-1</option>' +
        '<option>6-2</option>' +
        '<option>6-3</option>' +
        '<option>6-4</option>' +
        '<option>7-5</option>' +
        '<option>7-6</option>' +
        '<option>0-6</option>' +
        '<option>1-6</option>' +
        '<option>2-6</option>' +
        '<option>3-6</option>' +
        '<option>4-6</option>' +
        '<option>5-7</option>' +
        '<option>6-7</option>' +
        '</select>' +
        '</div> ' +
        '<label class="col-md-4 control-label" for="name">Fourth Set:</label>' +
        '<div class="col-md-6"> ' +
        '<select class="form-control" id="set4">' +
        '<option>0-0</option>' +
        '<option>6-0</option>' +
        '<option>6-1</option>' +
        '<option>6-2</option>' +
        '<option>6-3</option>' +
        '<option>6-4</option>' +
        '<option>7-5</option>' +
        '<option>7-6</option>' +
        '<option>0-6</option>' +
        '<option>1-6</option>' +
        '<option>2-6</option>' +
        '<option>3-6</option>' +
        '<option>4-6</option>' +
        '<option>5-7</option>' +
        '<option>6-7</option>' +
        '</select>' +
        '</div> ' +
        '<label class="col-md-4 control-label" for="name">Fifth Set:</label>' +
        '<div class="col-md-6"> ' +
        '<select class="form-control" id="set5">' +
        '<option>0-0</option>' +
        '<option>6-0</option>' +
        '<option>6-1</option>' +
        '<option>6-2</option>' +
        '<option>6-3</option>' +
        '<option>6-4</option>' +
        '<option>7-5</option>' +
        '<option>7-6</option>' +
        '<option>0-6</option>' +
        '<option>1-6</option>' +
        '<option>2-6</option>' +
        '<option>3-6</option>' +
        '<option>4-6</option>' +
        '<option>5-7</option>' +
        '<option>6-7</option>' +
        '</select>' +
        '</div> ' +
        '</form> </div>  </div>',
      buttons: {
        success: {
          label: "Save",
          className: "btn-success",
          callback: function() {
            $('#completematch').hide()
            var post = Posts.findOne(Session.get('match-id'));
            var match = Matches.findOne({
              'match_id': post._id
            })
            Matches.update({
              _id: match._id
            }, {
              $set: {
                'completed': true
              }
            });
            $('#awesomeness-0').html("Hmmm")

            if ($('#awesomeness-0').is(':checked')) {
                Matches.update({
                  _id: match._id
                }, {
                  $set: {
                    'hostScore.set1': $('#set1').val().split(" ")[0][0],
                    'challengerScore.set1': $('#set1').val().split(" ")[0][2],
                    'hostScore.set2': $('#set2').val().split(" ")[0][0],
                    'challengerScore.set2': $('#set2').val().split(" ")[0][2],
                    'hostScore.set3': $('#set3').val().split(" ")[0][0],
                    'challengerScore.set3': $('#set3').val().split(" ")[0][2],
                    'hostScore.set4': $('#set4').val().split(" ")[0][0],
                    'challengerScore.set4': $('#set4').val().split(" ")[0][2],
                    'hostScore.set5': $('#set5').val().split(" ")[0][0],
                    'challengerScore.set5': $('#set5').val().split(" ")[0][2]
                  }
                });
              }
            else {
                Matches.update({
                  _id: match._id
                }, {
                  $set: {
                    'hostScore.set1': $('#set1').val().split(" ")[0][2],
                    'challengerScore.set1': $('#set1').val().split(" ")[0][0],
                    'hostScore.set2': $('#set2').val().split(" ")[0][2],
                    'challengerScore.set2': $('#set2').val().split(" ")[0][0],
                    'hostScore.set3': $('#set3').val().split(" ")[0][2],
                    'challengerScore.set3': $('#set3').val().split(" ")[0][0],
                    'hostScore.set4': $('#set4').val().split(" ")[0][2],
                    'challengerScore.set4': $('#set4').val().split(" ")[0][0],
                    'hostScore.set5': $('#set5').val().split(" ")[0][2],
                    'challengerScore.set5': $('#set5').val().split(" ")[0][0]
                  }
                });
              }
            }
          }
        }
      });
    }
  });
