import React, { useEffect } from "react";
import AOS from "aos";
import hand from '/hand.png'
import download from '/download.png'
import calculator from '/calculator.png'
import "aos/dist/aos.css";
const Home2 = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
      }, []);
    
  const features = [
    {
       
      title: " Customizable Packages",
      desc: " Add and choose your hotels and services to create the best tour package for you.",
    },
    {
    
      title: "Real-Time Calculations",
      desc: "Get instant total price as you add and modify your package details.",
    },
    {
      
      title: "Easy PDF Download",
      desc: "Once you're done, easily download or print your tour package details in a PDF format.",
    },
  ];
  const uses=[
    {
        img: hand,
        title : ' Step 1: Choose Your Options',
        desc : 'Select hotels, services, and other details that will make your tour unique.'
    },
    {
        img: calculator,
        title : 'Step 2: Calculate Price',
        desc : 'Get instant pricing and adjust your options until you are happy with the total.'
    },
    {
        img: download,
        title : 'Step 3: Download or Print',
        desc : 'Once you are done, easily download or print your tour package details in a PDF format'
    },
  ]
  return (
    <>
      <div className="min-h-[300px] max-w-[90vw]  mx-auto">
        <h1 className="text-5xl text-purple-950 text-center mt-4 font-extrabold uppercase">
          OUR FEATURES
        </h1>
        <div className="flex flex-wrap gap-20 mt-10 max-w-[90vw]  mx-auto">
          {features.map((feature, index) => (
            <div
            data-aos='flip-up'
              key={index}
              className="min-h-40 min-w-80 max-w-80 bg-gradient-to-tl flex flex-col gap-3 rounded-lg border-[2px] border-white hover:scale-105 hover:shadow-purple-950 from-purple-500 hover:shadow-xl transition-transform to-purple-900"
            >
              <h1 className="text-white text-center text-2xl font-bold pt-3">
                {feature.title}
              </h1>
              <p className="text-white text-center px-2">{feature.desc} </p>
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-300px max-w-[90vw] mx-auto mt-10 mb-10" >
      <h1 className="text-5xl text-purple-950 text-center mt-4 font-extrabold uppercase">
      How TO USE
        </h1>
        <div className="flex flex-wrap gap-20 mt-10 max-w-[90vw]  mx-auto">
            {uses.map((use,index)=>(
        <div key={index}
           
              className="card card-compact mt-4 bg-purple-200 border-[2px] border-purple-950 hover:-translate-y-4 transition-transform max-h-[400px] w-80 shadow-xl relative overflow-hidden"
              data-aos="fade-right"
             
            >
              <figure className="w-full h-64 relative">
                <img
                  src={use.img}
                  className="h-40 w-40 transition-all duration-300"
                 
                />
                <div className="absolute inset-0 bg-purple-950 bg-opacity-50  text-white opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
                  <h2 className="text-2xl text-center font-bold mt-20">
                  {use.title}
                  </h2>
                  <p className="text-center">{use.desc}</p>
                </div>
              </figure>
            </div>

            ))}
        </div>
      </div>
    </>
  );
};

export default Home2;
