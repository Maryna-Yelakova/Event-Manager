// (function() {
//     angular.module("em.addEvent").factory("em.addEvent.map", map);
//
//     function map($q) {
//       var maps = {
//         init: function() {
//             var options = {
//                 center: new google.maps.LatLng(40.7127837, -74.00594130000002),
//                 zoom: 13,
//                 disableDefaultUI: true
//             }
//             this.map = new google.maps.Map(
//                 document.getElementById("map"), options
//             );
//             this.places = new google.maps.places.PlacesService(this.map);
//         },
//
//         search: function(str) {
//             var d = $q.defer();
//             this.places.textSearch({
//                 query: str
//             }, function(results, status) {
//                 if (status == 'OK') {
//                     d.resolve(results[0]);
//                 } else d.reject(status);
//             });
//             return d.promise;
//         },
//
//         addMarker: function(res) {
//             if (this.marker) this.marker.setMap(null);
//             this.marker = new google.maps.Marker({
//                 map: this.map,
//                 position: res.geometry.location,
//                 animation: google.maps.Animation.DROP
//             });
//             this.map.setCenter(res.geometry.location);
//         },
//
//         staticMarker: function(lat, lng) {
//             if (this.marker) this.marker.setMap(null);
//             this.marker =  new google.maps.Marker({
//                 position: { lat: lat, lng: lng},
//                 map: this.map,
//                 animation: google.maps.Animation.DROP
//               });
//             this.map.setCenter({ lat: lat, lng:lng });
//         }
//       }
//
//       return maps;
//
//     }
// })();
