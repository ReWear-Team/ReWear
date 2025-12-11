import React from "react";

const HowItWorks = () => {
  return (
    <div className="pt-28 px-6 max-w-5xl mx-auto">

      <h1 className="text-4xl font-bold text-gray-900 text-center">
        How Re–Wear Works 👗♻️
      </h1>

      <p className="text-center text-gray-500 mt-3">
        Buy, sell, and reuse fashion — sustainably and easily.
      </p>

      <div className="grid md:grid-cols-3 gap-10 mt-14">

        <div className="bg-white p-8 rounded-2xl shadow text-center hover:shadow-lg transition">
          <div className="text-5xl mb-4">📸</div>
          <h3 className="text-xl font-semibold">Upload Items</h3>
          <p className="text-gray-500 mt-2">
            List unused clothes, accessories, or shoes in minutes.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow text-center hover:shadow-lg transition">
          <div className="text-5xl mb-4">🛍️</div>
          <h3 className="text-xl font-semibold">Browse & Buy</h3>
          <p className="text-gray-500 mt-2">
            Explore thousands of unique reused fashion pieces.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow text-center hover:shadow-lg transition">
          <div className="text-5xl mb-4">♻️</div>
          <h3 className="text-xl font-semibold">Reuse & Save</h3>
          <p className="text-gray-500 mt-2">
            Reduce waste and support sustainable fashion.
          </p>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;
