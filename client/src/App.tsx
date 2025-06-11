import React, { useState } from 'react';

interface FormData {
  reference: string;
  price: number;
  address: string;
  city: string;
  postalCode: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    reference: '',
    price: 0,
    address: '',
    city: '',
    postalCode: '',
  });
  

  // useEffect(() => {
	// 	const fetchProperties = async () => {
	// 		try {
	// 			const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
	// 			setProperties(res.data);
	// 		} catch {
	// 			setError("Erreur lors de la récupération des projets.");
	// 		}
	// 	};
	// 	fetchProperties();
	// }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    
    // try{
    //   const res = await axios.post(`${import.meta.env.VITE_API_URL}/`, formData);
    //   setFormData()
    // } catch {
    //   setError("Erreur lors de l'envoi du formulaire.");
    // }
  };

  return (
    <div className='flex flex-col items-center space-y-4'>
      <h1 className='text-4xl'>Property Form</h1>
      <form onSubmit={handleSubmit}
      className='space-y-3 justify-center'>
        <div>
          <input
            type="text"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            className="self-center px-3 py-2 rounded-lg border"
            placeholder='Reference'
          />
        </div>
        <div className='space-x-2'>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
             className="self-center px-3 py-2 rounded-lg w-2/3 border"
            placeholder='Price'
          />
          <label htmlFor="Price">Euros </label>
        </div>
        <div className='space-x-2'>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
             className="self-center px-3 py-2 rounded-lg border"
            placeholder='address'
          />
        </div>
        <div className='space-x-2'>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
             className="self-center px-3 py-2 rounded-lg border"
            placeholder='City'
          />
        </div>
        <div className='space-x-2'>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
             className="self-center px-3 py-2 rounded-lg border"
            placeholder='Postal code'
          />
        </div>
        <button className='border-2 border-solid px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-700 ' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
