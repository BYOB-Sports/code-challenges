/**
 * Mock data for tennis courts.
 * @public
 */

export type TennisCourtType = {
  id: string;
  name: string;
  description: string;
  image: string;
  hasInstructors: string; // values in the mock data are strings like "true"/"false"
  hours: string;
  daysOpen: string;
  priceRange: string;
  location: string;
};

export const data = {
  tennisCourts: [
    {
      id: "1",
      name: "Good Ol' Tennis",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://trackandturf.com/wp-content/uploads/2024/07/outdoor-tennis-court-facility-in-the-evening.jpg",
      hasInstructors: "true",
      hours: "8am - 6pm",
      daysOpen: "Everyday",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "2",
      name: "Bougie Tennis Club",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://s42493.pcdn.co/wp-content/uploads/2023/07/courts-scaled.jpg",
      hasInstructors: "true",
      hours: "8am - 8pm",
      daysOpen: "Everyday",
      priceRange: "5",
      location: "Miami, FL",
    },
    {
      id: "3",
      name: "Elite Tennis Club",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.rimonthly.com/content/uploads/2024/09/l/h/s24ec145cur-scaled.jpg",
      hasInstructors: "true",
      hours: "9am - 7pm",
      daysOpen: "Thurs, Fri, Sat",
      priceRange: "3",
      location: "Miami, FL",
    },
    {
      id: "4",
      name: "Johnson Beach Courts",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.royalpalm.com.au/wp-content/uploads/2019/10/image228.jpg",
      hasInstructors: "false",
      hours: "7am - 9pm",
      daysOpen: "Everyday",
      priceRange: "1",
      location: "Miami, FL",
    },
    {
      id: "5",
      name: "Back Counrty Tennis",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.royalpalm.com.au/wp-content/uploads/2019/10/image228.jpg",
      hasInstructors: "false",
      hours: "6am - 10pm",
      daysOpen: "Sat, Sun",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "6",
      name: "Surfside Tennis Club",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://ca-times.brightspotcdn.com/dims4/default/4041e6d/2147483647/strip/true/crop/4032x2688+0+168/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa4%2F36%2Fedca75b8482eb9a9e38b9eac9194%2Fwk-tennis-courts-poi-017.jpg",
      hasInstructors: "false",
      hours: "6am - 10pm",
      daysOpen: "Everyday",
      priceRange: "3",
      location: "Miami, FL",
    },
    {
      id: "7",
      name: "Extreme Backshots Sports Center",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://brownrec.com/images/2019/2/13/Indoor_Tennis_Court.JPG",
      hasInstructors: "true",
      hours: "8am - 5pm",
      daysOpen: "Mon, Tues, Weds, Thurs, Fri, Sat",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "8",
      name: "Gracey Community College Tennis Facilities",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.sportmaster.net/wp-content/uploads/Tennis-Court-Surfaces.jpg",
      hasInstructors: "false",
      hours: "8am - 4pm",
      daysOpen: "Everyday",
      priceRange: "1",
      location: "Miami, FL",
    },
    {
      id: "9",
      name: "Master Shot: Tennis",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://ferandelltenniscourts.com/wp-content/uploads/phone-tc-constr.jpg",
      hasInstructors: "true",
      hours: "10am - 7pm",
      daysOpen: "Mon, Tues, Thurs, Fri, Sat, Sun",
      priceRange: "4",
      location: "Miami, FL",
    },
    {
      id: "10",
      name: "Main Street Sports Complex",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.ljbtc.com/wp-content/uploads/2024/05/LJBTCDRONE-2-1-scaled-1.webp",
      hasInstructors: "true",
      hours: "9am - 6pm",
      daysOpen: "Everyday",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "11",
      name: "City Park Tennis Courts",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://umdrsop.d.umn.edu/sites/rsop.d.umn.edu/files/2022-07/Tennis%20Courts%20Banner.jpg",
      hasInstructors: "falses",
      hours: "9am - 6pm",
      daysOpen: "Everyday",
      priceRange: "1",
      location: "Miami, FL",
    },
    {
      id: "12",
      name: "Alpha Tennis League",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://images.squarespace-cdn.com/content/v1/629f4c87127e7b7053a0f07c/29b3635f-5964-4088-bdd2-2cb33801cded/Laykold+News+supporting+photos_BigVenues_8.jpg",
      hasInstructors: "true",
      hours: "8am - 6pm",
      daysOpen: "Everyday",
      priceRange: "5",
      location: "Miami, FL",
    },
    {
      id: "13",
      name: "Farmville Tennis & Pickle Ball",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://imageio.forbes.com/specials-images/imageserve/667dcf662799c32cc63b1c9f/Games-of-pickleball-on-a-converted-tennis-court--foreground--as-well-as-on-official/0x0.jpg?format=jpg&crop=1201,802,x125,y188,safe&width=960",
      hasInstructors: "true",
      hours: "9am - 9pm",
      daysOpen: "Everyday",
      priceRange: "3",
      location: "Miami, FL",
    },
    {
      id: "14",
      name: "Le Bouge Tennis",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://i.insider.com/55a5164769bedd1c4809cb5c?width=1200&format=jpeg",
      hasInstructors: "true",
      hours: "9am - 9pm",
      daysOpen: "Fri, Sat, Sun",
      priceRange: "5",
      location: "Miami, FL",
    },
    {
      id: "15",
      name: "Johnson Recreations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c4/Universityofbath_indoor_tennis_courts_arp.jpg",
      hasInstructors: "false",
      hours: "7am - 7pm",
      daysOpen: "Everyday",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "16",
      name: "Sophisticated Spa and Gym",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://i.ytimg.com/vi/QM0a8yslP_Q/maxresdefault.jpg",
      hasInstructors: "true",
      hours: "7am - 6pm",
      daysOpen: "Everyday",
      priceRange: "5",
      location: "Miami, FL",
    },
    {
      id: "17",
      name: "Meme Academy College",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.hollywoodreporter.com/wp-content/uploads/2015/12/ucla_tennis_courts.jpg?w=1440&h=810&crop=1",
      hasInstructors: "true",
      hours: "9am - 6pm",
      daysOpen: "Everyday",
      priceRange: "1",
      location: "Miami, FL",
    },
    {
      id: "18",
      name: "Sandy Beach Park",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://localtenniscourtresurfacing.com/wp-content/uploads/2015/11/Tennis-Court-Resurfacing-Phoenix-AZ.jpg",
      hasInstructors: "true",
      hours: "8am - 5pm",
      daysOpen: "Everyday",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "19",
      name: "Remote Recreation and Theater",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.insignia.com/wp-content/uploads/2023/04/French-Open.jpeg",
      hasInstructors: "false",
      hours: "8am - 6pm",
      daysOpen: "Everyday",
      priceRange: "3",
      location: "Miami, FL",
    },
    {
      id: "20",
      name: "Sports Raquet and Tennis Courts",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://s44872.pcdn.co/wp-content/uploads/2024/05/Wimbledon-E0019a-v2-scaled.jpg.optimal.jpg",
      hasInstructors: "false",
      hours: "8am - 8pm",
      daysOpen: "Thurs, Fri, Sat, Sun",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "21",
      name: "Highway Sports Depot",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://trackandturf.com/wp-content/uploads/2024/07/outdoor-tennis-court-facility-in-the-evening.jpg",
      hasInstructors: "true",
      hours: "8am - 6pm",
      daysOpen: "Everyday",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "22",
      name: "Dilinger Tennis Club",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://s42493.pcdn.co/wp-content/uploads/2023/07/courts-scaled.jpg",
      hasInstructors: "false",
      hours: "8am - 8pm",
      daysOpen: "Everyday",
      priceRange: "5",
      location: "Miami, FL",
    },
    {
      id: "23",
      name: "Rivendale Sports Complex",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.rimonthly.com/content/uploads/2024/09/l/h/s24ec145cur-scaled.jpg",
      hasInstructors: "true",
      hours: "9am - 7pm",
      daysOpen: "Mon, Thurs, Fri, Sat",
      priceRange: "3",
      location: "Miami, FL",
    },
    {
      id: "24",
      name: "Shoreline Resort",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.royalpalm.com.au/wp-content/uploads/2019/10/image228.jpg",
      hasInstructors: "true",
      hours: "7am - 9pm",
      daysOpen: "Everyday",
      priceRange: "5",
      location: "Miami, FL",
    },
    {
      id: "25",
      name: "Mountaintop Tennis",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.royalpalm.com.au/wp-content/uploads/2019/10/image228.jpg",
      hasInstructors: "false",
      hours: "6am - 10pm",
      daysOpen: "Mon, Tues, Wed, Thurs, Fri",
      priceRange: "4",
      location: "Miami, FL",
    },
    {
      id: "26",
      name: "Pickle and Racquet Escape",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://ca-times.brightspotcdn.com/dims4/default/4041e6d/2147483647/strip/true/crop/4032x2688+0+168/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa4%2F36%2Fedca75b8482eb9a9e38b9eac9194%2Fwk-tennis-courts-poi-017.jpg",
      hasInstructors: "true",
      hours: "6am - 10pm",
      daysOpen: "Everyday",
      priceRange: "3",
      location: "Miami, FL",
    },
    {
      id: "27",
      name: "Top Spin Sports Complex",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://brownrec.com/images/2019/2/13/Indoor_Tennis_Court.JPG",
      hasInstructors: "true",
      hours: "8am - 5pm",
      daysOpen: "Mon, Tues, Weds, Thurs, Fri, Sat",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "28",
      name: "Party City University - Facilities",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.sportmaster.net/wp-content/uploads/Tennis-Court-Surfaces.jpg",
      hasInstructors: "false",
      hours: "8am - 4pm",
      daysOpen: "Everyday",
      priceRange: "1",
      location: "Miami, FL",
    },
    {
      id: "29",
      name: "Davis Park Recreations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://ferandelltenniscourts.com/wp-content/uploads/phone-tc-constr.jpg",
      hasInstructors: "true",
      hours: "10am - 7pm",
      daysOpen: "Everyday",
      priceRange: "1",
      location: "Miami, FL",
    },
    {
      id: "30",
      name: "Rolling Estates Tennis Courts",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.ljbtc.com/wp-content/uploads/2024/05/LJBTCDRONE-2-1-scaled-1.webp",
      hasInstructors: "true",
      hours: "9am - 6pm",
      daysOpen: "Everyday",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "31",
      name: "Nachos Outdoor Arena and Venue",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.sportmaster.net/wp-content/uploads/Tennis-Court-Surfaces.jpg",
      hasInstructors: "false",
      hours: "8am - 4pm",
      daysOpen: "Everyday",
      priceRange: "3",
      location: "Miami, FL",
    },
    {
      id: "32",
      name: "Tennis Masters Club and Spa",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://ferandelltenniscourts.com/wp-content/uploads/phone-tc-constr.jpg",
      hasInstructors: "true",
      hours: "10am - 7pm",
      daysOpen: "Mon, Tues, Thurs, Fri, Sat",
      priceRange: "4",
      location: "Miami, FL",
    },
    {
      id: "33",
      name: "Good Times Sports Complex",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.ljbtc.com/wp-content/uploads/2024/05/LJBTCDRONE-2-1-scaled-1.webp",
      hasInstructors: "true",
      hours: "9am - 6pm",
      daysOpen: "Everyday",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "34",
      name: "Canes College - Facilities",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://trackandturf.com/wp-content/uploads/2024/07/outdoor-tennis-court-facility-in-the-evening.jpg",
      hasInstructors: "true",
      hours: "8am - 6pm",
      daysOpen: "Everyday",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "35",
      name: "Tight Wad Sports and Leisure",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://s42493.pcdn.co/wp-content/uploads/2023/07/courts-scaled.jpg",
      hasInstructors: "true",
      hours: "8am - 9pm",
      daysOpen: "Everyday",
      priceRange: "5",
      location: "Miami, FL",
    },
    {
      id: "36",
      name: "Kepler Courts and Arena",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.rimonthly.com/content/uploads/2024/09/l/h/s24ec145cur-scaled.jpg",
      hasInstructors: "false",
      hours: "9am - 7pm",
      daysOpen: "Thurs, Fri, Sat",
      priceRange: "3",
      location: "Miami, FL",
    },
    {
      id: "37",
      name: "Knightly Games and Sports",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.royalpalm.com.au/wp-content/uploads/2019/10/image228.jpg",
      hasInstructors: "false",
      hours: "7am - 9pm",
      daysOpen: "Everyday",
      priceRange: "1",
      location: "Miami, FL",
    },
    {
      id: "38",
      name: "X-TREME Tennis",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.royalpalm.com.au/wp-content/uploads/2019/10/image228.jpg",
      hasInstructors: "true",
      hours: "6am - 10pm",
      daysOpen: "Sat, Sun",
      priceRange: "4",
      location: "Miami, FL",
    },
    {
      id: "39",
      name: "Bayside Tennis Club",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://ca-times.brightspotcdn.com/dims4/default/4041e6d/2147483647/strip/true/crop/4032x2688+0+168/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa4%2F36%2Fedca75b8482eb9a9e38b9eac9194%2Fwk-tennis-courts-poi-017.jpg",
      hasInstructors: "false",
      hours: "6am - 10pm",
      daysOpen: "Everyday",
      priceRange: "3",
      location: "Miami, FL",
    },
    {
      id: "40",
      name: "High Ground Sports Center",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://brownrec.com/images/2019/2/13/Indoor_Tennis_Court.JPG",
      hasInstructors: "true",
      hours: "8am - 5pm",
      daysOpen: "Mon, Tues, Weds, Thurs, Fri, Sat",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "41",
      name: "Shots & Passes Tennis League",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://ca-times.brightspotcdn.com/dims4/default/4041e6d/2147483647/strip/true/crop/4032x2688+0+168/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa4%2F36%2Fedca75b8482eb9a9e38b9eac9194%2Fwk-tennis-courts-poi-017.jpg",
      hasInstructors: "true",
      hours: "6am - 10pm",
      daysOpen: "Everyday",
      priceRange: "3",
      location: "Miami, FL",
    },
    {
      id: "42",
      name: "Greatest Tennis Complex",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://brownrec.com/images/2019/2/13/Indoor_Tennis_Court.JPG",
      hasInstructors: "true",
      hours: "8am - 5pm",
      daysOpen: "Mon, Tues, Weds, Thurs, Fri, Sat",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "43",
      name: "Rascal Pickle ball and Tennis",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.sportmaster.net/wp-content/uploads/Tennis-Court-Surfaces.jpg",
      hasInstructors: "false",
      hours: "8am - 4pm",
      daysOpen: "Everyday",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "44",
      name: "Bulter County Park Recreations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://ferandelltenniscourts.com/wp-content/uploads/phone-tc-constr.jpg",
      hasInstructors: "true",
      hours: "10am - 7pm",
      daysOpen: "Everyday",
      priceRange: "1",
      location: "Miami, FL",
    },
    {
      id: "45",
      name: "Backhand Tennis Courts",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.ljbtc.com/wp-content/uploads/2024/05/LJBTCDRONE-2-1-scaled-1.webp",
      hasInstructors: "false",
      hours: "9am - 6pm",
      daysOpen: "Everyday",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "46",
      name: "Spicey Tennis Club",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.sportmaster.net/wp-content/uploads/Tennis-Court-Surfaces.jpg",
      hasInstructors: "false",
      hours: "8am - 4pm",
      daysOpen: "Mon, Tues, Thurs",
      priceRange: "3",
      location: "Miami, FL",
    },
    {
      id: "47",
      name: "Panthers Tennis League",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://ferandelltenniscourts.com/wp-content/uploads/phone-tc-constr.jpg",
      hasInstructors: "true",
      hours: "10am - 7pm",
      daysOpen: "Mon, Tues, Thurs, Fri, Sat",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "48",
      name: "Sportsmen Community Rentals",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://www.ljbtc.com/wp-content/uploads/2024/05/LJBTCDRONE-2-1-scaled-1.webp",
      hasInstructors: "true",
      hours: "9am - 6pm",
      daysOpen: "Everyday",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "49",
      name: "Nerd University",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://trackandturf.com/wp-content/uploads/2024/07/outdoor-tennis-court-facility-in-the-evening.jpg",
      hasInstructors: "true",
      hours: "10am - 6pm",
      daysOpen: "Mon, Tues, Weds, Thurs",
      priceRange: "2",
      location: "Miami, FL",
    },
    {
      id: "50",
      name: "Action Sports",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://s42493.pcdn.co/wp-content/uploads/2023/07/courts-scaled.jpg",
      hasInstructors: "true",
      hours: "9am - 5pm",
      daysOpen: "Everyday",
      priceRange: "4",
      location: "Miami, FL",
    },
  ],
};
