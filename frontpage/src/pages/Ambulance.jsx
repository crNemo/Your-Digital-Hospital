import React, { useState } from "react";

const ambulanceData = [
  { name: "Norvic International Hospital", type: "ALS", typeFull: "Advanced Life Support", price: "NPR 5000", contact: "9803111111", location: "Thapathali, Kathmandu" },
  { name: "Shreedhi International Hospital", type: "BLS", typeFull: "Basic Life Support", price: "NPR 3000", contact: "01-4001785", location: "Lazimpat-2, Kathmandu" },
  { name: "Suvekchya International Hospital", type: "Neonatal", typeFull: "Neonatal and Pediatric Ambulance", price: "NPR 7000", contact: "01-5389534", location: "Sitapaila, Kathmandu" },
  { name: "Nepal Bharat Maitri Hospital", type: "Mortuary", typeFull: "Mortuary Ambulance", price: "NPR 4000", contact: "01-5241288", location: "Mitrapark, Kathmandu" },
  { name: "Green City Hospital", type: "Air", typeFull: "Air Ambulance", price: "NPR 15000", contact: "01-4381133", location: "Kathmandu" },
  { name: "Vayodha Hospital", type: "ALS", typeFull: "Advanced Life Support", price: "NPR 5500", contact: "9802019561", location: "Balkhu Chowk, Kathmandu" },
  { name: "Grande International Hospital", type: "ALS", typeFull: "Advanced Life Support", price: "NPR 6000", contact: "9801234567", location: "Tokha, Kathmandu" },
  { name: "Patan Hospital", type: "BLS", typeFull: "Basic Life Support", price: "NPR 3200", contact: "9807654321", location: "Patan, Lalitpur" },
  { name: "Teaching Hospital", type: "ALS", typeFull: "Advanced Life Support", price: "NPR 5800", contact: "9804567890", location: "Maharajgunj, Kathmandu" },
  { name: "Bir Hospital", type: "Neonatal", typeFull: "Neonatal and Pediatric Ambulance", price: "NPR 7500", contact: "9801122334", location: "Ratnapark, Kathmandu" },
  { name: "Civil Hospital", type: "BLS", typeFull: "Basic Life Support", price: "NPR 3100", contact: "9805566778", location: "New Baneshwor, Kathmandu" },
  { name: "KMC Hospital", type: "Mortuary", typeFull: "Mortuary Ambulance", price: "NPR 4200", contact: "9809988776", location: "Sinamangal, Kathmandu" },
  { name: "HAMS Hospital", type: "ALS", typeFull: "Advanced Life Support", price: "NPR 5700", contact: "9802233445", location: "Dhumbarahi, Kathmandu" },
  { name: "Om Hospital", type: "Neonatal", typeFull: "Neonatal and Pediatric Ambulance", price: "NPR 7200", contact: "9803344556", location: "Chabahil, Kathmandu" }
];

const Ambulance = () => {
  const [filter, setFilter] = useState("All");

  const filteredData = filter === "All" ? ambulanceData : ambulanceData.filter(item => item.type === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* Emergency Call Button */}
      <div className="flex justify-center mb-4">
        <a href='http://localhost:3000/' target='_blank' rel='noopener noreferrer'>
          <button className="bg-red-500 text-white font-bold py-3 px-6 rounded-full text-lg cursor-pointer">
            Call Nearest Ambulance [Emergency]
          </button>
        </a>
      </div>

      {/* Container */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Ambulance Information</h1>

        {/* Filter Buttons */}
        <div className="mb-6 flex justify-center gap-3 overflow-x-auto p-2">
          {["All", "BLS", "ALS", "Neonatal", "Air", "Mortuary"].map(type => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full transition ${filter === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Ambulance List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredData.map((ambulance, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-lg font-semibold">{ambulance.name}</h2>
                <p><strong>Type:</strong> {ambulance.typeFull} ({ambulance.type})</p>
                <p><strong>Price:</strong> {ambulance.price}</p>
                <p><strong>Contact:</strong> {ambulance.contact}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ambulance.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                View Location
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ambulance;
