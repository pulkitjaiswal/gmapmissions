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

  var map;
  var directionsDisplay1;
  var directionsService1;
  var directionsDisplay2;
  var directionsService2;
  var directionsDisplay3;
  var directionsService3;
  var directionsDisplay4;
  var directionsService4;
  var directionsDisplay5;
  var directionsService5;

  var stepDisplay;
  var markerArray = [];
  var position;

  var marker = null;
  var marker2 = null;
  var marker3 = null;
  var marker4 = null;
  var marker5 = null;

  var polyline = null;
  var poly1 = null;
  var polyline2 = null;
  var poly2 = null;
  var polyline3 = null;
  var poly3 = null;
  var polyline4 = null;
  var poly4 = null;
  var polyline5 = null;
  var poly5 = null;

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
    directionsService1 = new google.maps.DirectionsService();
    directionsService2 = new google.maps.DirectionsService();
    directionsService3 = new google.maps.DirectionsService();
    directionsService4 = new google.maps.DirectionsService();
    directionsService5 = new google.maps.DirectionsService();

    var jakarta = new google.maps.LatLng(-6.223309, 106.807580);
    // Create a map and center it on Manhattan.
    var cpOptions = {
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      center:jakarta,
      disableDefaultUI: true,
    }
    map = new google.maps.Map(document.getElementById("cpMap"), cpOptions);

    // Create a renderer for directions and bind it to the map.
    var rendererOptions = {
      map: map
    }
    directionsDisplay1 = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay2 = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay3 = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay4 = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay5 = new google.maps.DirectionsRenderer(rendererOptions);


    // Instantiate an info window to hold step text.
    stepDisplay = new google.maps.InfoWindow();

    polyline = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
    poly1 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });

    polyline2 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
    poly2 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });

    polyline3 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
    poly3 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });

    polyline4 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
    poly4 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });

    polyline5 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
    poly5 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
  }

  
  
    var steps = []
    var request = []
    function calcRoute(){

if (timerHandle) { clearTimeout(timerHandle); }
if (marker) { marker.setMap(null);}
if (marker2) { marker2.setMap(null);}
if (marker3) { marker3.setMap(null);}
if (marker4) { marker4.setMap(null);}
if (marker5) { marker5.setMap(null);}

polyline.setMap(null);
poly1.setMap(null);
polyline2.setMap(null);
poly2.setMap(null);
polyline3.setMap(null);
poly3.setMap(null);
polyline4.setMap(null);
poly4.setMap(null);
polyline5.setMap(null);
poly5.setMap(null);

directionsDisplay1.setMap(null);
directionsDisplay2.setMap(null);
directionsDisplay3.setMap(null);
directionsDisplay4.setMap(null);
directionsDisplay5.setMap(null);


    polyline = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
    poly1= new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });

    polyline2 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
    poly2= new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });

    polyline3 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
    poly3= new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });

    polyline4 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });
    poly4= new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });

    polyline5 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });

    poly5= new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
    });

    // Create a renderer for directions and bind it to the map.
    var rendererOptions = {
      map: map
    }
directionsDisplay1 = new google.maps.DirectionsRenderer(rendererOptions);
directionsDisplay2 = new google.maps.DirectionsRenderer(rendererOptions);
directionsDisplay3 = new google.maps.DirectionsRenderer(rendererOptions);
directionsDisplay4 = new google.maps.DirectionsRenderer(rendererOptions);
directionsDisplay5 = new google.maps.DirectionsRenderer(rendererOptions);

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
  directionsService1.route(request[0], function(response, status) {
    if (status == google.maps.DirectionsStatus.OK){
    directionsDisplay1.setDirections(response);

        var bounds = new google.maps.LatLngBounds();
        var route = response.routes[0];
        startLocation = new Object();
        endLocation = new Object();

        // For each route, display summary information.
    var path = response.routes[0].overview_path;
    var legs = response.routes[0].legs;
        for (i=0;i<legs.length;i++) {
          if (i == 0) { 
            startLocation.latlng = legs[i].start_location;
            startLocation.address = legs[i].start_address;
            // marker = google.maps.Marker({map:map,position: startLocation.latlng});
            marker = createMarker(legs[i].start_location,"marker1",legs[i].start_address,"green");
          }
          endLocation.latlng = legs[i].end_location;
          endLocation.address = legs[i].end_address;
          var steps = legs[i].steps;
          for (j=0;j<steps.length;j++) {
            var nextSegment = steps[j].path;
            for (k=0;k<nextSegment.length;k++) {
              polyline.getPath().push(nextSegment[k]);
              bounds.extend(nextSegment[k]);



            }
          }
        }

        polyline.setMap(map);
        map.fitBounds(bounds);
//        createMarker(endLocation.latlng,"end",endLocation.address,"red");
    //map.setZoom(18);
    startAnimation();
    }                                                    
 });

directionsService2.route(request[1], function(response, status) {
    if (status == google.maps.DirectionsStatus.OK){
    directionsDisplay2.setDirections(response);

        var bounds2 = new google.maps.LatLngBounds();
        var route2 = response.routes[0];
        startLocation2 = new Object();
        endLocation2 = new Object();

        // For each route, display summary information.
    var path2 = response.routes[0].overview_path;
    var legs2 = response.routes[0].legs;
        for (i=0;i<legs2.length;i++) {
          if (i == 0) { 
            startLocation2.latlng = legs2[i].start_location;
            startLocation2.address = legs2[i].start_address;
            // marker = google.maps.Marker({map:map,position: startLocation.latlng});
            marker2 = createMarker(legs2[i].start_location,"marker2",legs2[i].start_address,"green");
          }
          endLocation2.latlng = legs2[i].end_location;
          endLocation2.address = legs2[i].end_address;
          var steps2 = legs2[i].steps;
          for (j=0;j<steps2.length;j++) {
            var nextSegment = steps2[j].path;
            for (k=0;k<nextSegment.length;k++) {
              polyline2.getPath().push(nextSegment[k]);
              bounds2.extend(nextSegment[k]);



            }
          }
        }

        polyline2.setMap(map);
        map.fitBounds(bounds2);
//        createMarker(endLocation.latlng,"end",endLocation.address,"red");
    //map.setZoom(18);
    startAnimation2();
    }                                                    
 });

directionsService3.route(request[2], function(response, status) {
    if (status == google.maps.DirectionsStatus.OK){
    directionsDisplay3.setDirections(response);

        var bounds3 = new google.maps.LatLngBounds();
        var route3 = response.routes[0];
        startLocation3 = new Object();
        endLocation3 = new Object();

        // For each route, display summary information.
    var path3 = response.routes[0].overview_path;
    var legs3 = response.routes[0].legs;
        for (i=0;i<legs3.length;i++) {
          if (i == 0) { 
            startLocation3.latlng = legs3[i].start_location;
            startLocation3.address = legs3[i].start_address;
            // marker = google.maps.Marker({map:map,position: startLocation.latlng});
            marker3 = createMarker(legs3[i].start_location,"marker3",legs3[i].start_address,"green");
          }
          endLocation3.latlng = legs3[i].end_location;
          endLocation3.address = legs3[i].end_address;
          var steps3 = legs3[i].steps;
          for (j=0;j<steps3.length;j++) {
            var nextSegment = steps3[j].path;
            for (k=0;k<nextSegment.length;k++) {
              polyline3.getPath().push(nextSegment[k]);
              bounds3.extend(nextSegment[k]);



            }
          }
        }

        polyline3.setMap(map);
        map.fitBounds(bounds3);
//        createMarker(endLocation.latlng,"end",endLocation.address,"red");
    //map.setZoom(18);
    startAnimation3();
    }                                                    
 });


directionsService4.route(request[3], function(response, status) {
    if (status == google.maps.DirectionsStatus.OK){
    directionsDisplay4.setDirections(response);

        var bounds4 = new google.maps.LatLngBounds();
        var route4 = response.routes[0];
        startLocation4 = new Object();
        endLocation4 = new Object();

        // For each route, display summary information.
    var path4 = response.routes[0].overview_path;
    var legs4 = response.routes[0].legs;
        for (i=0;i<legs4.length;i++) {
          if (i == 0) { 
            startLocation4.latlng = legs4[i].start_location;
            startLocation4.address = legs4[i].start_address;
            // marker = google.maps.Marker({map:map,position: startLocation.latlng});
            marker4 = createMarker(legs4[i].start_location,"marker4",legs4[i].start_address,"green");
          }
          endLocation4.latlng = legs4[i].end_location;
          endLocation4.address = legs4[i].end_address;
          var steps4 = legs4[i].steps;
          for (j=0;j<steps4.length;j++) {
            var nextSegment = steps4[j].path;
            for (k=0;k<nextSegment.length;k++) {
              polyline4.getPath().push(nextSegment[k]);
              bounds4.extend(nextSegment[k]);



            }
          }
        }

        polyline4.setMap(map);
        map.fitBounds(bounds4);
//        createMarker(endLocation.latlng,"end",endLocation.address,"red");
    //map.setZoom(18);
    startAnimation4();
    }                                                    
 });


directionsService5.route(request[4], function(response, status) {
    if (status == google.maps.DirectionsStatus.OK){
    directionsDisplay5.setDirections(response);

        var bounds5 = new google.maps.LatLngBounds();
        var route5 = response.routes[0];
        startLocation5 = new Object();
        endLocation5 = new Object();

        // For each route, display summary information.
    var path5 = response.routes[0].overview_path;
    var legs5 = response.routes[0].legs;
        for (i=0;i<legs5.length;i++) {
          if (i == 0) { 
            startLocation5.latlng = legs5[i].start_location;
            startLocation5.address = legs5[i].start_address;
            // marker = google.maps.Marker({map:map,position: startLocation.latlng});
            marker5 = createMarker(legs5[i].start_location,"marker5",legs5[i].start_address,"green");
          }
          endLocation5.latlng = legs5[i].end_location;
          endLocation5.address = legs5[i].end_address;
          var steps5 = legs5[i].steps;
          for (j=0;j<steps5.length;j++) {
            var nextSegment = steps5[j].path;
            for (k=0;k<nextSegment.length;k++) {
              polyline5.getPath().push(nextSegment[k]);
              bounds5.extend(nextSegment[k]);



            }
          }
        }

        polyline5.setMap(map);
        map.fitBounds(bounds5);
//        createMarker(endLocation.latlng,"end",endLocation.address,"red");
    //map.setZoom(18);
    startAnimation5();
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
        if (poly1.getPath().getLength() > 20) {
          poly1=new google.maps.Polyline([polyline.getPath().getAt(lastVertex-1)]);
          // map.addOverlay(poly2)
        }

        if (polyline.GetIndexAtDistance(d) < lastVertex+2) {
           if (poly1.getPath().getLength()>1) {
             poly1.getPath().removeAt(poly1.getPath().getLength()-1)
           }
           poly1.getPath().insertAt(poly1.getPath().getLength(),polyline.GetPointAtDistance(d));
        } else {
          poly1.getPath().insertAt(poly1.getPath().getLength(),endLocation.latlng);
        }
      }


      function animate(d) {
//alert("animate("+d+")");
        if (d>eol) {
          //map.panTo(endLocation.latlng);
          marker.setPosition(endLocation.latlng);
          return;
        }
        var p = polyline.GetPointAtDistance(d);
        //map.panTo(p);
        marker.setPosition(p);
        updatePoly(d);
        timerHandle = setTimeout("animate("+(d+step)+")", tick);
      }


function startAnimation() {
        eol=polyline.Distance();
        //map.setCenter(polyline.getPath().getAt(0));
        // map.addOverlay(new google.maps.Marker(polyline.getAt(0),G_START_ICON));
        // map.addOverlay(new GMarker(polyline.getVertex(polyline.getVertexCount()-1),G_END_ICON));
        // marker = new google.maps.Marker({location:polyline.getPath().getAt(0)} /* ,{icon:car} */);
        // map.addOverlay(marker);
        poly1 = new google.maps.Polyline({path: [polyline.getPath().getAt(0)], strokeColor:"#0000FF", strokeWeight:10});
        // map.addOverlay(poly2);
        setTimeout("animate(50)",2000);  // Allow time for the initial map display
}


      function updatePoly2(e) {
        // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
        if (poly2.getPath().getLength() > 20) {
          poly2=new google.maps.Polyline([polyline2.getPath().getAt(lastVertex-1)]);
          // map.addOverlay(poly2)
        }

        if (polyline2.GetIndexAtDistance(e) < lastVertex+2) {
           if (poly2.getPath().getLength()>1) {
             poly2.getPath().removeAt(poly2.getPath().getLength()-1)
           }
           poly2.getPath().insertAt(poly2.getPath().getLength(),polyline2.GetPointAtDistance(e));
        } else {
          poly2.getPath().insertAt(poly2.getPath().getLength(),endLocation2.latlng);
        }
      }


      function animate2(e) {
//alert("animate("+e+")");
        if (e>eol2) {
          //map.panTo(endLocation.latlng);
          marker2.setPosition(endLocation2.latlng);
          return;
        }
        var p2 = polyline2.GetPointAtDistance(e);
        //map.panTo(p);
        marker2.setPosition(p2);
        updatePoly2(e);
        timerHandle = setTimeout("animate2("+(e+step)+")", tick);
      }


function startAnimation2() {
        eol2=polyline2.Distance();
        //map.setCenter(polyline2.getPath().getAt(0));
        // map.addOverlay(new google.maps.Marker(polyline.getAt(0),G_START_ICON));
        // map.addOverlay(new GMarker(polyline.getVertex(polyline.getVertexCount()-1),G_END_ICON));
        // marker = new google.maps.Marker({location:polyline.getPath().getAt(0)} /* ,{icon:car} */);
        // map.addOverlay(marker);
        poly2 = new google.maps.Polyline({path: [polyline2.getPath().getAt(0)], strokeColor:"#0000FF", strokeWeight:10});
        // map.addOverlay(poly2);
        setTimeout("animate2(50)",2000);  // Allow time for the initial map display
}


      function updatePoly3(e) {
        // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
        if (poly3.getPath().getLength() > 20) {
          poly3=new google.maps.Polyline([polyline3.getPath().getAt(lastVertex-1)]);
          // map.addOverlay(poly2)
        }

        if (polyline3.GetIndexAtDistance(e) < lastVertex+2) {
           if (poly3.getPath().getLength()>1) {
             poly3.getPath().removeAt(poly3.getPath().getLength()-1)
           }
           poly3.getPath().insertAt(poly3.getPath().getLength(),polyline3.GetPointAtDistance(e));
        } else {
          poly3.getPath().insertAt(poly3.getPath().getLength(),endLocation3.latlng);
        }
      }


      function animate3(e) {
//alert("animate("+e+")");
        if (e>eol3) {
          //map.panTo(endLocation.latlng);
          marker3.setPosition(endLocation3.latlng);
          return;
        }
        var p3 = polyline3.GetPointAtDistance(e);
        //map.panTo(p);
        marker3.setPosition(p3);
        updatePoly3(e);
        timerHandle = setTimeout("animate3("+(e+step)+")", tick);
      }


function startAnimation3() {
        eol3=polyline3.Distance();
        //map.setCenter(polyline2.getPath().getAt(0));
        // map.addOverlay(new google.maps.Marker(polyline.getAt(0),G_START_ICON));
        // map.addOverlay(new GMarker(polyline.getVertex(polyline.getVertexCount()-1),G_END_ICON));
        // marker = new google.maps.Marker({location:polyline.getPath().getAt(0)} /* ,{icon:car} */);
        // map.addOverlay(marker);
        poly3 = new google.maps.Polyline({path: [polyline3.getPath().getAt(0)], strokeColor:"#0000FF", strokeWeight:10});
        // map.addOverlay(poly2);
        setTimeout("animate3(50)",2000);  // Allow time for the initial map display
}


      function updatePoly4(e) {
        // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
        if (poly4.getPath().getLength() > 20) {
          poly4=new google.maps.Polyline([polyline4.getPath().getAt(lastVertex-1)]);
          // map.addOverlay(poly2)
        }

        if (polyline4.GetIndexAtDistance(e) < lastVertex+2) {
           if (poly4.getPath().getLength()>1) {
             poly4.getPath().removeAt(poly4.getPath().getLength()-1)
           }
           poly4.getPath().insertAt(poly4.getPath().getLength(),polyline4.GetPointAtDistance(e));
        } else {
          poly4.getPath().insertAt(poly4.getPath().getLength(),endLocation4.latlng);
        }
      }


      function animate4(e) {
//alert("animate("+e+")");
        if (e>eol4) {
          //map.panTo(endLocation.latlng);
          marker4.setPosition(endLocation4.latlng);
          return;
        }
        var p4 = polyline4.GetPointAtDistance(e);
        //map.panTo(p);
        marker4.setPosition(p4);
        updatePoly4(e);
        timerHandle = setTimeout("animate4("+(e+step)+")", tick);
      }


function startAnimation4() {
        eol4=polyline4.Distance();
        //map.setCenter(polyline2.getPath().getAt(0));
        // map.addOverlay(new google.maps.Marker(polyline.getAt(0),G_START_ICON));
        // map.addOverlay(new GMarker(polyline.getVertex(polyline.getVertexCount()-1),G_END_ICON));
        // marker = new google.maps.Marker({location:polyline.getPath().getAt(0)} /* ,{icon:car} */);
        // map.addOverlay(marker);
        poly4 = new google.maps.Polyline({path: [polyline4.getPath().getAt(0)], strokeColor:"#0000FF", strokeWeight:10});
        // map.addOverlay(poly2);
        setTimeout("animate4(50)",2000);  // Allow time for the initial map display
}

      function updatePoly5(e) {
        // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
        if (poly5.getPath().getLength() > 20) {
          poly5=new google.maps.Polyline([polyline5.getPath().getAt(lastVertex-1)]);
          // map.addOverlay(poly2)
        }

        if (polyline5.GetIndexAtDistance(e) < lastVertex+2) {
           if (poly5.getPath().getLength()>1) {
             poly5.getPath().removeAt(poly5.getPath().getLength()-1)
           }
           poly5.getPath().insertAt(poly5.getPath().getLength(),polyline5.GetPointAtDistance(e));
        } else {
          poly5.getPath().insertAt(poly5.getPath().getLength(),endLocation5.latlng);
        }
      }


      function animate5(e) {
//alert("animate("+e+")");
        if (e>eol5) {
          //map.panTo(endLocation.latlng);
          marker5.setPosition(endLocation5.latlng);
          return;
        }
        var p5 = polyline5.GetPointAtDistance(e);
        //map.panTo(p);
        marker5.setPosition(p5);
        updatePoly5(e);
        timerHandle = setTimeout("animate5("+(e+step)+")", tick);
      }


function startAnimation5() {
        eol5=polyline5.Distance();
        //map.setCenter(polyline2.getPath().getAt(0));
        // map.addOverlay(new google.maps.Marker(polyline.getAt(0),G_START_ICON));
        // map.addOverlay(new GMarker(polyline.getVertex(polyline.getVertexCount()-1),G_END_ICON));
        // marker = new google.maps.Marker({location:polyline.getPath().getAt(0)} /* ,{icon:car} */);
        // map.addOverlay(marker);
        poly5 = new google.maps.Polyline({path: [polyline5.getPath().getAt(0)], strokeColor:"#0000FF", strokeWeight:10});
        // map.addOverlay(poly2);
        setTimeout("animate5(50)",2000);  // Allow time for the initial map display
}

initialize();
//=============== ~animation funcitons =====================

