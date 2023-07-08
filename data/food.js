import f1 from "../src/assets/f-1.avif";
import f2 from "../src/assets/f-2.avif";
import f3 from "../src/assets/f-3.avif";

import pizza from "../src/assets/inspiration/pizza.avif";
import dosa from "../src/assets/inspiration/dosa.avif";
import biriyani from "../src/assets/inspiration/biriyani.avif";
import burger from "../src/assets/inspiration/burger.avif";
import paratha from "../src/assets/inspiration/paratha.avif";
import thali from "../src/assets/inspiration/thali.avif";

export const foods = [
  {
    id: 1,
    title: "SashMick's Bakery",
    type: "Bakery, Desserts",
    rating: 4.0,
    price: 100,
    imgSrc: f1,
  },
  {
    id: 2,
    title: "Dhading KTM",
    type: "Chinese, Fast Food, Burger, Rolls",
    rating: 4.2,
    price: 100,
    imgSrc: f2,
  },
  {
    id: 3,
    title: "The Pizza Kings",
    type: "Pizza, Fast Food, Shake",
    rating: 3.8,
    price: 100,
    imgSrc: f3,
  },
];

export const inspirations = [
  {
    id: 1,
    title: "Pizza",
    img: pizza,
  },
  {
    id: 6,
    title: "Paratha",
    img: paratha,
  },

  {
    id: 3,
    title: "Burger",
    img: burger,
  },
  {
    id: 4,
    title: "Biriyani",
    img: biriyani,
  },
  {
    id: 5,
    title: "Thali",
    img: thali,
  },
  {
    id: 2,
    title: "Dosa",
    img: dosa,
  },
];
