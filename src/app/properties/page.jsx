'use client';
import React, { useState, useEffect } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaStar, FaBed, FaBath, FaHeart, FaShareAlt } from 'react-icons/fa';
import { LuMoveRight } from 'react-icons/lu';
import Link from 'next/link';

const Page = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('https://emerald-haven-api.onrender.com/properties');
        if (!res.ok) throw new Error('Failed to fetch properties');
        const data = await res.json();
        setProperties(data.properties || data);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((p) => {
    const titleMatch = p.title.toLowerCase().includes(searchTitle.toLowerCase());
    const locationMatch = p.location.toLowerCase().includes(searchLocation.toLowerCase());
    const typeMatch = typeFilter === 'All' || p.type === typeFilter;
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : Infinity;
    const priceMatch = p.price >= min && p.price <= max;
    return titleMatch && locationMatch && typeMatch && priceMatch;
  });

  if (loading) return <p className="text-center py-10">Loading properties...</p>;

  return (
    <section className="px-6 py-12 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-900">Search Properties</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <aside className="w-full max-w-xs bg-[#F6F2EA] p-5 rounded-lg h-auto lg:sticky lg:top-6 lg:self-start lg:h-[80vh] lg:overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-green-900">Filters</h3>

          <label className="block text-sm font-medium text-green-900 mb-1">Search Title</label>
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />

          <label className="block text-sm font-medium text-green-900 mb-1">Property Type</label>
          <div className="flex gap-2 mb-4">
            {['All', 'For Sale', 'For Rent'].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  typeFilter === type
                    ? 'bg-[#296A50] text-white'
                    : 'border-gray-300 text-green-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <label className="block text-sm font-medium text-green-900 mb-1">Price Range</label>
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <label className="block text-sm font-medium text-green-900 mb-1">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </aside>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
          {filteredProperties.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No properties found.</p>
          ) : (
            filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-[#F6F2EA] rounded-xl overflow-hidden shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                <div className="relative h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
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
                    <button className="bg-white p-2 rounded-full shadow hover:bg-[#F6F2EA] text-[#296A50]">
                      <FaHeart />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow hover:bg-[#F6F2EA] text-[#296A50]">
                      <FaShareAlt />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-green-900 truncate">{property.title}</h3>
                  <div className="text-sm text-gray-600 flex items-center mt-1 mb-2">
                    <CiLocationOn className="mr-1" />
                    {property.location}
                  </div>

                  <div className="text-green-900 font-bold text-lg">
                    ${property.price.toLocaleString()}
                    {property.type === 'For Rent' && (
                      <span className="ml-1 text-sm font-normal text-gray-500">/month</span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-gray-700 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <FaBed /> {property.bedrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath /> {property.bathrooms}
                    </span>
                    <span>{property.size}</span>
                  </div>

                  <div className="flex items-center text-sm text-yellow-600 mt-2">
                    <FaStar className="mr-1" />
                    {property.rating || 'N/A'}{' '}
                    <span className="text-gray-500 ml-1">({property.reviews || 0} reviews)</span>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Link href={`/property/${property.id}`} className="w-full">
                      <button
                        className="w-full h-12 bg-white text-[#296A50] font-semibold rounded-lg shadow border border-[#E5E7EB] hover:bg-[#F6F2EA] transition-all"
                        style={{ boxShadow: '0 2px 8px 0 rgba(44, 62, 80, 0.08)' }}
                      >
                        View Details
                      </button>
                    </Link>
                    <button
                      className="w-full h-12 bg-gradient-to-r from-[#296A50] to-[#1F513D] text-white font-semibold rounded-lg shadow hover:from-[#1F513D] hover:to-[#296A50] transition-all text-center"
                      style={{ boxShadow: '0 2px 8px 0 rgba(44, 62, 80, 0.08)' }}
                    >
                      Contact Agent
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
