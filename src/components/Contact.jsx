import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-green-800 mb-6">&lt;PassOP/&gt; Contact</h1>
      <div className="bg-white shadow-md rounded-xl p-8 max-w-2xl w-11/12 border border-green-200">
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Have questions, feedback, or ideas? Feel free to reach out!
        </p>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            rows="4"
            placeholder="Write your message..."
            className="border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
          <button
            type="submit"
            className="bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
