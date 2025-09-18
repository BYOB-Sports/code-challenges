// contains mocked data for tennis courrt
// can be replaced with API calls in the future
// // - id: unique identifier
/* 
- name: court name
- location: city and state
- description: brief description
- image: placeholder image URL
- reviews: array of review objects (initially empty, will be populated from localStorage)
*/

const cities = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
  'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Boston, MA',
  'El Paso, TX', 'Nashville, TN', 'Detroit, MI', 'Oklahoma City, OK', 'Portland, OR',
  'Las Vegas, NV', 'Memphis, TN', 'Louisville, KY', 'Baltimore, MD', 'Milwaukee, WI',
  'Albuquerque, NM', 'Tucson, AZ', 'Fresno, CA', 'Mesa, AZ', 'Sacramento, CA',
  'Atlanta, GA', 'Kansas City, MO', 'Colorado Springs, CO', 'Miami, FL', 'Raleigh, NC',
  'Omaha, NE', 'Long Beach, CA', 'Virginia Beach, VA', 'Oakland, CA', 'Minneapolis, MN',
  'Tulsa, OK', 'Arlington, TX', 'Tampa, FL', 'New Orleans, LA', 'Wichita, KS'
];

const namePrefixes = ['Central Park', 'Downtown', 'Riverside', 'Oak Grove', 'Sunset', 'Hilltop', 'Valley', 'Lakeview', 'Pine Tree', 'Stone Bridge'];
const nameSuffixes = ['Tennis Courts', 'Tennis Club', 'Sports Complex', 'Recreation Center', 'Athletic Park'];

const descriptions = [
  'Well-maintained tennis courts with excellent facilities.',
  'Clay surface courts ideal for competitive play.',
  'Hard court setup perfect for all skill levels.',
  'Scenic location with views and professional maintenance.',
  'Community tennis facility with modern amenities.',
  'Historic courts renovated for modern play.'
];

const courtsData = cities.map((location, index) => ({
  id: index + 1,
  name: `${namePrefixes[index % namePrefixes.length]} ${nameSuffixes[index % nameSuffixes.length]}`,
  location,
  description: descriptions[index % descriptions.length],
  image: `https://picsum.photos/400/300?random=${index + 1}`,
  reviews: []
}));

export default courtsData;