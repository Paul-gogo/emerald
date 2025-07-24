'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaPhoneAlt,
  FaRegEnvelope,
  FaTimes,
} from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        if (!token) {
          setError('You must be logged in to view this property.');
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:5000/api/v1/properties/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to fetch property');
        }

        const data = await res.json();
        setProperty(data.property || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!property) return <div className="p-6">Property not found</div>;

  return (
    <>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-screen">
        {/* Left/Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Back Button */}
          <button
            className="text-[#1F513D] font-semibold underline hover:text-green-900"
            onClick={() => router.back()}
          >
            ← Back to Properties
          </button>

          {/* Property Images */}
          {property.images?.length > 0 && (
            <div className="flex space-x-4 overflow-x-auto rounded-lg">
              {property.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Property Image ${i + 1}`}
                  className="w-80 h-60 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setModalImage(img)}
                />
              ))}
            </div>
          )}

          {/* Title & Location */}
          <div>
            <h1 className="text-4xl font-bold text-[#1F513D] mb-2">{property.title}</h1>
            <p className="flex items-center text-gray-500 text-lg">
              <CiLocationOn className="mr-2 text-xl" /> {property.location}
            </p>
          </div>

          {/* Price */}
          <div className="text-[#1F513D] text-3xl font-extrabold mb-4">
            ${property.price.toLocaleString()}
            {property.type === 'For Rent' && (
              <span className="text-base font-medium text-gray-600 ml-2">/month</span>
            )}
          </div>

          {/* Specs */}
          <div className="flex flex-wrap gap-6 text-gray-700">
            <div className="flex items-center gap-2 bg-[#f1f5f4] px-4 py-2 rounded-lg shadow-sm">
              <FaBed className="text-[#1F513D]" /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex items-center gap-2 bg-[#f1f5f4] px-4 py-2 rounded-lg shadow-sm">
              <FaBath className="text-[#1F513D]" /> {property.bathrooms} Bathrooms
            </div>
            <div className="flex items-center gap-2 bg-[#f1f5f4] px-4 py-2 rounded-lg shadow-sm">
              <FaRulerCombined className="text-[#1F513D]" /> {property.size}
            </div>
          </div>

          {/* Rating */}
          <div className="text-yellow-600 flex items-center gap-1 mt-4">
            <FaStar />
            <span className="font-semibold">{property.rating}</span>
            <span className="text-gray-600">({property.reviews} reviews)</span>
          </div>

          {/* Description */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-[#1F513D] mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-[#1F513D] mb-3">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[#1F513D] font-medium">
              {property.amenities?.map((item, i) => (
                <span
                  key={i}
                  className="bg-[#eef5f2] px-3 py-1 rounded-full text-sm hover:bg-[#d9ede1] transition"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Section for mobile - show only on small screens */}
          <div className="block lg:hidden mt-10 bg-[#f9f4ec] p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F513D] mb-6">Contact Agent</h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-300" />
              <div>
                <p className="font-semibold text-[#1F513D] text-lg">Sarah Johnson</p>
                <p className="text-sm text-gray-600">Licensed Real Estate Agent</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <button className="w-full bg-[#1F513D] text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-green-900 transition">
                <FaPhoneAlt /> Call Agent
              </button>
              <button className="w-full border border-[#1F513D] text-[#1F513D] py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-green-100 transition">
                <FaRegEnvelope /> Send Message
              </button>
              <button className="w-full border border-[#296A50] text-[#1F513D] py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-green-100 transition">
                📅 Schedule Viewing
              </button>
            </div>

            <div className="text-sm text-gray-700 space-y-4">
              <p>
                <FaPhoneAlt className="inline mr-4 text-[#296A50]" /> +234 814-576-4023
              </p>
              <p>
                <FaRegEnvelope className="inline mr-4" /> paulgogo518@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Right/Sidebar - show only on large screens */}
        <div className="hidden lg:flex flex-col justify-between bg-[#f9f4ec] p-6 rounded-xl shadow-sm fixed right-6 top-24 h-[85vh] w-[350px]">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1F513D]">Contact Agent</h2>

            {/* Agent Info */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-300" />
              <div>
                <p className="font-semibold text-[#1F513D] text-lg">Sarah Johnson</p>
                <p className="text-sm text-gray-600">Licensed Real Estate Agent</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4 mt-4">
              <button className="w-full bg-[#1F513D] text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-green-900 transition">
                <FaPhoneAlt /> Call Agent
              </button>
              <button className="w-full border border-[#1F513D] text-[#1F513D] py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-green-100 transition">
                <FaRegEnvelope /> Send Message
              </button>
              <button className="w-full border border-[#296A50] text-[#1F513D] py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-green-100 transition">
                📅 Schedule Viewing
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-3 text-sm text-gray-700 space-y-4">
            <p>
              <FaPhoneAlt className="inline mr-4 text-[#296A50]" /> +234 814-576-4023
            </p>
            <p>
              <FaRegEnvelope className="inline mr-4" /> paulgogo518@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] p-2"
            onClick={(e) => e.stopPropagation()} // prevent modal close on image click
          >
            <button
              className="absolute top-2 right-2 text-white text-3xl hover:text-gray-300"
              onClick={() => setModalImage(null)}
              aria-label="Close Image"
            >
              <FaTimes />
            </button>
            <img
              src={modalImage}
              alt="Expanded Property"
              className="max-w-full max-h-[85vh] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetailsPage;
