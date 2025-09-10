import { faker } from "@faker-js/faker";
import type { Court } from "../utils/types";

const images = [
  "https://tenniscourtsuk.co.uk/images/1920/11689034/Pickleball-Main.jpg",
  "https://shalomaustin.org/wp-content/uploads/2022/01/tennis-blue-court__600-x-400.jpg",
  "https://www.derby.gov.uk/news/media/derbycitycouncil/content/images/news/sport/tennis-courts-alvaston-resized.jpg",
  "https://claycourtservices.com/wp-content/uploads/2022/05/Untitled-26.jpg",
  "https://en.reformsports.com/oxegrebi/2020/08/tenis-kortunda-zemin-secimi-nasil-yapilir.jpg",
  "https://ca-times.brightspotcdn.com/dims4/default/1257c52/2147483647/strip/true/crop/3940x2627+0+164/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc9%2Fea%2Fcab9ace3427c91e83c2af1537230%2Fwk-tennis-courts-poi-011.jpg",
];

export const getCourts = (count = 50): Court[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `${faker.company.name()} Courts`,
    address: faker.location.streetAddress({ useFullAddress: true }),
    courtCount: faker.number.int({ min: 2, max: 12 }),
    setting: faker.helpers.arrayElement(["Outdoor", "Indoor"]),
    rating: faker.number.float({ min: 3, max: 5 }),
    ratingCount: faker.number.int({ min: 10, max: 500 }),
    imageUrl: images[i % images.length],
    buildLabel: faker.helpers.arrayElement([
      "Build None",
      "Renovated",
      "New Facility",
    ]),
  }));
};
