const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-28 px-6 bg-[#f7f3f0]">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 space-y-8">

        <h1 className="text-4xl font-bold text-[#2a1e18]">
          Privacy Policy
        </h1>

        <p className="text-gray-600">
          Your privacy is important to us. This policy explains how Re-Wear
          collects, uses, and protects your information.
        </p>

        <Section
          title="Information We Collect"
          text="We collect your name, email, and account details to provide a smooth experience."
        />

        <Section
          title="How We Use Your Information"
          list={[
            "Create and manage accounts",
            "Communicate with users",
            "Improve our services",
          ]}
        />

        <Section
          title="Data Protection"
          text="We use modern security practices and encrypted storage to safeguard your data."
        />

        <div className="bg-[#f7f3f0] rounded-xl p-6 text-gray-700">
          Questions? Contact us at{" "}
          <span className="font-medium text-[#d46b4a]">
            support@rewear.com
          </span>
        </div>

      </div>
    </div>
  );
};

const Section = ({ title, text, list }) => (
  <div>
    <h2 className="text-2xl font-semibold text-[#2a1e18] mb-2">{title}</h2>
    {text && <p className="text-gray-600">{text}</p>}
    {list && (
      <ul className="list-disc ml-6 text-gray-600 space-y-1">
        {list.map(i => <li key={i}>{i}</li>)}
      </ul>
    )}
  </div>
);

export default PrivacyPolicy;
