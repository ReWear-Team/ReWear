const mongoose = require("mongoose");
const Item = require("../models/Item"); // update path if needed

const demoItems = [
  {
    title: "Vintage Levi’s 501 Jeans",
    size: "M",
    category: "Clothing",
    points: 120,
    price: 45,
    imageUrl: "/uploads/demo-jeans.jpg",
  },
  {
    title: "Nike Air Max 90 White",
    size: "42",
    category: "Shoes",
    points: 300,
    price: 85,
    imageUrl: "/uploads/demo-nike.jpg",
  },
  {
    title: "Chanel Classic Flap Bag",
    size: "L",
    category: "Bags",
    points: 800,
    price: 2800,
    imageUrl: "/uploads/demo-chanel.jpg",
  },
  {
    title: "Beige Winter Coat",
    size: "L",
    category: "Clothing",
    points: 250,
    price: 120,
    imageUrl: "/uploads/demo-coat.jpg",
  },
  {
    title: "Designer Silk Scarf",
    size: "M",
    category: "Accessories",
    points: 80,
    price: 95,
    imageUrl: "/uploads/demo-scarf.jpg",
  },
  {
    title: "Minimalist Silver Watch",
    size: "One Size",
    category: "Watches",
    points: 500,
    price: 180,
    imageUrl: "/uploads/demo-watch.jpg",
  },
  {
    title: "Adidas Stan Smith",
    size: "40",
    category: "Shoes",
    points: 200,
    price: 55,
    imageUrl: "/uploads/demo-adidas.jpg",
  },
  {
    title: "Women’s Hoodie - White",
    size: "L",
    category: "Clothing",
    points: 150,
    price: 45,
    imageUrl: "/uploads/demo-hoodie.jpg",
  },
  {
    title: "T-shirt - Mint Green",
    size: "M",
    category: "Clothing",
    points: 90,
    price: 25,
    imageUrl: "/uploads/demo-tshirt.jpg",
  },
  {
    title: "Lehenga Choli – Peach",
    size: "L",
    category: "Clothing",
    points: 250,
    price: 180,
    imageUrl: "/uploads/demo-lehenga.jpg",
  }
];

// Insert demo items
async function seed() {
  try {
    await mongoose.connect("mongodb+srv://<YOUR_URI>", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Connected ✔");

    await Item.deleteMany({});
    console.log("Existing items cleared.");

    await Item.insertMany(demoItems);
    console.log("Demo items added ✔");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
