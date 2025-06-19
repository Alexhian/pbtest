import React, { useState } from 'react';
import axios from 'axios';

interface PropertyCharacteristicsFormProps {
  propertyId: number;
  onCharacteristicAdded: () => void;
}

interface FormData {
  surface: number;
  rooms: number;
}

function PropertyCharacteristicsForm({ propertyId, onCharacteristicAdded }: PropertyCharacteristicsFormProps) {
  const [formData, setFormData] = useState<FormData>({
    surface: 0,
    rooms: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/propertycharacteristics`, {
        ...formData,
        propertyId
      });
      setFormData({
        surface: 0,
        rooms: 0,
      });
      onCharacteristicAdded();
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="number"
          name="surface"
          value={formData.surface}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border"
          placeholder="Surface"
        />
      </div>
      <div>
        <input
          type="number"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border"
          placeholder="Number of Rooms"
        />
      </div>
      <button
        className="border-2 border-solid px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-700"
        type="submit"
      >
        Add Characteristics
      </button>
    </form>
  );
}

export default PropertyCharacteristicsForm;
