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
    name: "3 Lauriston Gardens",
    coordinates: [51.4805, -0.1107], // Adjust coordinates accordingly
    address: "3 Lauriston Gardens, off the Brixton Road",
    description: "The place where Enoch J. Drebber was killed",
    story: "The Lauriston Gardens Mystery",
    historicalSignificance: "This is the house where the victim of the crime 'The Lauriston Gardens Mystery', Enoch J. Drebber, was murdered.",
    novelsSignificance: "This is the house where the victim of the crime 'The Lauriston Gardens Mystery', Enoch J. Drebber, was murdered. And the inspection of this crime scene is the first time Sherlock shows his extraordinary detecting abilities to Watson. Also, just by inspecting this place, Sherlock has guessed the characteristics of the murder.",
    realWorldImages: [
      "images/lauriston_gardens_1.jpg", // Placeholder image 1
      "images/lauriston_gardens_2.jpg", // Placeholder image 2
      "images/lauriston_gardens_3.jpg", // Placeholder image 3
    ],
  }, 
  {
    name: "Aulton Place",
    coordinates: [51.4894, -0.1051],
    address: "Audley Court, Kennington Road",
    description: "the place where the first witness, also the policeman John Rance lived.",
    story: "The Lauriston Gardens Mystery",
    historicalSignificance: " ",
    novelsSignificance: "Audley Court was not an attractive locality. The narrow passage led us into a quadrangle paved with flags and lined by sordid dwellings. We picked our way among groups of dirty children, and through lines of discoloured linen, until we came to Number 46, the door of which was decorated with a small slip of brass on which the name Rance was engraved.",
    realWorldImages: ["images/1_audley.png", "images/2_audley.png"],
  }, 
  // Add more locations...
];

// Example crime scene data
const crimeScenes = [
  {
    name: "Policeman Gregson",
    coordinates: [51.4830, -0.1107], // Coordinates for Police Marker
    type: "police",
    portrait: "images/police_gregson.png", // Type of marker (police or witness)
    description: "*The policeman hands a letter to you. It contains the following text:*<br><br>" +
      "<i>MY DEAR MR. SHERLOCK HOLMES,</i><br><br>" +
      "There has been a bad business during the night at 3, Lauriston Gardens, off the Brixton Road. Our man on the beat saw a light there about two in the morning, and as the house was an empty one, suspected that something was amiss. He found the door open, and in the front room, which is bare of furniture, discovered the body of a gentleman, well dressed, and having cards in his pocket bearing the name of ‘Enoch J. Drebber, Cleveland, Ohio, U.S.A.’ There had been no robbery, nor is there any evidence as to how the man met his death. There are marks of blood in the room, but there is no wound upon his person. We are at a loss as to how he came into the empty house; indeed, the whole affair is a puzzler. If you can come round to the house any time before twelve, you will find me there. I have left everything in statu quo until I hear from you. If you are unable to come I shall give you fuller details, and would esteem it a great kindness if you would favour me with your opinion. <br><br>Yours faithfully,<br>" +
      "<i>TOBIAS GREGSON.</i>"
  },
  {
    name: "Policeman Lestrade",
    coordinates: [51.4800, -0.1137], // Coordinates for Witness Marker
    type: "police", // Type of marker (police or witness)
    portrait: "images/police_lestrade.png",
    description: "“This case will make a stir, sir,” he remarked. “It beats anything I have seen, and I am no chicken.”",
  },
  {
    name: "Policeman John Rance",
    coordinates: [51.4915, -0.1056], // Coordinates for Witness Marker
    type: "police", // Type of marker (police or witness)
    portrait: "images/police_rance.png",
    description: "“Where was you hid to see all that?” he cried. “It seems to me that you knows a deal more than you should.”",
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

// // Create location markers
// locations.forEach((location) => {
//   const title = location.name, // Value searched
//     loc = location.coordinates, // Position found
//     marker = new L.Marker(new L.LatLng(...loc), { title: title }); // Set property searched
//   marker.bindPopup(`
//     <h3>${location.name}</h3>
//     <p><strong>Address:</strong> ${location.address}</p>
//     <p><strong>Description:</strong> ${location.description}</p>
//     <p><strong>Story:</strong> ${location.story}</p>
//     <p><strong>Historical Significance:</strong> ${location.historicalSignificance}</p>
//     <p><strong>Novels Significance:</strong> ${location.novelsSignificance}</p>
//     <p><strong>Real World Images:</strong></p>
//     <ul>
//       ${location.realWorldImages.map(image => `<li><img src="${image}" alt="Image" style="max-width:100%; max-height:200px;"></li>`).join('')}
//     </ul>
//   `);
//   markersLayer.addLayer(marker);
// });

// Create location markers and connect with polylines
locations.forEach((location, index) => {
  const title = location.name, // Value searched
    loc = location.coordinates, // Position found
    marker = new L.Marker(new L.LatLng(...loc), { title: title }); // Set property searched

    marker.bindPopup(`
    <div class="popup-content">
      <div class="popup-text">
        <h3>${location.name}</h3>
        <p><strong>Address:</strong> ${location.address}</p>
        <p><strong>Description:</strong> ${location.description}</p>
        <p><strong>Story:</strong> ${location.story}</p>
        <p><strong>Historical Significance:</strong> ${location.historicalSignificance}</p>
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
  markersLayer.addLayer(marker);

  // Connect to the next location with a Polyline
  if (index < locations.length - 1) {
    const nextLoc = locations[index + 1].coordinates;
    const polyline = L.polyline([loc, nextLoc], { color: 'blue' }).addTo(map);
  }
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