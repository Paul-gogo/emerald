'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (id) {
      const dummyData = [
        {
          id: 1,
          title: 'Modern Downtown Loft',
          location: 'Downtown, Seattle',
          price: 450000,
          type: 'For Sale',
          bedrooms: 2,
          bathrooms: 2,
          size: '1,200 sqft',
          rating: 4.8,
          reviews: 24,
          description: 'A stylish loft in the heart of Seattle.',
        },
        {
          id: 2,
          title: 'Suburban Family Home',
          location: 'Bellevue, WA',
          price: 3200,
          type: 'For Rent',
          bedrooms: 4,
          bathrooms: 3,
          size: '2,400 sqft',
          rating: 4.9,
          reviews: 18,
          description: 'Spacious home in a quiet suburban neighborhood.',
        },
      ];

      const found = dummyData.find((p) => p.id === parseInt(id));
      setProperty(found);
    }
  }, [id]);

  if (!property) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <p className="text-gray-700 mb-2">{property.location}</p>
      <p className="text-green-800 font-semibold text-xl mb-4">
        ${property.price.toLocaleString()} {property.type === 'For Rent' && '/month'}
      </p>
      <p className="text-gray-600 mb-2">🛏 {property.bedrooms} Bedrooms</p>
      <p className="text-gray-600 mb-2">🛁 {property.bathrooms} Bathrooms</p>
      <p className="text-gray-600 mb-2">📐 {property.size}</p>
      <p className="text-yellow-600 mb-2">⭐ {property.rating} ({property.reviews} reviews)</p>
      <p className="mt-4 text-gray-800">{property.description}</p>
    </div>
  );
};

export default PropertyDetailsPage;
