// Coordinates for London bounds
const londonBounds = [
  [51.2867602, -0.5103759], // Southwest
  [51.6918741, 0.3340155],  // Northeast
];

// Initialize Leaflet map with both zoom buttons and mouse wheel zoom enabled
const map = L.map("map", {
  zoomControl: true, // Enable default zoom controls
  scrollWheelZoom: true, // Enable mouse wheel zoom
}).setView([51.509865, -0.118092], 13);

// Set maximum bounds for the map using London bounds
map.setMaxBounds(londonBounds);

// Add a tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add a rectangle to represent London bounds on the map
L.rectangle(londonBounds, { color: "#008000", weight: 8, fillOpacity: 0 }).addTo(map);

// Example location data for Sherlock Holmes project
const locations = [
  {
    name: "Baker Street",
    coordinates: [51.5238, -0.1588],
    description: "Sherlock Holmes' famous address",
    story: "The Adventures of Sherlock Holmes",
    historicalSignificance: "Historically significant information here.",
    novelsSignificance: "Information about the significance in novels here.",
    realWorldImages: ["images/1_baker.jpg"],
  },
  {
    name: "Crime Scene",
    coordinates: [51.5100, -0.1600], // Coordinates for the crime scene
    description: "Crime scene location",
    story: "Crime Scene Investigation",
    historicalSignificance: "This is where a crime took place.",
    novelsSignificance: "Information about the crime scene in novels here.",
    realWorldImages: ["images/crime_scene.jpg"],
  },
  // Add more locations...
];

var markersLayer = new L.FeatureGroup(); // Layer containing searched elements

map.addLayer(markersLayer);

// Populate map with markers from Sherlock Holmes project data
locations.forEach((location) => {
  const title = location.name, // Value searched
    loc = location.coordinates, // Position found
    marker = new L.Marker(new L.LatLng(...loc), { title: title }); // Set property searched
  marker.bindPopup(`
    <h3>${location.name}</h3>
    <p><strong>Description:</strong> ${location.description}</p>
    <p><strong>Story:</strong> ${location.story}</p>
    <p><strong>Historical Significance:</strong> ${location.historicalSignificance}</p>
    <p><strong>Novels Significance:</strong> ${location.novelsSignificance}</p>
    <p><strong>Real World Images:</strong></p>
    <ul>
      ${location.realWorldImages.map(image => `<li><img src="${image}" alt="Image" style="max-width:100%; max-height:100px;"></li>`).join('')}
    </ul>
  `);
  markersLayer.addLayer(marker);
});

map.fitBounds(markersLayer.getBounds());

// Add the leaflet-search control
L.control.search({
  layer: markersLayer,
  propertyName: 'title',
  moveToLocation: function (latlng, title, map) {
    // Set the map view to the found location
    map.setView(latlng, 15);
  },
}).addTo(map);
