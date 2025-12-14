const AboutUs = () => {
  return (
    <div className="min-h-screen pt-28 px-6 bg-[#f7f3f0]">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 space-y-10">

        <section>
          <h1 className="text-4xl font-bold text-[#2a1e18] mb-3">
            About Re-Wear
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Re-Wear is a sustainable fashion marketplace where people give
            pre-loved clothing a second life instead of throwing it away.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <Card
            title="Our Mission"
            text="Reduce waste, promote reuse, and make fashion affordable for everyone."
          />
          <Card
            title="Why We Exist"
            text="Millions of clothes end up in landfills every year. We’re here to change that."
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#2a1e18] mb-4">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {["Sustainability", "Affordability", "Community Driven", "Quality over Quantity"].map(v => (
              <div key={v} className="bg-[#f7f3f0] rounded-lg px-4 py-3 text-gray-700">
                ✔ {v}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

const Card = ({ title, text }) => (
  <div className="bg-[#f7f3f0] rounded-xl p-6">
    <h3 className="font-semibold text-lg text-[#2a1e18] mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </div>
);

export default AboutUs;
