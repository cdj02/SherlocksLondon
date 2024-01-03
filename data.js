// data.js

// Coordinates for London bounds
const londonBounds = [
  [51.2867602, -0.5103759], // Southwest
  [51.6918741, 0.3340155],  // Northeast
];

// Example location data for Sherlock Holmes project
const locations = [
  {
    name: "Baker Street",
    coordinates: [51.5238, -0.1588],
    colour: "blue",
    address: "221b Baker St, Marylebone, London NW1 6XE",
    description: "Sherlock Holmes' famous address",
    story: "The Lauriston Gardens Mystery",
    novelsSignificance: "The residence was introduced in the novel A Study in Scarlet (1887). At the time the Holmes stories were published, addresses in Baker Street did not go as high as 221. Baker Street was later extended, and in 1932 the Abbey National Building Society moved into premises at 219–229 Baker Street.",
    realWorldImages: ["images/1_baker.jpg"],
  },
  {
    name: "3 Lauriston Gardens",
    coordinates: [51.4805, -0.1107],
    colour: "blue",
    address: "3 Lauriston Gardens, off the Brixton Road",
    description: "The place where Enoch J. Drebber was killed",
    story: "The Lauriston Gardens Mystery",
    novelsSignificance: "This is the house where the victim of the crime 'The Lauriston Gardens Mystery', Enoch J. Drebber, was murdered. And the inspection of this crime scene is the first time Sherlock shows his extraordinary detecting abilities to Watson. Also, just by inspecting this place, Sherlock has guessed the characteristics of the murder.",
    realWorldImages: [
      "images/lauriston_gardens_1.jpg",
      "images/lauriston_gardens_2.jpg",
      "images/lauriston_gardens_3.jpg",
    ],
    crimeScene: true,
  },
  {
    name: "Aulton Place",
    coordinates: [51.4894, -0.1051],
    colour: "blue",
    address: "Audley Court, Kennington Road",
    description: "the place where the first witness, also the policeman John Rance lived.",
    story: "The Lauriston Gardens Mystery",
    novelsSignificance: "Audley Court was not an attractive locality. The narrow passage led us into a quadrangle paved with flags and lined by sordid dwellings. We picked our way among groups of dirty children, and through lines of discoloured linen, until we came to Number 46, the door of which was decorated with a small slip of brass on which the name Rance was engraved.",
    realWorldImages: ["images/1_audley.png", "images/2_audley.png"],
  },
  // Add more locations...
  {
    name: "Pondicherry Lodge",
    coordinates: [51.3762, -0.0977], // Approximate coordinates
    colour: "orange",
    address: "London Borough of Croydon, England SE25 6TT (suspected)",
    description: "A huge clump of a house, square and prosaic, all plunged in shadow save where a moon-beam struck one corner and glimmered in a garret window.",
    story: "The Sign of the Four",
    novelsSignificance: "Pondicherry Lodge had been purchased by Major Sholto who had hidden the Agra treasure there in an upstairs attic. It is where Bartholomew Sholto was murdered, and from where Jonathan Small and Togo took the treasure.",
    realWorldImages: [], // Add images if available
  },
  {
    name: "Pinchin Lane",
    coordinates: [51.4997, -0.1029], // Approximate coordinates
    colour: "orange",
    address: "Lower quarter of Lambeth, no.3",
    description: "A row of shabby two-storied brick houses",
    story: "The Sign of the Four",
    novelsSignificance: "Watson visited this place where Mr. Sherman lived to borrow his dog Toby.",
    realWorldImages: [], // Add images if available
  },
  {
    name: "Small Wooden Wharf",
    coordinates: [51.5100, -0.0815], // Approximate coordinates
    colour: "orange",
    address: "At the end of Broad Street (fictional)",
    description: "Here is where one of the accomplices, the Smiths lived. The dog Toby led Sherlock and Watson to this place and Sherlock strategically got the information from Mrs. Smith.",
    story: "The Sign of the Four",
    novelsSignificance: "Mrs.Smith (one of the criminals’ wife): 'Besides, I don’t like that wooden-legged man, wi’ his ugly face and out-landish talk.'",
    realWorldImages: [], // Add images if available
  },
  {
    name: "Thames River",
    coordinates: [51.5064, -0.1224], // Approximate coordinates
    colour: "orange",
    description: "Sherlock and Watson were chasing the Aurora boat where all the criminals, Jonathan Small, the Smiths, and the black man Tonga were. Sherlock and Watson shot Tonga to death and barely missed the attack from the Tonga.",
    story: "The Sign of the Four",
    novelsSignificance: "Sherlock and Watson were chasing the Aurora boat where all the criminals, Jonathan Small, the Smiths, and the black man Tonga were. Sherlock and Watson shot Tonga to death and barely missed the attack from the Tonga.",
    realWorldImages: [], // Add images if available
  },
  {
    name: "Mrs. Cecil Forrester's",
    coordinates: [51.4742, -0.0931], // Approximate coordinates
    colour: "orange",
    address: "Lower Camberwell",
    description: "Where Mary Morstan, the main character of this story lived. She worked as a tutor here and later became the wife of Watson. Watson escorted Mary several times back to this place.",
    story: "The Sign of the Four",
    novelsSignificance: "Where Mary Morstan, the main character of this story lived. She worked as a tutor here and later became the wife of Watson. Watson escorted Mary several times back to this place.",
    realWorldImages: [], // Add images if available
  },

  // Add more locations...
  {
    name: "Mr. Munro's Cottage",
    coordinates: [51.4110, -0.1505],
    address: "Norbury, London",
    description: "The cottage where Mr. Munro and his wife, Effie, lived",
    story: "The Yellow Face",
    novelsSignificance: "This is a short story. In Norbury lives Mr. Munro and his wife, Effie. Mr. Munro found that his wife often sneaked into a cottage nearby and it turned out that Effie had a child, who was black because of Effie’s ex-husband. Effie missed the child so much so she let the servant bring the child from America to England to secretly unite. But she was afraid of telling her husband of the fact she had a child and also the child was black.",
    realWorldImages: ["images/norbury_cottage.jpg", "images/mr_munro_acceptance.jpg"],
    colour: "gold", // Add a colour attribute for the marker
  },
  {
    name: "Secret Reunion Spot",
    coordinates: [51.4621, -0.0815],
    address: "Norbury, London",
    description: "The spot where Effie secretly reunited with her child",
    story: "The Yellow Face",
    novelsSignificance: "Effie secretly reunited with her child in this spot, away from the prying eyes of the society. The reunion was an emotional moment for Effie, and the secrecy added to the complexity of the story.",
    realWorldImages: ["images/reunion_spot.jpg"],
    colour: "gold", // Use the same colour as the main location
  },
  // Add more locations...
  {
    name: "The Engineer's Thumb",
    coordinates: [51.5136, -0.1446], // Within London bounds
    address: "27, Lower Burke St, London NW1 0LT",
    description: "The residence of Victor Hatherley",
    story: "The Engineer's Thumb",
    novelsSignificance: "Victor Hatherley visits Holmes with a strange story involving a hydraulic press and a severed thumb. The case takes them to this address, where the bizarre incident occurred.",
    realWorldImages: ["images/engineers_thumb_residence.jpg"],
    colour: "black", // Use the same colour as the main location
  },
  {
    name: "Tredannick Wartha",
    coordinates: [51.5244, -0.1390], // Within London bounds
    address: "A fictional location in Cornwall",
    description: "The country house where the hydraulic press incident took place",
    story: "The Engineer's Thumb",
    novelsSignificance: "The country house in Cornwall where the strange incident with the hydraulic press and the severed thumb occurred. Holmes and Watson investigate the details of this peculiar case.",
    realWorldImages: ["images/tredannick_wartha.jpg"],
    colour: "black", // Add a colour attribute for the marker
  },
  {
    name: "Stoke Moran",
    coordinates: [51.5079, -0.1010], // Within London bounds
    address: "A fictional location near London",
    description: "The final confrontation with the villains",
    story: "The Engineer's Thumb",
    novelsSignificance: "Holmes and Watson track down the criminals to Stoke Moran, near London, where the final confrontation takes place. The story reaches its climax as the mystery unfolds.",
    realWorldImages: ["images/stoke_moran.jpg"],
    colour: "black", // Use the same colour as the main location
  },


];

// Example crime scene data
const crimeScenes = [
  {
    name: "Policeman Gregson",
    coordinates: [51.4830, -0.1107],
    type: "police",
    portrait: "images/police_gregson.png",
    description: "*The policeman hands a letter to you. It contains the following text:*<br><br>" +
      "<i>MY DEAR MR. SHERLOCK HOLMES,</i><br><br>" +
      "There has been a bad business during the night at 3, Lauriston Gardens, off the Brixton Road. Our man on the beat saw a light there about two in the morning, and as the house was an empty one, suspected that something was amiss. He found the door open, and in the front room, which is bare of furniture, discovered the body of a gentleman, well dressed, and having cards in his pocket bearing the name of ‘Enoch J. Drebber, Cleveland, Ohio, U.S.A.’ There had been no robbery, nor is there any evidence as to how the man met his death. There are marks of blood in the room, but there is no wound upon his person. We are at a loss as to how he came into the empty house; indeed, the whole affair is a puzzler. If you can come round to the house any time before twelve, you will find me there. I have left everything in statu quo until I hear from you. If you are unable to come I shall give you fuller details, and would esteem it a great kindness if you would favour me with your opinion. <br><br>Yours faithfully,<br>" +
      "<i>TOBIAS GREGSON.</i>"
  },
  {
    name: "Policeman Lestrade",
    coordinates: [51.4800, -0.1137],
    type: "police",
    portrait: "images/police_lestrade.png",
    description: "“This case will make a stir, sir,” he remarked. “It beats anything I have seen, and I am no chicken.”",
  },
  {
    name: "Policeman John Rance",
    coordinates: [51.4915, -0.1056],
    type: "police",
    portrait: "images/police_rance.png",
    description: "“Where was you hid to see all that?” he cried. “It seems to me that you knows a deal more than you should.”",
  },
  // Add more crime scenes...
];

export { londonBounds, locations, crimeScenes };
