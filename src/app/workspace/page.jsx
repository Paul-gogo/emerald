'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CiLocationOn } from 'react-icons/ci';
import { FaCamera } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';

const page = () => {
  const [properties, setProperties] = useState([]);
  const router = useRouter();

  const fetchUserProperties = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/properties/my-properties', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch properties');
      const data = await res.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error(error);
      alert('Failed to load your properties');
    }
  };

  useEffect(() => {
    fetchUserProperties();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this property?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message || 'Failed to delete property');
        return;
      }

      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Something went wrong while deleting the property.');
    }
  };

  return (
    <section className="px-6 py-12 bg-[#f9f9f6] min-h-screen">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-green-900">Workspace</h1>
          <p className="text-green-800 text-lg">Manage your listings — {properties.length} properties</p>
        </div>
        <Link href="/add/new">
          <button className="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow transition">
            + Add Property
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="relative h-[220px] bg-gray-100 overflow-hidden">
              {property.images?.[0] ? (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <FaCamera className="text-4xl" />
                </div>
              )}
              <span className="absolute top-4 right-4 bg-green-700 text-white text-xs px-4 py-1 rounded-full">
                {property.type}
              </span>
            </div>
            <div className="flex-1 p-6 space-y-2">
              <h3 className="text-2xl font-semibold text-green-900">{property.title}</h3>
              <p className="flex items-center text-sm text-green-700"><CiLocationOn className="mr-1" />{property.location}</p>
              <p className="text-xl font-extrabold text-green-900">
                ${property.price.toLocaleString()}
                {property.type === 'For Rent' && <span className="text-sm font-medium text-green-700"> /month</span>}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">{property.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {property.amenities?.map((a, i) => (
                  <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {a}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4">
                <Link href={`/edit/${property.id}`}>
                  <button className="px-4 py-2 text-sm border border-yellow-600 text-yellow-700 rounded-md hover:bg-yellow-50 transition">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;

