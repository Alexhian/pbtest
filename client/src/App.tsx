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
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-4xl">Create new property</h1>
      <form onSubmit={handleSubmit} className="space-y-3 justify-center">
        <div>
          <input
            type="text"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            className="self-center px-3 py-2 rounded-lg border"
            placeholder="Reference"
          />
        </div>
        <div className="space-x-2">
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="self-center px-3 py-2 rounded-lg w-2/3 border"
            placeholder="Price"
          />
          <label htmlFor="price">Euros</label>
        </div>
        <div className="space-x-2">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="self-center px-3 py-2 rounded-lg border"
            placeholder="Address"
          />
        </div>
        <div className="space-x-2">
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="self-center px-3 py-2 rounded-lg border"
            placeholder="City"
          />
        </div>
        <div className="space-x-2">
          <input
            type="number"
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            className="self-center px-3 py-2 rounded-lg border"
            placeholder="Postcode"
          />
        </div>
        <button
          className="border-2 border-solid px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-700"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className="flex space-x-4">
        {submittedData.map((data) => (
          <div key={data.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">Property {data.id}</h2>
            <p>Reference: {data.reference}</p>
            <p>Price: {data.price} Euros</p>
            <p>Address: {data.address}</p>
            <p>City: {data.city}</p>
            <p>Postcode: {data.postcode}</p>
            <div>
              <h3 className="text-lg font-bold">Purchasers</h3>
              <ul>
                {data.purchasers && data.purchasers.map((purchaser, index) => (
                  <li key={index}>
                    <p>Fullnames: {purchaser?.firstname} {purchaser?.lastname}</p>
                    <p>Search criteria: {purchaser?.searchcriteria}</p> 
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Characteristics</h3>
              <ul>
                {data.characteristics && data.characteristics.map((characteristic, index) => (
                  <li key={index}>
                    <p>Surface: {characteristic?.surface} m²</p>
                    <p>Rooms: {characteristic?.rooms}</p>
                  </li>
                ))}
              </ul>
            </div>
            {!showPurchaserForm[data.id] ? (
              <button onClick={() => togglePurchaserForm(data.id)} className="border-2 border-solid px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-700">Add Purchaser</button>
            ) : (
              <div>
                <button onClick={() => togglePurchaserForm(data.id)} className="border-2 border-solid px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-700">Hide</button>
                <PurchaserForm propertyId={data.id} onPurchaserAdded={handlePurchaserAdded} />
              </div>
            )}
            {!showCharacteristicsForm[data.id] ? (
              <button onClick={() => toggleCharacteristicsForm(data.id)} className="border-2 border-solid px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-700">Add Characteristics</button>
            ) : (
              <div>
                <button onClick={() => toggleCharacteristicsForm(data.id)} className="border-2 border-solid px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-700">Hide</button>
                <PropertyCharacteristicsForm propertyId={data.id} onCharacteristicAdded={handleCharacteristicAdded} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
