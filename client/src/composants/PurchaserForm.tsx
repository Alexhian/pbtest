import React, { useState } from 'react';
import axios from 'axios';

interface PurchaserFormProps {
  propertyId: number;
  onPurchaserAdded: () => void;
}

interface FormData {
  firstname: string;
  lastname: string;
  searchcriteria: string;
}

function PurchaserForm({ propertyId, onPurchaserAdded }: PurchaserFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    searchcriteria: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/purchasers`, {
        ...formData,
        propertyId
      });
      setFormData({
        firstname: '',
        lastname: '',
        searchcriteria: '',
      });
      onPurchaserAdded();
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border"
          placeholder="First Name"
        />
      </div>
      <div>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border"
          placeholder="Last Name"
        />
      </div>
      <div>
        <input
          type="text"
          name="searchcriteria"
          value={formData.searchcriteria}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border"
          placeholder="Search Criteria"
        />
      </div>
      <button
        className="border-2 border-solid px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-700"
        type="submit"
      >
        Add Purchaser
      </button>
    </form>
  );
}

export default PurchaserForm;
