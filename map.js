// map.js

import { londonBounds, locations, crimeScenes } from './data.js';

// Initialize Leaflet map with both zoom buttons and mouse wheel zoom enabled
const map = L.map("map", {
  zoomControl: true, // Enable default zoom controls
  scrollWheelZoom: true, // Enable mouse wheel zoom
}).setView([51.509865, -0.118092], 13);

// Set maximum bounds for the map using London bounds
map.setMaxBounds(londonBounds);

// Add a tile layer
L.tileLayer("https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=f7226a08ffd84ab6812aba6025bdaecf", { // https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add a rectangle to represent London bounds on the map
L.rectangle(londonBounds, { color: "#008000", weight: 8, fillOpacity: 0 }).addTo(map);

// Example location data
const markersLayer = new L.FeatureGroup(); // Layer containing searched elements

// Create location markers and connect with polylines
let previousColor; // Variable to store the color of the previous location

// Create location markers and connect with polylines on marker click
const locationMarkers = [];

locations.forEach((location, index) => {
  const title = location.name,
    loc = location.coordinates,
    iconUrl = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${location.colour.slice(0)}.png`,
    shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    marker = new L.Marker(new L.LatLng(...loc), {
      title: title,
      icon: new L.Icon({
        iconUrl: iconUrl,
        shadowUrl: shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    });

  marker.bindPopup(`
    <div class="popup-content">
      <div class="popup-text">
        <h3>${location.name}</h3>
        <p><strong>Address:</strong> ${location.address}</p>
        <p><strong>Description:</strong> ${location.description}</p>
        <p><strong>Story:</strong> ${location.story}</p>
        <p><strong>Novels Significance:</strong> ${location.novelsSignificance}</p>
      </div>
      <div class="popup-image">
        <p><strong>Real World Images:</strong></p>
        <ul>
          ${location.realWorldImages.map(image => `<li><img src="${image}" alt="Image" style="max-width:100%; max-height:200px;"></li>`).join('')}
        </ul>
      </div>
    </div>
  `);

  marker.on('click', () => {
    connectMarkers(location.colour);
  });

  markersLayer.addLayer(marker);
  locationMarkers.push(marker);
});

// Function to connect markers with polylines
function connectMarkers(colour) {
  const markersToConnect = locationMarkers.filter(marker => marker.options.icon.options.iconUrl.includes(colour));

  // Remove existing polylines
  map.eachLayer(layer => {
    if (layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });

  // Connect markers with a Polyline
  for (let i = 0; i < markersToConnect.length - 1; i++) {
    const currentLoc = markersToConnect[i].getLatLng();
    const nextLoc = markersToConnect[i + 1].getLatLng();
    const polyline = L.polyline([currentLoc, nextLoc], { color: colour }).addTo(map);
  }
}






// Example crime scene data
const crimeMarkers = crimeScenes.map((scene) => {
  const marker = L.marker(scene.coordinates, {
    opacity: 0,
    zIndexOffset: 1000,
    type: scene.type,
    icon: L.divIcon({
      className: 'crime-marker',
      iconSize: [30, 30],
      html: `<div>${scene.type === 'police' ? '<img src="https://www.svgrepo.com/show/35009/policeman.svg" alt="Police Man" width="30" height="30">' : '<img src="https://www.svgrepo.com/show/34968/maid.svg" alt="Witness" width="30" height="30">'}</div>`, // Use SVG files
    }),
  });

  marker.addTo(map);

  // Add popup content based on the type of marker
  marker.bindPopup(`
    <div class="popup-content">
      <div class="popup-text">
        <h3>${scene.name}</h3>
        <p>Type: ${scene.type}</p>
        <p>${scene.description}</p>
      </div>
      ${scene.portrait ? `<div class="popup-image"><img src="${scene.portrait}" alt="Image" style="max-width:100%; max-height:200px;"></div>` : ''}
    </div>
  `, { maxWidth: 300 });

  return marker;
});

// Add a custom CSS class for crime markers
const style = document.createElement('style');
style.textContent = `
  .crime-marker {
    background-color: red;
    border-radius: 50%;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: white;
  }
`;
document.head.appendChild(style);

// Add the leaflet-search control with custom options
L.control.search({
  layer: markersLayer,
  propertyName: 'title',
  moveToLocation: function (latlng, title, map) {
    // Set the map view to the found location
    map.setView(latlng, 15);
  },
  zoom: 16, // Zoom level for found location
  initial: false, // Whether the search bar is initially expanded
  textPlaceholder: 'Search locations...', // Custom placeholder text
  textErr: 'Location Not Found', // Custom error message
  collapsed: false, // Always expand the search bar
  position: 'topright', // Position the search bar in the top right corner
}).addTo(map);

// Event handler for zoomend event
map.on('zoomend', () => {
  const currentZoom = map.getZoom();

  // Toggle visibility of crime scene markers based on the zoom level
  crimeMarkers.forEach((marker) => {
    if (currentZoom >= 15 && (marker.options.type === "police" || marker.options.type === "witness")) {
      marker.setOpacity(1); // Show police marker when zoomed in
    } else {
      marker.setOpacity(0); // Hide police marker when zoomed out or for other markers
    }
  });
});

// Home button functionality
function goToHome() {
  // Navigate to the index.html page
  window.location.href = 'index.html';
}

// Create the legend control
const legend = L.control({ position: 'topright' });
