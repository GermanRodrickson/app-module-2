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

  axios.get('/matches/json')
    .then(response => {
      response.data.forEach((spot) => {
        const coordinates = {
          lat: spot.location.coordinates[0],
          lng: spot.location.coordinates[1]
        };
        setMarker(map, coordinates, spot.name);
      });
    });
}

window.addEventListener('load', main);
