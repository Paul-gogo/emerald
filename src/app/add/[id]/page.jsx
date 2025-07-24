'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 10;

const AddPropertyPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    type: 'For Sale',
    bedrooms: '',
    bathrooms: '',
    size: '',
    description: '',
    amenities: '',
  });
  const [images, setImages] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const combinedFiles = [...images, ...newFiles];

    if (combinedFiles.length > MAX_IMAGES) {
      alert('Max 5 images allowed.');
      return;
    }

    const totalSizeMB = combinedFiles.reduce((sum, file) => sum + file.size / 1024 / 1024, 0);
    if (totalSizeMB > MAX_SIZE_MB) {
      alert('Total image size must be under 10MB.');
      return;
    }

    setImages(combinedFiles);
    setPreviewURLs(combinedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('title', form.title);
      formData.append('location', form.location);
      formData.append('price', form.price);
      formData.append('type', form.type);
      formData.append('bedrooms', form.bedrooms);
      formData.append('bathrooms', form.bathrooms);
      formData.append('size', form.size);
      formData.append('description', form.description);
      formData.append('amenities', JSON.stringify(form.amenities.split(',').map(a => a.trim())));

      images.forEach((image) => {
        formData.append('images', image);
      });

      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to create a property.');
        setLoading(false);
        return;
      }

      const res = await fetch('https://emerald-haven-api.onrender.com/api/v1/properties/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      alert('Property submitted successfully!');
      router.push('/workspace');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-bold text-green-900">Submit Property</h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Property Title"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          placeholder="Location"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          required
          type="number"
          placeholder="Price"
          className="w-full px-4 py-2 border rounded"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>

        <input
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          required
          type="number"
          placeholder="Bedrooms"
          className="w-full px-4 py-2 border rounded"
        />

        <input
          name="bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          required
          type="number"
          placeholder="Bathrooms"
          className="w-full px-4 py-2 border rounded"
        />

        <input
          name="size"
          value={form.size}
          onChange={handleChange}
          required
          placeholder="Size (e.g., 1,200 sqft)"
          className="w-full px-4 py-2 border rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded"
          rows={4}
        />

        <input
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
          placeholder="Amenities (comma separated)"
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        <p className="text-sm text-gray-500">
          Max 5 images. Total size must be under 10MB.
        </p>

        <div className="flex flex-wrap gap-4">
          {previewURLs.map((url, i) => (
            <div key={i} className="relative w-24 h-24 border rounded overflow-hidden">
              <img
                src={url}
                alt={`Preview ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#296A50] text-white px-6 py-2 rounded hover:bg-[#1F513D]"
        >
          {loading ? 'Uploading...' : 'Submit Property'}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;

