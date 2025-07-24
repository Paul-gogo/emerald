'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 10;

const EditPropertyPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return <p className="text-center py-10">Invalid property ID</p>;
  }

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'For Sale',
    description: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    amenities: '',
    images: [],         // New image files to upload
    existingImages: [], // URLs of existing images
  });

  const [loading, setLoading] = useState(true);
  const [deletedImages, setDeletedImages] = useState([]); // URLs of images user removed
  const [previewURLs, setPreviewURLs] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Unauthorized');

        const res = await fetch(`https://emerald-haven-api.onrender.com/api/v1/properties/${numericId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to fetch property');
        }

        const property = await res.json();

        setFormData({
          title: property.title ?? '',
          location: property.location ?? '',
          price: property.price ?? '',
          type: property.type ?? 'For Sale',
          description: property.description ?? '',
          bedrooms: property.bedrooms ?? '',
          bathrooms: property.bathrooms ?? '',
          size: property.size ?? '',
          amenities: (property.amenities && property.amenities.join(', ')) || '',
          images: [],
          existingImages: property.images || [],
        });
        setPreviewURLs([]);
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to fetch property data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [numericId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalImages = formData.existingImages.length + formData.images.length + newFiles.length;

    if (totalImages > MAX_IMAGES) {
      return alert(`Maximum ${MAX_IMAGES} images allowed (existing + new).`);
    }

    const totalSize = [...formData.images, ...newFiles].reduce((sum, file) => sum + file.size / 1024 / 1024, 0);
    if (totalSize > MAX_SIZE_MB) {
      return alert(`Total file size must be under ${MAX_SIZE_MB}MB.`);
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newFiles],
    }));

    // Update previews for new images
    setPreviewURLs(prev => [...prev, ...newFiles.map(file => URL.createObjectURL(file))]);
  };

  const handleDeleteExistingImage = (index) => {
    const imageToDelete = formData.existingImages[index];
    setDeletedImages(prev => [...prev, imageToDelete]);

    setFormData(prev => {
      const updated = [...prev.existingImages];
      updated.splice(index, 1);
      return { ...prev, existingImages: updated };
    });
  };

  const handleDeleteNewImage = (index) => {
    setFormData(prev => {
      const updated = [...prev.images];
      updated.splice(index, 1);
      return { ...prev, images: updated };
    });
    setPreviewURLs(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You must be logged in to update a property.');

      const data = new FormData();
      data.append('title', formData.title);
      data.append('location', formData.location);
      data.append('price', formData.price);
      data.append('type', formData.type);
      data.append('description', formData.description);
      data.append('bedrooms', formData.bedrooms);
      data.append('bathrooms', formData.bathrooms);
      data.append('size', formData.size);
      data.append('amenities', JSON.stringify(formData.amenities.split(',').map(a => a.trim())));
      data.append('existingImages', JSON.stringify(formData.existingImages));
      data.append('deletedImages', JSON.stringify(deletedImages));

      formData.images.forEach(image => data.append('images', image));

      const res = await fetch(`https://emerald-haven-api.onrender.com/properties/${numericId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Update failed');
      }

      alert('Property updated successfully!');
      router.push('/workspace');
    } catch (err) {
      console.error(err);
      alert(`Failed to update property: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="px-6 py-10 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-green-900 mb-6">Edit Property</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
        <input
          name="title"
          value={formData.title ?? ''}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="location"
          value={formData.location ?? ''}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="price"
          value={formData.price ?? ''}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <select
          name="type"
          value={formData.type ?? 'For Sale'}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>
        <input
          name="bedrooms"
          value={formData.bedrooms ?? ''}
          onChange={handleChange}
          placeholder="Bedrooms"
          required
          type="number"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="bathrooms"
          value={formData.bathrooms ?? ''}
          onChange={handleChange}
          placeholder="Bathrooms"
          required
          type="number"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="size"
          value={formData.size ?? ''}
          onChange={handleChange}
          placeholder="Size (e.g. 1200 sqft)"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description ?? ''}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded"
          rows={4}
        />
        <input
          name="amenities"
          value={formData.amenities ?? ''}
          onChange={handleChange}
          placeholder="Amenities (comma-separated)"
          className="w-full px-4 py-2 border rounded"
        />

        <div>
          <label className="block text-sm font-medium text-green-900 mb-1">
            Upload Images (max 5, total &lt; 10MB)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Existing images */}
          {formData.existingImages.map((url, i) => (
            <div key={`existing-${i}`} className="relative w-24 h-24 border rounded overflow-hidden">
              <img src={url} alt={`Existing ${i}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleDeleteExistingImage(i)}
                className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl"
              >
                ✕
              </button>
            </div>
          ))}

          {/* New uploads */}
          {formData.images.map((file, i) => (
            <div key={`new-${i}`} className="relative w-24 h-24 border rounded overflow-hidden">
              <img
                src={previewURLs[i]}
                alt={`New ${i}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleDeleteNewImage(i)}
                className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#296A50] text-white px-6 py-2 rounded hover:bg-[#1F513D]"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </section>
  );
};

export default EditPropertyPage;
