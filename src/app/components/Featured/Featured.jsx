import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaStar, FaBed, FaBath } from 'react-icons/fa';
import { LuMoveRight } from 'react-icons/lu';
import Link from 'next/link';

const Featured = () => {
  // Mock data — replace with API response later
  const properties = [
    {
      id: 1,
      title: 'Modern Downtown Loft',
      location: 'Downtown, Seattle',
      price: 450000,
      type: 'For Sale',
      featured: true,
      bedrooms: 2,
      bathrooms: 2,
      size: '1,200 sqft',
      rating: 4.8,
      reviews: 24,
    },
    {
      id: 2,
      title: 'Suburban Family Home',
      location: 'Bellevue, WA',
      price: 3200,
      type: 'For Rent',
      featured: true,
      bedrooms: 4,
      bathrooms: 3,
      size: '2,400 sqft',
      rating: 4.9,
      reviews: 18,
    },
    {
      id: 3,
      title: 'Luxury Waterfront Condo',
      location: 'Waterfront, Vancouver',
      price: 750000,
      type: 'For Sale',
      featured: true,
      bedrooms: 3,
      bathrooms: 2,
      size: '1,800 sqft',
      rating: 4.7,
      reviews: 31,
    },
  ];

  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-green-900">Featured Properties</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-48 bg-gray-200 flex items-center justify-center text-gray-400">
              <span>Image Placeholder</span>
              <span className="absolute top-3 left-3 bg-green-800 text-white text-xs px-3 py-1 rounded-full">
                {property.type}
              </span>
              {property.featured && (
                <span className="absolute top-3 left-24 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">❤️</button>
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">🔗</button>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-green-900">{property.title}</h3>
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
                <span className="flex items-center gap-1"><FaBed /> {property.bedrooms}</span>
                <span className="flex items-center gap-1"><FaBath /> {property.bathrooms}</span>
                <span>{property.size}</span>
              </div>

              <div className="flex items-center text-sm text-yellow-600 mt-2">
                <FaStar className="mr-1" />
                {property.rating} <span className="text-gray-500 ml-1">({property.reviews} reviews)</span>
              </div>

              <div className="mt-4 flex gap-3">
                <Link href={`/property/${property.id}`} className="w-full">
                  <button className="w-full px-4 py-2 border rounded-lg text-green-800 border-green-700 hover:bg-green-100">
                    View Details
                  </button>
                </Link>
                <button className="w-full px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 flex items-center justify-center gap-1">
                  Contact Agent <LuMoveRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
