/////////////
// Globals //
/////////////

maps = [];
markers = [];
new_markers = [];
styles = [{
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [{
    "lightness": 100
  }, {
    "visibility": "simplified"
  }]
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#C6E2FF"
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#C5E3BF"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#D1D1B8"
  }]
}];

Meteor.startup(function() {
  $('#signinOn').show()
  $('#registerOn').show()
})


////////////
// Events //
////////////

Template.map.events({
'click .host': function(event) {
  Session.set('toggle', true);
  for (var i = 0; i < new_markers.length; i++) {
    new_markers[i].setMap(null)

  }
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(maps[0].instance)

  }
},
'click .join': function(event) {
  Session.set('toggle', false);
  for (var i = 0; i < markers.length; i++) {
    Posts.find().forEach(function(post) {

      if (post.court === markers[i].title) {
        if (post.author !== Meteor.user().username && post.play === false) {
          new_markers.push(markers[i])
        } else {
          markers[i].setMap(null)
        }
      } else {
        markers[i].setMap(null)
      }
    });
  }
  for (var i = 0; i < new_markers.length; i++) {
    new_markers[i].setMap(maps[0].instance)
  }
},

//Map Sidebar Events//
  'click .home': function(event) {
    if (Session.get('userOff') === false) {
    $('#sidebar-extension').css('width', '0px');
    Session.set('matchesOn', false)
    Session.set('matchOn', false)
    Session.set('courtTrue', false)
    $('.intercom-launcher-button').hide()
    $('.hide-menu').css('visibility', 'visible');
    $('#sidebar-extensions-map').animate({
      opacity: 0
    }, 'fast', function() {
      $('#sidebar-extensions-map').css('visibility', 'hidden');
    })
    maps[0].instance.setCenter(new google.maps.LatLng(Geolocation.latLng().lat, Geolocation.latLng().lng))
    maps[0].instance.setZoom(12);
    gps_marker.setAnimation(google.maps.Animation.DROP);
  }

  },

  'click .map-list': function(event) {
  if ($('#sidebar-extension').css('width') === '0px' || Session.get('courtTrue') ) {
    // Session Variables
    Session.set('profileOn', true);
    Session.set('matchesOn', true);
    Session.set('courtTrue', false)
    Session.set('currentOn', false);
    Session.set('calenderOn', false);
    Session.set('completedOn', false);
    Session.set('matchOn',false)

    // Jquery
    $('#sidebar-extension').css('width', '60%')
    $('#match-listings').css('visibility', 'visible')
    $('#signinOn').hide()
    $('#registerOn').hide()
    $('#profileOn').css('background-color', '#006699')
    $('#profileOn').css('color', '#fff')
    $('#completedOn').css('background-color', '#fff')
    $('#completedOn').css('color', '#000')
    $('#currentOn').css('background-color', '#fff')
    $('#currentOn').css('color', '#000')
    $('#calenderOn').css('background-color', '#fff')
    $('#calenderOn').css('color', '#000')
    $('#profile-interface').css('visibility', 'visible');

  } else {
    //Session Variables
    Session.set('matchesOn', false)
    Session.set('courtTrue', false)
    Session.set('matchOn', false)
    Session.set('chatOn', false)

    //Jquery
    $('#sidebar-extension').css('width', '0px')
    $('.intercom-launcher-button').hide()
    $('.hide-menu').css('visibility', 'visible');
    $('#sidebar-extensions-map').animate({
      opacity: 0
    }, 'fast', function() {
      $('#sidebar-extensions-map').css('visibility', 'hidden');
    })

  }
},
'click .logout': function(event) {
  event.preventDefault();
  Meteor.logout();
  // Session Variables
  Session.set('profileOn', true);
  Session.set('userOff', true);
  Session.set('matchesOn', false)
  Session.set('matchOn', false)
  Session.set('chatOn', false)
  Session.set('courtTrue', false)

  // Jquery
  $('#sidebar-extension').css('width', '60%');
  $('#profile-interface').css('visibility', 'visible');
  $('#match-listings').css('visibility', 'visibile')
  $('#profileOn').hide();
  $('#signinOn').show();
  $('#registerOn').show();
  $('#completedOn').hide();
  $('#currentOn').hide();
  $('#calenderOn').hide();

},

// Match Listings Events //

'mouseenter .matches': function(event) {
  var id = $(event.target).attr("id");
  Session.set('match-id', id);

},
'click .match-enlarge': function(event) {
var pos = new google.maps.LatLng(Geolocation.latLng().lat, Geolocation.latLng().lng);
var id = Session.get('match-id');
Session.set('matchOn', true)

if ($('#sidebar-extensions-map').css('visibility') === 'hidden') {
  $('.hide-menu').css('visibility', 'hidden');
  $('#sidebar-extensions-map').animate({
    opacity: 1
  }, 'fast', function() {
    $('#sidebar-extensions-map').css('visibility', 'visible');
  })
  $('#sidebar-extension-matches').css('width', '100%');
  $('#sidebar-extension-matches').css('visibility', 'visible');
  var court = Courts.findOne({
    Name: Posts.findOne(id).court
  });
  var LatLng = new google.maps.LatLng(court.Lat, court.Lng);
  markers2[0].setPosition(LatLng);
  markers2[0].setTitle(court.Name);
  markers2[0].setMap(maps2[0].instance)
  maps2[0].instance.setCenter(LatLng);
  var request = {
    origin: pos,
    destination: LatLng,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      directionsDisplay.setPanel(document.getElementById('googledirections'));
    }
  });

  $('.intercom-launcher-button').show()
  var latest = Comments.find({
      'postId': Session.get('match-id')
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch()

  Meteor.setInterval(function() {
    if (latest[0].createdAt >= Meteor.user().profile.chatTime) {
      $('.chat-on').effect('bounce', 'slow');
    }
  }, 1000);

} else {
  $('#sidebar-extension-matches').css('width', '0px');
  $('#sidebar-extension-matches').css('visibility', 'hidden');
  $('#sidebar-extensions-map').animate({
    opacity: 0
  }, 'fast', function() {
    $('#sidebar-extensions-map').css('visibility', 'hidden');
  })
  $('.hide-menu').css('visibility', 'visible');
  Session.set('matchOn', false)

}
},
'click .play-match': function(event) {
bootbox.confirm("Do you want to accept this match?", function(result) {
  if (result) {
    var matchProperties = {
      host: Posts.findOne({
        _id: Session.get('match-id')
      }).author,
      challenger: Meteor.user().username,
      match_id: Session.get('match-id'),
      hostScore: {
        'set1': 0,
        'set2': 0,
        'set3': 0,
        'set4': 0,
        'set5': 0
      },
      challengerScore: {
        'set1': 0,
        'set2': 0,
        'set3': 0,
        'set4': 0,
        'set5': 0
      },
      completed: false
    }
    Matches.insert(matchProperties)
    Posts.update({
      _id: Session.get('match-id')
    }, {
      $set: {
        'play': true
      }
    });
  }
  //Session Variables
  Session.set('matchesOn', true);
  Session.set('currentOn', true);
  Session.set('courtTrue', false)
  Session.set('profileOn', false);
  Session.set('calenderOn', false);
  Session.set('completedOn', false);

  //Jquery
  $('#signinOn').hide()
  $('#registerOn').hide()
  $('#sidebar-extension').css('width', '60%')
  $('#match-listings').css('visibility', 'visible')
  $('#profileOn').css('background-color', '#fff')
  $('#profileOn').css('color', '#000')
  $('#completedOn').css('background-color', '#fff')
  $('#completedOn').css('color', '#000')
  $('#currentOn').css('background-color', '#006699')
  $('#currentOn').css('color', '#fff')
  $('#calenderOn').css('background-color', '#fff')
  $('#calenderOn').css('color', '#000')
  $('#profile-interface').css('visibility', 'visible');
});
},
  'click .message-send': function(event) {
    event.preventDefault();
    var commentProperties = {
      text: $('#btn-input').val(),
      postId: Session.get('match-id'),
      author: Meteor.user().username,
      image: Meteor.user().profile.image,
      createdAt: new Date().getTime(),
      toggle: false
    }
    Comments.insert(commentProperties);
    $('.msg_container_base').scrollTop = $('.msg_container_base').scrollHeight;
  },

  // Profile Events //

  'click .profile-submit': function(event) {
    event.preventDefault();
    Meteor.users.update({
      _id: Meteor.user()._id
    }, {
      $set: {
        'profile.firstName': $('#firstName').val()
      }
    })
    Meteor.users.update({
      _id: Meteor.user()._id
    }, {
      $set: {
        'username': $('#username').val()
      }
    })
    Meteor.users.update({
      _id: Meteor.user()._id
    }, {
      $set: {
        'profile.lastName': $('#lastName').val()
      }
    })
    Meteor.users.update({
      _id: Meteor.user()._id
    }, {
      $set: {
        'profile.gender': $('#user_gender').val()
      }
    })
    Meteor.users.update({
      _id: Meteor.user()._id
    }, {
      $set: {
        'profile.skill': $('#user_skill').val()
      }
    })
    $('#profile-interface').css('visibility', 'hidden');
    $('#sidebar-extension').css('width', '0px')

  },

  'click .profile-cancel': function() {
    $('#sidebar-extension').css('width', '0px')
    $('#profile-interface').css('visibility', 'hidden');
  },
  'click .chat-on': function(event) {
    Session.set('chatOn', true)
    var time = new Date().getTime();
    Meteor.users.update({
      _id: Meteor.user()._id
    }, {
      $set: {
        'profile.chatTime': time
      }
    })
  }

});



///////////
//Helpers//
///////////


Template.map.helpers({
  exampleMapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(Geolocation.latLng().lat, Geolocation.latLng().lng),
        zoom: 13,
        styles: styles,
        disableDefaultUI: true
      };
    }
  },
  'user': function() {
  return Meteor.user();
},
courts: function() {
  return Courts.find();
},
'sideBar': function() {
  return Session.get('sidebar')
},
'match': function() {
  return Posts.findOne(Session.get('match-id'));
},
'matchOn': function() {
  return Session.get('matchOn');
},
'chatOn': function() {
  return Session.get('chatOn')
}
});


///////////////////
// Map Functions //
///////////////////


Template.registerHelper('exampleMapOptions2', function() {
  var match_id = Session.get('match-id');
  court = Courts.findOne({
    Name: Posts.findOne(match_id).court
  });
  if (GoogleMaps.loaded()) {
    return {
      center: new google.maps.LatLng(court.Lat, court.Lng),
      zoom: 15,
      styles: styles,
      disableDefaultUI: true
    };
  }
});



Template.map_details.onCreated(function() {
  GoogleMaps.ready('exampleMap2', function(map2) {
    markers2 = [];
    //directionDisplay;
    maps2 = [map2];
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    var match_id = Session.get('match-id');
    var court = Courts.findOne({
      Name: Posts.findOne(match_id).court
    });
    var center = new google.maps.LatLng(court.Lat, court.Lng)
    var LatLng = new google.maps.LatLng(court.Lat, court.Lng);
    var image = '/img/tennis.png';
    var marker = new google.maps.Marker({
      position: LatLng,
      map: map2.instance,
      icon: image,
      title: court.Name,
    });
    markers2.push(marker);

    directionsDisplay.setMap(map2.instance);

  })
});



Template.map.onCreated(function() {
  Session.set('toggle', true) // Replace with a jquery function that shows and hides the host/join
  GoogleMaps.ready('exampleMap', function(map) {
    markers = [];
    var pos = Geolocation.latLng();
    var google_pos = new google.maps.LatLng(pos.lat, pos.lng);

    gps_marker = new google.maps.Marker({
      position: google_pos,
      map: map.instance,
      animation: google.maps.Animation.DROP,
      icon: '/img/blue_dot.png',
    });
    maps[0] = map;
    //bootbox.alert("Choose a court to host your match.");
    Courts.find().forEach(function(court) {

      console.log(court.Name)
      var LatLng = new google.maps.LatLng(court.Lat, court.Lng);
      var image = '/img/tennis.png';
      var form_string = '<h4 id="star">' + court.Name + '&nbsp </h4>' +
        '<p> There are <strong>' + court.Courts + ' courts.</strong> Fill out the form to host a match.</p>' +
        '<form role="form">' +
        '<div class="input-group">' +
        '<span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>' +
        '<input type="text" class="form-control" id="title" placeholder="Enter a title">' +
        '</div><br/>' +
        '<div class="input-group datetimepicker">' +
        '<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>' +
        '<input class="set-due-date form-control" type="text" id="datetime" placeholder="Enter a date and time"/>' +
        '</div><br/>' +
        '<div class="input-group">' +
        '<span class="input-group-addon"><i class="glyphicon glyphicon-globe"></i></span>' +
        '<input class="form-control" value="" id="court" type="text" placeholder="" disabled/></div><br/>' +
        '<div class="input-group">' +
        '<span class="input-group-addon"><i class="glyphicon glyphicon-tag"></i></span>' +
        '<select class="form-control" id="type">' +
        '<option>Exhibition</option>' +
        '<option>Super Tiebreaker</option>' +
        '<option>One Set</option>' +
        '<option>Three Set</option>' +
        '<option>Five Set</option>' +
        '</select>' +
        '</div><br/>' +
        '<div class="input-group">' +
        '<span class="input-group-addon"><i class="glyphicon glyphicon-info-sign"></i></span>' +
        '<textarea id="details" class="form-control" rows="5" id="comment" placeholder="Enter additional details"></textarea>' +
        '</div><br/>' +
        '<div class="form-group">' +
        '<button type="submit" class="btn btn-primary btn-block"> Submit </button>' +
        '</div>' +
        '</form>';

      var info = new google.maps.InfoWindow(),
        marker, form_string;
      var marker = new google.maps.Marker({
        position: LatLng,
        map: map.instance,
        icon: image,
        title: court.Name,
        infowindow: info
      });
      markers.push(marker);

      //Add info window to markers

     google.maps.event.addListener(marker, 'click', function() {
        if (Session.get('toggle')) {
          info.setContent(form_string);
          info.open(map.instance, marker);
        } else {
          Meteor.setTimeout(function() {
            if ($('#sidebar-extension').css('width') === '0px') {
              map.instance.setCenter(LatLng)
              map.instance.panBy(-40, 0)
              map.instance.setZoom(15);
              Session.set('courtName', marker.title)
              Session.set('courtTrue', true);
              $('#sidebar-extension').css('width', '35%');
              $('#match-listings').css('visibility', 'visible')
              $('#signinOn').hide()
              $('#registerOn').hide()
            }
          }, 2);
        }
      });

      // Add jquery to info windom DOM

      google.maps.event.addListener(info, 'domready', function() {
        $('.datetimepicker').datetimepicker();
        $('#court').attr('placeholder', court.Name)
        $('#court').attr('value', court.Name)
        for (var i = 1; i <= court.Rating; i++) {
          $('#star').append("<span class='glyphicon glyphicon-star'></span>");
        }
        $(document).one("submit", function(event) {
          event.preventDefault();
          var postProperties = {
            title: $(event.target).find('[id=title]').val(),
            type: $(event.target).find('[id=type]').val(),
            court: $(event.target).find('[id=court]').val(),
            time: $(event.target).find('[id=datetime]').val(),
            details: $(event.target).find('[id=details]').val(),
            author: Meteor.user().username,
            userProf: Meteor.user(),
            play: false
          }
          Posts.insert(postProperties);
          info.close();
        });
      });

      google.maps.event.addListener(info, "closeclick", function() {

      });
    });
  });
});
