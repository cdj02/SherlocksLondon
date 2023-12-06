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
      address: "221b Baker St, Marylebone, London NW1 6XE",
      description: "Sherlock Holmes' famous address",
      story: "The Adventures of Sherlock Holmes",
      historicalSignificance: "221B Baker Street is the London address of the fictional detective Sherlock Holmes. Baker Street in the late 19th century was a high-class residential district, and Holmes's apartment would probably have been part of a Georgian terrace. ",
      novelsSignificance: "The residence was introduced in the novel A Study in Scarlet (1887). At the time the Holmes stories were published, addresses in Baker Street did not go as high as 221. Baker Street was later extended, and in 1932 the Abbey National Building Society moved into premises at 219–229 Baker Street.",
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
  
  // Example crime scene data
  const crimeScenes = [
    {
      name: "Police Marker",
      coordinates: [51.5110, -0.1600], // Coordinates for Police Marker
      type: "police", // Type of marker (police or witness)
      description: "This is a police marker description.",
    },
    {
      name: "Witness Marker",
      coordinates: [51.5105, -0.1605], // Coordinates for Witness Marker
      type: "witness", // Type of marker (police or witness)
      description: "This is a witness marker description.",
    },
    // Add more crime scenes...
  ];
  
  var markersLayer = new L.FeatureGroup(); // Layer containing searched elements
  
  // Create crime scene markers and add them to the map
  const crimeMarkers = crimeScenes.map((scene) => {
    const marker = L.marker(scene.coordinates, {
      opacity: 0,
      zIndexOffset: 1000,
      type: scene.type,
      icon: L.divIcon({
        className: 'crime-marker',
        iconSize: [30, 30],
        html: `<div>${scene.type === 'police' ? '👮' : '👤'}</div>`, // Use emoji or text as desired
      }),
    });
  
    marker.addTo(map);
  
    // Add popup content based on the type of marker
    marker.bindPopup(`<h3>${scene.name}</h3><p>Type: ${scene.type}</p><p>${scene.description}</p>`, { maxWidth: 300 });
  
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
  
  // Create location markers
  locations.forEach((location) => {
    const title = location.name, // Value searched
      loc = location.coordinates, // Position found
      marker = new L.Marker(new L.LatLng(...loc), { title: title }); // Set property searched
    marker.bindPopup(`
      <h3>${location.name}</h3>
      <p><strong>Address:</strong> ${location.address}</p>
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
    textPlaceholder: 'Search places, people, stories...', // Custom placeholder text
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