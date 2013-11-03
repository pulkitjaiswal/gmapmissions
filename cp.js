var activeMissions = [
{start:'-6.223200, 106.809731',
finish:'-6.224022, 106.808015', },

{start:'-6.226123, 106.810568',
finish:'-6.228618, 106.807993', },

{start:'-6.220150, 106.802607',
finish:'-6.224907, 106.805010', },

{start:'-6.228172, 106.805574',
finish:'-6.230348, 106.807634', },

{start:'-6.228789, 106.798359',
finish:'-6.230112, 106.806105', },
];


  var request=[];
  var map;
  var directionDisplay;
  var directionsService;
  var stepDisplay;
  var marker=null;
  var markerArray = [];
  var position;
  var polyline0;
  var poly20;
  var speed = 0.000005, wait = 1;
  var infowindow = null;
  var myPano;   
  var panoClient;
  var nextPanoId;
  var timerHandle = null;

function createMarker(latlng, label, html) {
// alert("createMarker("+latlng+","+label+","+html+","+color+")");
    var contentString = '<b>'+label+'</b><br>'+html;

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: label,
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        marker.myname = label;
        // gmarkers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
        });
    return marker;
}


function initialize() {
  infowindow = new google.maps.InfoWindow(
    { 
      size: new google.maps.Size(150,50)
    });
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService();
    var jakarta = new google.maps.LatLng(-6.223309, 106.807580);
    // Create a map and center it on Manhattan.
    var cpOptions = {
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      center:jakarta,
      disableDefaultUI: true,
    }
    map = new google.maps.Map(document.getElementById("cpMap"), cpOptions);

    
    // Create a renderer for directions and bind it to the map.
    var rendererOptions = {
      map: map
    }
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    
    // Instantiate an info window to hold step text.
    stepDisplay = new google.maps.InfoWindow();

    polyline0 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
    poly20 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
  }

  
  


function calcRoute(){

    if (timerHandle) { clearTimeout(timerHandle); }

      if (marker) { marker.setMap(null);}
      polyline0.setMap(null);
      poly20.setMap(null);
      directionsDisplay.setMap(null);
      polyline0 = new google.maps.Polyline({
      path: [],
      strokeColor: '#FF0000',
      strokeWeight: 3
      });
      poly20 = new google.maps.Polyline({
      path: [],
      strokeColor: '#FF0000',
      strokeWeight: 3
      });
  
    
    
    // Create a renderer for directions and bind it to the map.
    var rendererOptions = {
      map: map
    }
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

    var travelMode = google.maps.DirectionsTravelMode.WALKING;

    for(var x=0;x<5;x++)
    {
      request[x] = {
        origin: activeMissions[x].start,
        destination: activeMissions[x].finish,
        travelMode: travelMode
      };
    } 

        // Route the directions and pass the response to a
        // function to create markers for each step.

  directionsService.route(request[0], function(response, status) {
    if (status == google.maps.DirectionsStatus.OK){
    directionsDisplay.setDirections(response);

    var bounds0 = new google.maps.LatLngBounds();
    var route0 = response.routes[0];
    startLocation0 = new Object();
    endLocation0 = new Object();

    // For each route, display summary information.
    var path0 = response.routes[0].overview_path;
    var legs0 = response.routes[0].legs;
    for (i=0;i<legs0.length;i++) {
      if (i == 0) { 
          startLocation0.latlng = legs0[i].start_location;
          startLocation0.address = legs0[i].start_address;
          // marker = google.maps.Marker({map:map,position: startLocation.latlng});
          marker0 = createMarker(legs0[i].start_location,"start",legs0[i].start_address,"green");
      }
          
      endLocation0.latlng = legs0[i].end_location;
      endLocation0.address = legs0[i].end_address;
      var steps0 = legs0[i].steps;
      for (j=0;j<steps0.length;j++) {
        var nextSegment = steps0[j].path;
        for (k=0;k<nextSegment.length;k++) {
            polyline0.getPath().push(nextSegment[k]);
            bounds0.extend(nextSegment[k]);
        }
      }
  }

  polyline0.setMap(map);
        map.fitBounds(bounds0);
//        createMarker(endLocation.latlng,"end",endLocation.address,"red");
    startAnimation();
    }                                                    
 });

}
  

  
      var step = 0.5; // 5; // metres
      var tick = 10; // milliseconds
      var eol;
      var k=0;
      var stepnum=0;
      var speed = "";
      var lastVertex = 1;


//=============== animation functions ======================
      function updatePoly(d) {
        // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
        if (poly20.getPath().getLength() > 20) {
          poly20=new google.maps.Polyline([polyline0.getPath().getAt(lastVertex-1)]);
          // map.addOverlay(poly2)
        }

        if (polyline0.GetIndexAtDistance(d) < lastVertex+2) {
           if (poly20.getPath().getLength()>1) {
             poly20.getPath().removeAt(poly20.getPath().getLength()-1)
           }
           poly20.getPath().insertAt(poly20.getPath().getLength(),polyline0.GetPointAtDistance(d));
        } else {
          poly20.getPath().insertAt(poly20.getPath().getLength(),endLocation0.latlng);
        }
      }


      function animate(d) {
// alert("animate("+d+")");
        if (d>eol) {
          marker.setPosition(endLocation.latlng);
          return;
        }
        var p = polyline0.GetPointAtDistance(d);
        //map.panTo(p);
        marker.setPosition(p);
        updatePoly(d);
        timerHandle = setTimeout("animate("+(d+step)+")", tick);
      }


function startAnimation() {
        eol=polyline0.Distance();
        // map.addOverlay(new google.maps.Marker(polyline.getAt(0),G_START_ICON));
        // map.addOverlay(new GMarker(polyline.getVertex(polyline.getVertexCount()-1),G_END_ICON));
        // marker = new google.maps.Marker({location:polyline.getPath().getAt(0)} /* ,{icon:car} */);
        // map.addOverlay(marker);
        poly20 = new google.maps.Polyline({path: [polyline0.getPath().getAt0], strokeColor:"#0000FF", strokeWeight:10});
        // map.addOverlay(poly2);
        setTimeout("animate(50)",2000);  // Allow time for the initial map display
}

initialize();
//=============== ~animation funcitons =====================

