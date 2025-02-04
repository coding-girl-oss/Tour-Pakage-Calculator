import React, { useEffect } from "react";
import bg from "/bg.jpg";
import Home2 from "../components/Home2";
import Typed from "typed.js";

const Home = () => {
  useEffect(() => {
    const element = document.querySelector(".typed");
    if (!element) return; 

    const typed = new Typed(element, {
      strings: ["Calculate Your Tour Package Now"],
      typeSpeed: 150,
      backSpeed: 25,
      loop: true,
    
    });

    return () => typed.destroy();
  }, []);

  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 to-black/70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center pt-20 h-full text-center text-white">
          <span className="text-5xl font-extrabold uppercase typed"></span>
          <p className="text-1xl italic font-semibold">
            Easily calculate and customize your tour packages with our simple tool. Get started now!
          </p>

          <button className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-purple-600 rounded-full shadow-lg hover:opacity-90 transition">
            Start Calculating →
          </button>
        </div>
      </div>
      <Home2 />
    </>
  );
};

export default Home;
