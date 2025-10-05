import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-[50vh] bg-black text-white flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-300 max-w-2xl text-center leading-relaxed">
        Have questions about exoplanet data, feature requests, or collaboration ideas? Reach out to the team and we'll get back to you.
      </p>
      <div className="mt-8 text-sm text-gray-500">
        (Add a real contact form or email later.)
      </div>
    </div>
  );
};

export default Contact;
