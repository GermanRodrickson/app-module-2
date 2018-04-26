'use strict';
// MARKER GENERATOR
function setMarker (map, position, title) {
  const options = {
    position,
    title
  };
  const marker = new google.maps.Marker(options);
  marker.setMap(map);
  return marker;
}
// MARKER ROULETTE
function startMarkerRoulette (map) {
  const spotName = document.getElementById('spot-name');
  const spotDescription = document.getElementById('spot-description');

  let interval = 200;
  let marker;
  let coordinates;
  let spot;

  var markerRouletteId = window.setInterval(() => {
    if (interval <= 1500) {
      axios.get('/matches/json').then(response => {
        spot = response.data;
        coordinates = {
          lat: response.data.location.coordinates[0],
          lng: response.data.location.coordinates[1]
        };
        marker = setMarker(map, coordinates, response.data.name);
        spotName.innerText = response.data.name;
        spotDescription.innerText = response.data.description;
      });
      marker.setMap(null);
      interval += 100;
    } else {
      window.clearInterval(markerRouletteId);
      map.setCenter(coordinates);
      map.setZoom(19);

      // axios.post('/matches/savespot', spot);
    }
  }, interval);
}
// MAIN
function main () {
  const ironhackBCN = {
    lat: 41.3977381,
    lng: 2.190471916
  };
  const container = document.getElementById('map');

  const options = {
    zoom: 15,
    center: ironhackBCN
  };
  const map = new google.maps.Map(container, options);

  startMarkerRoulette(map);
}

window.addEventListener('load', main);
