import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PurchaserForm from './composants/PurchaserForm';
import PropertyCharacteristicsForm from './composants/PropertyCharacteristicsForm';

interface FormData {
  reference: string;
  price: number;
  address: string;
  city: string;
  postcode: number;
}

interface Purchaser {
  firstname: string;
  lastname: string;
  searchcriteria: string;
}

interface PropertyCharacteristics {
  surface: number;
  rooms: number;
}

interface Property extends FormData {
  id: number;
  purchasers: Purchaser[];
  characteristics: PropertyCharacteristics[];
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    reference: '',
    price: 0,
    address: '',
    city: '',
    postcode: 0
  });

  const [submittedData, setSubmittedData] = useState<Property[]>([]);
  const [showPurchaserForm, setShowPurchaserForm] = useState<{ [key: number]: boolean }>({});
  const [showCharacteristicsForm, setShowCharacteristicsForm] = useState<{ [key: number]: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'postcode' ? Number(value) : value,
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/properties`);
      setSubmittedData(response.data);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/properties`, formData);
      setFormData({
        reference: '',
        price: 0,
        address: '',
        city: '',
        postcode: 0,
      });
      fetchData();
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  const handlePurchaserAdded = () => {
    fetchData();
  };

  const handleCharacteristicAdded = () => {
    fetchData();
  };

  const togglePurchaserForm = (propertyId: number) => {
    setShowPurchaserForm(prevState => ({
      ...prevState,
      [propertyId]: !prevState[propertyId]
    }));
  };

  const toggleCharacteristicsForm = (propertyId: number) => {
    setShowCharacteristicsForm(prevState => ({
      ...prevState,
      [propertyId]: !prevState[propertyId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Create New Property</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reference" className="block text-sm font-medium mb-1">Reference</label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Reference"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Address"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="postcode" className="block text-sm font-medium mb-1">Postcode</label>
              <input
                type="number"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Postcode"
              />
            </div>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 gap-6">
        {submittedData.map((data) => (
          <div key={data.id} className="space-y-4">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Property {data.id}</h2>
              <p className="mb-2"><span className="font-semibold">Reference:</span> {data.reference}</p>
              <p className="mb-2"><span className="font-semibold">Price:</span> {data.price} Euros</p>
              <p className="mb-2"><span className="font-semibold">Address:</span> {data.address}</p>
              <p className="mb-2"><span className="font-semibold">City:</span> {data.city}</p>
              <p className="mb-4"><span className="font-semibold">Postcode:</span> {data.postcode}</p>
            </div>
            <div className="bg-gray-700 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Characteristics</h3>
              <ul className="space-y-3">
                {data.characteristics && data.characteristics.map((characteristic, index) => (
                  <li key={index} className="p-4 bg-gray-600 rounded-lg">
                    <p><span className="font-semibold">Surface:</span> {characteristic?.surface} m²</p>
                    <p><span className="font-semibold">Rooms:</span> {characteristic?.rooms}</p>
                  </li>
                ))}
              </ul>
              {!showCharacteristicsForm[data.id] ? (
                <button onClick={() => toggleCharacteristicsForm(data.id)} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 mt-4">
                  Add Characteristics
                </button>
              ) : (
                <div>
                  <button onClick={() => toggleCharacteristicsForm(data.id)} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-4">
                    Hide
                  </button>
                  <PropertyCharacteristicsForm propertyId={data.id} onCharacteristicAdded={handleCharacteristicAdded} />
                </div>
              )}
            </div>
            <div className="bg-gray-700 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Purchasers</h3>
              <ul className="space-y-3">
                {data.purchasers && data.purchasers.map((purchaser, index) => (
                  <li key={index} className="p-4 bg-gray-600 rounded-lg">
                    <p><span className="font-semibold">Fullname:</span> {purchaser?.firstname} {purchaser?.lastname}</p>
                    <p><span className="font-semibold">Search criteria:</span> {purchaser?.searchcriteria}</p>
                  </li>
                ))}
              </ul>
              {!showPurchaserForm[data.id] ? (
                <button onClick={() => togglePurchaserForm(data.id)} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mt-4">
                  Add Purchaser
                </button>
              ) : (
                <div>
                  <button onClick={() => togglePurchaserForm(data.id)} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-4">
                    Hide
                  </button>
                  <PurchaserForm propertyId={data.id} onPurchaserAdded={handlePurchaserAdded} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
