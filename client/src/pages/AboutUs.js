import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto pt-28 px-6">
      <h1 className="text-4xl font-bold text-gray-900">About Re-Wear</h1>
      <p className="text-gray-600 mt-4 text-lg leading-relaxed">
        Re-Wear is a sustainable fashion marketplace where people sell
        pre-loved clothing instead of throwing them away.  
        <br /><br />
        Our mission is simple:  
        <strong>Reduce waste, promote reuse, and make fashion accessible for everyone.</strong>
      </p>

      <h2 className="text-2xl font-semibold mt-10">Why We Exist</h2>
      <p className="text-gray-600 mt-3 leading-relaxed">
        Millions of clothes end up in landfills every year. We want to change that by building a platform
        where users can buy, sell, and share fashion responsibly.
      </p>

      <h2 className="text-2xl font-semibold mt-10">Our Values</h2>
      <ul className="list-disc ml-6 text-gray-600 mt-3 space-y-2">
        <li>Sustainability</li>
        <li>Affordability</li>
        <li>Community Driven</li>
        <li>Quality over quantity</li>
      </ul>
    </div>
  );
};

export default AboutUs;
