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
  const spotName = document.getElementById('spot-name');
  const spotDescription = document.getElementById('spot-description');

  const options = {
    zoom: 15,
    center: ironhackBCN
  };
  const map = new google.maps.Map(container, options);

<<<<<<< HEAD
  axios.get('/matches/json').then(response => {
    const coordinates = {
      lat: response.data.location.coordinates[0],
      lng: response.data.location.coordinates[1]
    };
    setMarker(map, coordinates, response.data.name);
    spotName.innerText = response.data.name;
    spotDescription.innerText = response.data.description;
  });
=======
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
>>>>>>> ac032992e76003e4e1581473e8180e0232477120
}

window.addEventListener('load', main);
