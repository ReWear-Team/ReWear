const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ Final selling price
    price: {
      type: Number,
      required: true,
    },

    // ✅ Original price (MRP)
    originalPrice: {
    type: Number,
    required: true,
<<<<<<< HEAD
  },
  condition: {
    type: String,
    enum: ['New', 'Good', 'Worn'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    enum: ['swap', 'points'],
    default: 'swap',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Swapped'],
    default: 'Available',
  },
  featured: {
    type: Boolean,
    default: true  
  },
}, { timestamps: true });
=======
    },

    // ✅ Flexible size (XS, 32, 9, One Size)
    size: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Tops",
        "Pants",
        "Shoes",
        "Bags",
        "Watches",
        "Jewelry",
        "Accessories",
      ],
      required: true,
    },
>>>>>>> f4da854 (Add Some Features)

    condition: {
      type: String,
      enum: ["New", "Like New", "Good", "Used"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ✅ Sale status
    status: {
      type: String,
      enum: ["Available", "Sold", "Pending"],
      default: "Available",
    },

    // ✅ Who bought it
    soldTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // ✅ Featured section
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
