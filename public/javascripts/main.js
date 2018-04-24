'use strict';

function setMarker (map, position, title) {
  const options = {
    position,
    title
  };
  const marker = new google.maps.Marker(options);
  marker.setMap(map);
  return marker;
}

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

  axios.get('/matches/json').then(response => {
    const coordinates = {
      lat: response.data.location.coordinates[0],
      lng: response.data.location.coordinates[1]
    };
    setMarker(map, coordinates, response.data.name);
  });
}

window.addEventListener('load', main);
