import React from 'react';
import { CITY_IMAGES, FOOD_IMAGES } from '../constants';

const VisualGallery: React.FC = () => {
  const destinations = [
    {
      id: 1,
      name: "Agadir",
      image: CITY_IMAGES["Agadir"],
      subtext: "The Pearl of the South"
    },
    {
      id: 2,
      name: "Marrakech",
      image: CITY_IMAGES["Marrakech"],
      subtext: "The Red City"
    },
    {
      id: 3,
      name: "Casablanca",
      image: CITY_IMAGES["Casablanca"],
      subtext: "White City of Romance"
    }
  ];

  const foods = [
    {
      id: 1,
      name: "Classic Tagine",
      image: FOOD_IMAGES["Tagine"],
      subtext: "Slow-cooked savory stews"
    },
    {
      id: 2,
      name: "Royal Couscous",
      image: FOOD_IMAGES["Couscous"],
      subtext: "The Friday tradition"
    },
    {
      id: 3,
      name: "Mint Tea",
      image: FOOD_IMAGES["Mint Tea"],
      subtext: "Symbol of hospitality"
    }
  ];

  return (
    <section className="py-24 bg-[#F9F7F2]">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 space-y-32">
        
        {/* Destinations Section */}
        <div>
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-serif text-[#0F2C59] mb-6">Destinations</h2>
             <div className="w-24 h-1 bg-[#C2B280] mx-auto rounded-full"></div>
             <p className="mt-6 text-slate-600 font-medium text-lg max-w-2xl mx-auto font-serif italic">
               Explore the diverse landscapes of the Kingdom, from the Atlantic coast to the vibrant imperial cities.
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {destinations.map((dest) => (
              <div key={dest.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[8px] shadow-2xl shadow-[#0F2C59]/10 aspect-[3/4] mb-8 bg-slate-200">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = CITY_IMAGES.Default;
                    }}
                  />
                  <div className="absolute inset-0 bg-[#0F2C59]/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-[#0F2C59] to-transparent">
                     <span className="text-white font-serif italic text-sm">Explore {dest.name} &rarr;</span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-serif text-[#0F2C59] mb-2">{dest.name}</h3>
                  <p className="text-[#C2B280] font-bold uppercase tracking-widest text-xs">{dest.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to Eat Section */}
        <div>
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 border-b border-[#C2B280]/30 pb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#0F2C59] mb-4">Culinary Delights</h2>
                 <div className="w-24 h-1 bg-[#C2B280] rounded-full"></div>
              </div>
              <p className="text-slate-600 max-w-sm text-right font-medium italic font-serif">
                "A culinary journey for the senses, where every dish tells a story of tradition."
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {foods.map((food) => (
              <div key={food.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-full aspect-square mb-8 border-4 border-white shadow-xl shadow-[#0F2C59]/10 mx-auto w-4/5 md:w-full transition-transform duration-500 group-hover:-translate-y-2 bg-slate-200">
                  <img 
                    src={food.image} 
                    alt={food.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FOOD_IMAGES.Default;
                    }}
                  />
                </div>
                <div className="text-center px-4">
                  <h3 className="text-2xl font-serif text-[#0F2C59] mb-2">{food.name}</h3>
                  <p className="text-slate-500 italic font-serif">{food.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisualGallery;
