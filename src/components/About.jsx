import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-green-800 mb-6">&lt;PassOP/&gt; About</h1>
      <div className="bg-white shadow-md rounded-xl p-8 max-w-3xl w-11/12 border border-green-200">
        <p className="text-gray-700 text-lg leading-relaxed">
          <span className="font-bold text-green-700">PassOP</span> is your personal password
          manager that helps you store and manage your credentials securely.  
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          With PassOP, you can save website URLs, usernames, and passwords
          in one place without worrying about losing them.  
          It is built to be simple, fast, and secure.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          This project was created by <span className="font-semibold text-green-700">Md Asif Ali</span>, 
          a developer passionate about building modern, user-friendly, and impactful applications.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          The goal is to demonstrate how modern web technologies like 
          <span className="font-semibold"> React</span> and 
          <span className="font-semibold"> Tailwind CSS</span> 
          can be used to build practical tools that solve real-world problems.
        </p>
      </div>
    </div>
  );
};

export default About;
