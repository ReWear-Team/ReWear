// server/seed/seedDemoItems.js
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const dbConnect = require('../config/db'); // adjust path if needed
const Item = require('../models/Item');

async function run() {
  try {
    await dbConnect(); // or import and call your DB connect method
    console.log('DB connected');

    // Demo items - edit/expand categories / sizes as you like
    const demoProducts = [
      {
        title: "Men's Denim Jacket",
        description: "High-quality blue denim jacket with slight wear on cuffs.",
        category: "Men",
        size: "L",
        condition: "Good",
        images: ["https://via.placeholder.com/600x800?text=Denim+Jacket"]
      },
      {
        title: "Women's Floral Dress",
        description: "Light summer dress - worn once, excellent condition.",
        category: "Women",
        size: "M",
        condition: "Like New",
        images: ["https://via.placeholder.com/600x800?text=Floral+Dress"]
      },
      {
        title: "Unisex Hoodie",
        description: "Soft cotton hoodie, warm and comfy.",
        category: "Unisex",
        size: "XL",
        condition: "Excellent",
        images: ["https://via.placeholder.com/600x800?text=Hoodie"]
      },
      {
        title: "Black Leather Belt",
        description: "Genuine leather belt, classic style.",
        category: "Accessories",
        size: "One Size",
        condition: "Good",
        images: ["https://via.placeholder.com/600x800?text=Belt"]
      },
      {
        title: "Kids Printed T-Shirt",
        description: "Colorful tee for kids, bright prints.",
        category: "Kids",
        size: "S",
        condition: "Excellent",
        images: ["https://via.placeholder.com/600x800?text=Kids+Tshirt"]
      }
    ];

    // Number of demo items to add (repeat demoProducts if needed)
    const COUNT = Number(process.argv[2]) || 20;
    const toInsert = [];
    for (let i = 0; i < COUNT; i++) {
      const base = demoProducts[i % demoProducts.length];
      toInsert.push({
        ...base,
        title: `${base.title} — Demo #${i + 1}`,
        createdAt: new Date()
      });
    }

    const res = await Item.insertMany(toInsert);
    console.log(`Inserted ${res.length} demo items`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
