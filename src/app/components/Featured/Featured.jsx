'use client';
import React, { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaStar, FaBed, FaBath, FaHeart, FaShareAlt } from 'react-icons/fa';
import { LuMoveRight } from 'react-icons/lu';
import Link from 'next/link';

const Featured = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://emerald-haven-api.onrender.com/');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('✅ Full API response:', data);

        // Flexible property array extraction depending on your backend response shape
        const propertiesArray = Array.isArray(data?.properties)
          ? data.properties
          : Array.isArray(data?.data?.properties)
          ? data.data.properties
          : Array.isArray(data)
          ? data
          : [];

        if (propertiesArray.length === 0) {
          setError('No properties found');
          setProperties([]);
          return;
        }

        // Shuffle & pick 6 random properties
        const shuffled = [...propertiesArray].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        setProperties(selected);
      } catch (err) {
        console.error('❌ Failed to fetch properties:', err);
        setError(err.message || 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-green-900 font-semibold">Loading featured properties...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600 font-semibold">Error: {error}</div>;
  }

  if (properties.length === 0) {
    return <div className="p-6 text-center text-gray-600 font-semibold">No featured properties available.</div>;
  }

  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-green-900">Featured Properties</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-[#F6F2EA] rounded-xl overflow-hidden shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-48 bg-gray-200 flex items-center justify-center text-gray-400">
              {property.images?.length > 0 ? (
                <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
              ) : (
                <span>Image Placeholder</span>
              )}
              <span className="absolute top-3 left-3 bg-green-800 text-white text-xs px-3 py-1 rounded-full">
                {property.type}
              </span>
              {property.featured && (
                <span className="absolute top-3 left-24 bg-[#296A50] text-white text-xs px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
              <div className="absolute top-3 right-3 flex space-x-2">
                <button
                  aria-label="Like property"
                  className="bg-white p-2 rounded-full shadow hover:bg-green-100 text-[#296A50] transition"
                  onClick={() => alert('Liked!')} // example placeholder
                >
                  <FaHeart className="text-sm" />
                </button>
                <button
                  aria-label="Share property"
                  className="bg-white p-2 rounded-full shadow hover:bg-green-100 text-[#296A50] transition"
                  onClick={() => alert('Share clicked!')} // example placeholder
                >
                  <FaShareAlt className="text-sm" />
                </button>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-green-900">{property.title}</h3>
              <div className="text-sm text-gray-600 flex items-center mt-1 mb-2">
                <CiLocationOn className="mr-1" />
                {property.location}
              </div>

              <div className="text-green-900 font-bold text-lg">
                ${property.price?.toLocaleString() ?? property.price}
                {property.type === 'For Rent' && (
                  <span className="ml-1 text-sm font-normal text-gray-500">/month</span>
                )}
              </div>

              <div className="flex items-center gap-4 text-gray-700 mt-2 text-sm">
                <span className="flex items-center gap-1"><FaBed /> {property.bedrooms}</span>
                <span className="flex items-center gap-1"><FaBath /> {property.bathrooms}</span>
                <span>{property.size}</span>
              </div>

              <div className="flex items-center text-sm text-yellow-600 mt-2">
                <FaStar className="mr-1" />
                {property.rating ?? 4.5}
                <span className="text-gray-500 ml-1">({property.reviews ?? 'reviews'})</span>
              </div>

              <div className="mt-4 flex gap-3">
                <Link href={`/property/${property.id}`} className="w-full">
                  <button className="w-full px-4 py-2 border rounded-lg text-[#1F513D] border-[#296A50] hover:bg-green-100">
                    View Details
                  </button>
                </Link>
                <button
                  className="w-full px-4 py-2 bg-[#296A50] text-white rounded-lg hover:bg-[#1F513D] flex items-center justify-center gap-1"
                  onClick={() => alert('Contact Agent clicked!')} // example placeholder
                >
                  Contact Agent <LuMoveRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/properties">
          <button className="px-4 py-2 bg-white border border-[#296A50] rounded-lg hover:bg-[#F6F2EA] text-[#296A50] font-semibold hover:text-[#1F513D]">
            View All Properties
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Featured;
