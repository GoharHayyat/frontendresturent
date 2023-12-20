import food1 from "./assets/food1.png"
import food2 from "./assets/food2.png"
import food3 from "./assets/food3.png"
import karahi from "./assets/karahi.jpg"
import burgers from "./assets/burgers.jpg"
import Rice from "./assets/rice.jpg"
import Pizza from "./assets/Pizza.jpg"
import Desserts from "./assets/Desserts.jpg"
import salad from "./assets/salad.jpg"

export const demiProducts=[
    {
      title : "Trending Products",
      products:[
        {
          _id : 1,
          name:"A Chair",
          price:400,
          stars:5,
          category:"Chairs",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/portable-fixtures-furniture-wall-rack-small-shelf-23966566023352.jpg?v=1662961075"]
        },
        {
          _id : 2,
          name:"Another Chair",
          price:480,
          stars:2.7,
          category:"Chairs",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/portable-fixtures-furniture-wall-rack-small-shelf-23966566023352.jpg?v=1662961075"]
        },
        {
          _id : 3,
          name:"One More Chair",
          price:430,
          stars:1.2,
          category:"Chairs",
  
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/portable-fixtures-furniture-wall-rack-small-shelf-23966566023352.jpg?v=1662961075"]
        },
        {
          _id : 4,
          name:"Guess what? A Chairfoielriojgiopefjeiojrpfj",
          price:900,
          stars:4.4,
          category:"Chairs",
  
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/portable-fixtures-furniture-wall-rack-small-shelf-23966566023352.jpg?v=1662961075"]
        },
        {
          _id : 9,
          name:"A Chair",
          price:400,
          stars:5,
          category:"Chairs",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/portable-fixtures-furniture-wall-rack-small-shelf-23966566023352.jpg?v=1662961075"]
        },
      ]
    },
    {
      title : "Featured Products",
      products:[
        {
          _id : 5,
          name:"A Bed",
          price:400,
          stars:3.3,
          category:"Beds",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/beds-furniture-james-bed-19879632011425.jpg?v=1662961602"]
        },
        {
          _id : 6,
          name:"Another Bed",
          price:480,
          stars:5,
          category:"Beds",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/beds-furniture-james-bed-19879632011425.jpg?v=1662961602"]
        },
        {
          _id : 7,
          name:"One More Bed",
          price:430,
          stars:0,
          category:"Beds",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/beds-furniture-james-bed-19879632011425.jpg?v=1662961602"]
        },
        {
          _id : 8,
          name:"Guess what? A Bed",
          price:900,
          stars:3,
          category:"Beds",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/beds-furniture-james-bed-19879632011425.jpg?v=1662961602"]
        },
        {
          _id : 10,
          name:"Guess what? A Bed",
          price:900,
          stars:3,
          category:"Beds",
          imageLinks:["https://cdn.shopify.com/s/files/1/0429/7654/2881/products/beds-furniture-james-bed-19879632011425.jpg?v=1662961602"]
        },
      ]
    }
  ]

  
  export const categoryData = [
    {
        id:0,
        name:"Karahi",
        img:karahi,
        gridLoc:"row-span-1 row-start-1"
    },
    {
        id:1,
        name:"Burgers",
        img:burgers,
        gridLoc:"row-span-1 row-start-2"
    },{
        id:2,
        name:"Rice",
        img:Rice,
        gridLoc:"row-span-2 col-start-2"
    },{
        id:3,
        name:"Pizza",
        img:Pizza,
        gridLoc:"col-span-2 row-start-3 md:row-start-1 md:col-start-3"
    },{
        id:4,
        name:"Desserts",
        img:Desserts,
        gridLoc:"col-start-1 row-start-4 md:col-start-3 md:row-start-2"
    },{
        id:5,
        name:"Others",
        img:salad,
        gridLoc:"col-start-2 row-start-4 md:col-start-4 md:row-start-2"
    },
]

export const sliderItems = [
  {
      id:1,
      img: food1,
      title:"Where Taste Knows No Bounds",
      desc: "Gourmet Thrills, Zero Waits – Your Culinary Adventure Starts Now!",
      bg:'f5fafd',
      circleCol:"95c1db"

  },
  {
      id:2,
      img: food2,
      title:"Perfection Meets Palate",
      desc: "WHY WAIT WHEN YOU CAN GET ANY THING IN ONE CLICK. NEVER COMPROMISE!",
      bg:'fcf1ed',
      circleCol:"f5ab90"
  },
  {
      id:3,
      img: food3,
      title:"The Epitome of Flavor",
      desc: "Elevate Your Tastebuds Instantly – No Compromises, Only Culinary Perfection!",
      bg:'fbf0f4',
      circleCol:"e6779f"

  }
]
