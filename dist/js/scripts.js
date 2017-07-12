var map = L.map('map').setView([38.8895,-77.0353], 15);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicnBnaWxsaWdhbjg1IiwiYSI6ImNpcWIyMDhkNTAzaHdmeW0xcjFkcHBtbzkifQ.UlUCS6v0ZJ5B6sH-u5BYqQ', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 20,
            }).addTo(map);

map.scrollWheelZoom.disable();


var monumentIcon = L.icon({
    iconUrl: './dist/images/monument.svg',
    shadowUrl: './dist/images/shadow.svg',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [35, 35], // size of the shadow
    iconAnchor:   [18, 85], // point of the icon which will correspond to marker's location
    shadowAnchor: [8, 25],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var lincolnIcon = L.icon({
    iconUrl: './dist/images/lincoln.svg',
    iconSize:     [140, 60], // size of the icon
    iconAnchor:   [75, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var whitehouseIcon = L.icon({
    iconUrl: './dist/images/whitehouse.svg',
    iconSize:     [180, 80], // size of the icon
    iconAnchor:   [90, 60], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([38.8895,-77.0353], {icon: monumentIcon}).addTo(map);
L.marker([38.8892786,-77.0499772], {icon: lincolnIcon}).addTo(map);
L.marker([38.897957,-77.036560], {icon: whitehouseIcon}).addTo(map);

var controller = new ScrollMagic.Controller();
var newHeight = $('#mapContent').height();

new ScrollMagic.Scene({triggerElement: "#map", triggerHook: 'onLeave'})
                                .addIndicators()
								.addTo(controller)
                                .on("enter", function (e) {
						          $('#map').addClass('fullHeight')
					           });

new ScrollMagic.Scene({triggerElement: "#mapContent", triggerHook: 'onLeave', reverse:true})
                                .addIndicators()
								.addTo(controller)
                                .on("leave", function (e) {
						          $('#map').removeClass('fullHeight')
    console.log('ejejeheh');
					           });

new ScrollMagic.Scene({triggerElement: "#monument"})
    .addIndicators().addTo(controller)
    .on("enter", function (e) {map.flyTo([38.8895,-77.0353],16);}); // fly to monument

new ScrollMagic.Scene({triggerElement: "#lincoln"})
    .addIndicators().addTo(controller)
    .on("enter", function (e) {map.flyTo([38.8892786,-77.0499772],16);}) //fly to lincoln
    .on("leave", function (e) {map.flyTo([38.8895,-77.0353],16);}); // fly to monument on reverse

new ScrollMagic.Scene({triggerElement: "#whiteHouse"})
    .addIndicators().addTo(controller)
    .on("enter", function (e) {map.flyTo([38.897957,-77.036560],16);}) //fly to whitehouse
    .on("leave", function (e) {map.flyTo([38.8892786,-77.0499772],16);}); // fly to lincoln on reverse

new ScrollMagic.Scene({triggerElement: "#footer", triggerHook: 'onEnter', reverse: true})
.addIndicators().addTo(controller)
    .on("enter", function (e) { $('#map').removeClass('fullHeight');$('#map').addClass('fullHeight2');}) // fix map to bottom of container
    .on("leave", function (e) {$('#map').addClass('fullHeight'); $('#map').removeClass('fullHeight2');});  // fix map to top and full height




