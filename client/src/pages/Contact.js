import { FiMail, FiClock, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="min-h-screen pt-28 px-6 bg-[#faf7f5]">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#3b2a23] mb-3">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Have questions, feedback, or need help with an order?  
            We’re here to help you every step of the way.
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <InfoCard
            icon={<FiMail />}
            title="Email Us"
            value="support@rewear.com"
          />
          <InfoCard
            icon={<FiClock />}
            title="Support Hours"
            value="Mon – Sat, 10am – 6pm"
          />
          <InfoCard
            icon={<FiMapPin />}
            title="Location"
            value="India (Remote Team)"
          />
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white rounded-2xl shadow p-8 max-w-3xl">
          <h2 className="text-2xl font-semibold text-[#3b2a23] mb-6">
            Send us a message
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d46b4a]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d46b4a]"
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d46b4a]"
            />

            <button
              type="button"
              className="bg-[#d46b4a] hover:bg-[#bf5839] text-white px-6 py-3 rounded-lg font-medium"
              onClick={() => alert("Message feature coming soon 🚀")}
            >
              Send Message
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-4">
            * Messaging system will be enabled soon.
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
    <div className="text-[#d46b4a] text-2xl">{icon}</div>
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

export default Contact;
