import f1 from "../src/assets/foods/f-1.avif";
import f2 from "../src/assets/foods/f-2.avif";
import f3 from "../src/assets/foods/f-3.avif";
import f4 from "../src/assets/foods/f-4.avif";
import f5 from "../src/assets/foods/f-5.avif";
import f6 from "../src/assets/foods/f-6.avif";

import pizza from "../src/assets/inspiration/pizza.avif";
import dosa from "../src/assets/inspiration/dosa.avif";
import biriyani from "../src/assets/inspiration/biriyani.avif";
import burger from "../src/assets/inspiration/burger.avif";
import paratha from "../src/assets/inspiration/paratha.avif";
import thali from "../src/assets/inspiration/thali.avif";

import b1 from "../src/assets/brands/b-1.avif";
import b2 from "../src/assets/brands/b-2.avif";
import b3 from "../src/assets/brands/b-3.avif";
import b4 from "../src/assets/brands/b-4.avif";
import b5 from "../src/assets/brands/b-5.avif";
import b6 from "../src/assets/brands/b-6.avif";

export const foods = [
  {
    id: 1,
    title: "SashMick's Bakery",
    type: "Bakery, Desserts",
    rating: 4.0,
    price: 400,
    imgSrc: f1,
  },
  {
    id: 2,
    title: "Dhading KTM",
    type: "Chinese, Fast Food, Burger, Rolls",
    rating: 4.2,
    price: 300,
    imgSrc: f2,
  },
  {
    id: 3,
    title: "The Pizza Kings",
    type: "Pizza, Fast Food, Shake",
    rating: 3.8,
    price: 120,
    imgSrc: f3,
  },
  {
    id: 4,
    title: "Chai Point",
    type: "Tea, Coffee, Beverages, Shake, Fast Food, Rolls, Desserts",
    rating: 3.9,
    price: 250,
    imgSrc: f4,
  },
  {
    id: 5,
    title: "Saravana Bhavan",
    type: "South Indian, Desserts, Juices, Shake, Beverages",
    rating: 4.3,
    price: 580,
    imgSrc: f5,
  },
  {
    id: 6,
    title: "Chaayos Chai+Snacks=Relax",
    type: "Tea, Fast Food, Cafe, Beverages, Rolls, Coffee",
    rating: 3.7,
    price: 129,
    imgSrc: f6,
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

export const brands = [
  {
    id: 1,
    title: "McDonald's",
    img: b1,
  },
  {
    id: 2,
    title: "Domino's Pizza",
    img: b2,
  },

  {
    id: 3,
    title: "Burger King",
    img: b3,
  },
  {
    id: 4,
    title: "KFC",
    img: b4,
  },
  {
    id: 5,
    title: "Subway",
    img: b5,
  },
  {
    id: 6,
    title: "Pind Balluchi",
    img: b6,
  },
];
