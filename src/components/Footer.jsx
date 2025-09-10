import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 py-4 mt-10 text-center">
      <h2 className="text-lg font-bold text-white">
        <span className="text-green-500">&lt;</span>
        PassOP
        <span className="text-green-500">/&gt;</span>
      </h2>
      <p className="text-sm text-gray-400 mt-1">
        © {new Date().getFullYear()} PassOP. Built by Md Asif Ali.
      </p>
    </footer>
  );
};

export default Footer;
