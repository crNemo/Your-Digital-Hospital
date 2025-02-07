import React, { useState } from "react";

const ambulanceData = [
  { name: "Norvic International Hospital", type: "ALS", typeFull: "Advanced Life Support", price: "NPR 5000", contact: "9803111111", location: "Thapathali, Kathmandu" },
  { name: "Shreedhi International Hospital", type: "BLS", typeFull: "Basic Life Support", price: "NPR 3000", contact: "01-4001785", location: "Lazimpat-2, Kathmandu" },
  { name: "Suvekchya International Hospital", type: "Neonatal", typeFull: "Neonatal and Pediatric Ambulance", price: "NPR 7000", contact: "01-5389534", location: "Sitapaila, Kathmandu" },
  { name: "Nepal Bharat Maitri Hospital", type: "Mortuary", typeFull: "Mortuary Ambulance", price: "NPR 4000", contact: "01-5241288", location: "Mitrapark, Kathmandu" },
  { name: "Green City Hospital", type: "Air", typeFull: "Air Ambulance", price: "NPR 15000", contact: "01-4381133", location: "Kathmandu" },
  { name: "Vayodha Hospital", type: "ALS", typeFull: "Advanced Life Support", price: "NPR 5500", contact: "9802019561", location: "Balkhu Chowk, Kathmandu" }
];

const Ambulance = () => {
  const [filter, setFilter] = useState("All");
  const filteredData = filter === "All" ? ambulanceData : ambulanceData.filter(item => item.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900 p-6 flex flex-col items-center">

      {/* 🚨 Emergency Call Button */}
      <div className="relative flex justify-center mb-8">
        <a href='http://localhost:3000/' target='_blank' rel='noopener noreferrer'>
          <button className="relative bg-red-500 text-white font-bold py-4 px-10 rounded-full text-2xl cursor-pointer shadow-lg transition-transform transform hover:scale-105 hover:shadow-red-400/50
          before:absolute before:inset-0 before:bg-red-300 before:blur-lg before:opacity-50 before:-z-10
          after:absolute after:inset-0 after:border-2 after:border-red-300 after:rounded-full after:animate-pulse">
            🚑 Emergency Ambulance Call
          </button>
        </a>
      </div>

      {/* 🚑 Container */}
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">🚑 Ambulance Services</h1>

        {/* 🌟 Filter Buttons */}
        <div className="mb-8 flex justify-center gap-3 flex-wrap">
          {["All", "BLS", "ALS", "Neonatal", "Air", "Mortuary"].map(type => (
            <button
              key={type}
              className={`px-5 py-2 rounded-full transition-all duration-300 
              ${filter === type ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* 🚑 Ambulance List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredData.map((ambulance, index) => (
            <div key={index} className="relative p-6 rounded-xl bg-white shadow-lg border border-gray-200 transform transition hover:scale-105">
              
              {/* Floating Soft Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-purple-200 opacity-20 blur-lg rounded-xl"></div>

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-blue-500">{ambulance.name}</h2>
                <p className="text-gray-700 mt-2"><strong>Type:</strong> {ambulance.typeFull} ({ambulance.type})</p>
                <p className="text-gray-700"><strong>Price:</strong> {ambulance.price}</p>
                <p className="text-gray-700"><strong>Contact:</strong> {ambulance.contact}</p>

                {/* 📍 View Location Button */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ambulance.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  📍 View Location
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Ambulance;
