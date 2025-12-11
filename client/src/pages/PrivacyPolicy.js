import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto pt-28 px-6">
      <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>

      <p className="text-gray-600 mt-4 leading-relaxed">
        Your privacy is important to us. This policy explains how Re-Wear collects,
        uses, and protects your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-8">Information We Collect</h2>
      <p className="text-gray-600 mt-2 leading-relaxed">
        We collect your name, email, and account details to provide a smooth user experience.
      </p>

      <h2 className="text-2xl font-semibold mt-8">How We Use Your Information</h2>
      <ul className="list-disc ml-6 text-gray-600 mt-3 space-y-2">
        <li>To create and manage accounts.</li>
        <li>To communicate with you.</li>
        <li>To improve our services.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">Data Protection</h2>
      <p className="text-gray-600 mt-2">
        We use modern security tools and encrypted storage to safeguard your data.
      </p>

      <p className="text-gray-500 mt-10">
        If you have any questions, contact us at support@rewear.com
      </p>
    </div>
  );
};

export default PrivacyPolicy;
