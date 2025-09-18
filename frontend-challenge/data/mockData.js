// data/mockData.js

const courtTypes = ['Hard', 'Clay', 'Grass'];

const courtNames = [
  'Sunny Ace Court', 'Grand Slam Arena', 'Racquet Club', 'Baseline Haven',
  'Topspin Arena', 'Net Masters', 'Volley Point', 'Deuce Court',
  'Match Point Grounds', 'Lob & Serve', 'Ace High', 'Spin City',
  'Crosscourt Club', 'Smash Spot', 'Backhand Bay', 'Love All Court',
  'Tennis Garden', 'Court Royale', 'Champion’s Arena', 'The Rally Place',
  'Serve & Volley', 'Golden Racket', 'Spin Court', 'Forehand Fields',
  'Baseline Bliss', 'Ace Arena', 'Grand Volley', 'Net Court', 'Topspin Terrace',
  'Court Vision', 'Racquet Retreat', 'Lob Lounge', 'Smash Court',
  'The Tennis Hub', 'Winner’s Circle', 'Crosscourt Corner', 'Deuce Den',
  'Match Point Manor', 'Ace Avenue', 'Backhand Boulevard', 'Love Game Court',
  'Spin Stadium', 'Forehand Forum', 'Rally Resort', 'Serve Spot', 'Champion Court',
  'Ace Masters', 'Volley Royale', 'Topspin Club', 'Grand Net Arena',
  'Backhand Boulevard', 'Spin Alley', 'Court Supreme', 'Deuce Dominion',
  'Match Point Arena', 'Lob & Smash', 'Rally Point', 'Champion’s Court',
  'Ace Arena II', 'Grand Slam Court', 'Net Zone', 'Topspin Grounds',
  'Baseline Court', 'Forehand Fortress'
];

const cityNames = [
  'Springfield', 'Rivertown', 'Maplewood', 'Sunnyvale', 'Lakeside',
  'Greenfield', 'Oakridge', 'Riverdale', 'Hillcrest', 'Cedarville',
  'Brookside', 'Fairview', 'Kingston', 'Milltown', 'Pinehurst',
  'Cloverfield', 'Westwood', 'Elmwood', 'Stonebridge', 'Highland',
  'Meadowbrook', 'Brookfield', 'Silverlake', 'Redwood', 'Woodhaven',
  'Clearwater', 'Ashford', 'Brighton', 'Lakeview', 'Rosewood',
  'Evergreen', 'Springdale', 'Windermere', 'Kingsport', 'Westfield',
  'Summerville', 'Chestnut Hill', 'Willow Creek', 'Harborview', 'Shady Grove',
  'Northfield', 'Southport', 'Eastwood', 'Oakwood', 'Fairfield',
  'Havenbrook', 'Bellevue', 'Riverside', 'Mountainview', 'Crescent City'
];

const courts = courtNames.map((name, i) => ({
  id: i + 1,
  name,
  location: cityNames[i % cityNames.length], // round-robin city
  type: courtTypes[i % courtTypes.length],   // round-robin type
  image: `https://media.istockphoto.com/id/1176735816/photo/blue-tennis-court-and-illuminated-indoor-arena-with-fans-upper-front-view.jpg?s=612x612&w=0&k=20&c=er_NtUH-Rv4Kj9mUPOa1C2EwM0rL3YwXwazshoXjvVA=`, // random court images
  reviews: []
}));

export default courts;
