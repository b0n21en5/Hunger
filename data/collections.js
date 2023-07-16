import col1 from "../src/assets/col-1.avif";
import col2 from "../src/assets/col-2.avif";
import col3 from "../src/assets/col-3.avif";
import col4 from "../src/assets/col-4.avif";
import col5 from "../src/assets/col-5.avif";
import col6 from "../src/assets/col-6.avif";

import dn1 from "../src/assets/dining/dn-1.avif";
import dn2 from "../src/assets/dining/dn-2.avif";
import dn3 from "../src/assets/dining/dn-3.avif";
import dn4 from "../src/assets/dining/dn-4.avif";

export const collections = [
  {
    id: 1,
    title: "Unique Dining Experiences",
    slug: "unique-dining-experiences",
    places: 10,
    img: col1,
    desc: "From relishing meals in a luxury train coach to sipping cocktails in a revolving restaurant, these places promise indelible experiences.",
  },
  {
    id: 2,
    title: "Best Insta-worthy Places",
    slug: "best-insta-worthy-places",
    places: 21,
    img: col2,
    desc: "We've curated the best Instagrammable places to help you build a picture-perfect feed!",
  },
  {
    id: 3,
    title: "Celeb-loved Places",
    slug: "celeb-loved-places",
    places: 10,
    img: col3,
    desc: "Discover top-notch spots in the city that your beloved celebrities can't get enough of.",
  },
  {
    id: 4,
    title: "Newly Opened Restaurants",
    slug: "newly-opened-resturants",
    places: 17,
    img: col4,
    desc: "Chic newcomers bringing a gush of newness and aroma of deliciousness. Updated every Thursday!",
  },
  {
    id: 5,
    title: "Lit Party Place",
    slug: "lit-party-place",
    places: 21,
    img: col5,
    desc: "Groove to the rhythm of Delhi's vibrant nightlife with spots made for moments after sundown.",
  },
  {
    id: 6,
    title: "Finest Microbrewaries",
    slug: "finest-microbrewaries",
    places: 18,
    img: col6,
    desc: "For the times when bottled brews just do not cut it!",
  },
];

export const uniqueDining = [
  {
    id: 1,
    title: "MIE Robolucious The Family Restaurant",
    slug: "mie-robolucious-the-family-restaurant",
    rating: 3.6,
    type: "North Indian, Chinese, Mexican, Italian, Coffee, Desserts, Beverages",
    loca: "Hajipur, Noida",
    imgSrc: dn1,
  },
  {
    id: 2,
    title: "I Sacked Newton",
    slug: "i-sacked-newton",
    rating: 4.1,
    type: "North Indian, Chinese, Continental, Mediterranean, Biryani, Oriental, Thai, Fast Food",
    loca: "Advant Navis Business Park, Noida",
    imgSrc: dn2,
  },
  {
    id: 3,
    title: "Orient Express - Taj Palace",
    slug: "orient-express-taj-palace",
    rating: 4.7,
    type: "European, Seafood, Desserts",
    loca: "Taj Palace, Chanakyapuri, New Delhi",
    imgSrc: dn3,
  },
  {
    id: 4,
    title: "Parikrama - The Revolving Restaurant",
    slug: "parikrama-the-revolving-restaurant",
    rating: 3.9,
    type: "North Indian, Chinese, Italian, Continental, Beverages, Desserts",
    loca: "Connaught Place, New Delhi",
    imgSrc: dn4,
  },
];
