import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = ({ isFormOpen, setIsFormOpen, fetchCustomers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    state: '',
    country: '',
    maritalStatus: '',
    gender: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/create', formData);
      fetchCustomers();
      setFormData({
        name: '',
        email: '',
        mobile: '',
        city: '',
        state: '',
        country: '',
        maritalStatus: '',
        gender: ''
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    isFormOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="shadow-md rounded-md mb-8 w-full max-w-xl p-6 bg-white relative">
          <h2 className="text-xl font-semibold mb-2">Create New Customer</h2>
          <button
            onClick={() => setIsFormOpen(false)}
            className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 hover:bg-red-500"
          >
            X
          </button>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
  <label className="text-base font-semibold mb-0.5" htmlFor="name">Name</label>
  <input
    type="text"
    placeholder="Name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    required
    className="input-lg border p-2 rounded-md mb-2"
  />
  
  <label className="text-base font-semibold mb-0.5" htmlFor="email">Email</label>
  <input
    type="email"
    placeholder="Email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    className="input-lg border p-2 rounded-md mb-2"
  />
  
  <label className="text-base font-semibold mb-0.5" htmlFor="mobile">Mobile</label>
  <input
    type="text"
    placeholder="Mobile"
    name="mobile"
    value={formData.mobile}
    onChange={handleChange}
    required
    className="input-lg border p-2 rounded-md mb-2"
  />
  
  <label className="text-base font-semibold mb-0.5" htmlFor="city">City</label>
  <input
    type="text"
    placeholder="City"
    name="city"
    value={formData.city}
    onChange={handleChange}
    required
    className="input-lg border p-2 rounded-md mb-2"
  />
  
  <label className="text-base font-semibold mb-0.5" htmlFor="state">State</label>
  <input
    type="text"
    placeholder="State"
    name="state"
    value={formData.state}
    onChange={handleChange}
    required
    className="input-lg border p-2 rounded-md mb-2"
  />
  
  <label className="text-base font-semibold mb-0.5" htmlFor="country">Country</label>
  <input
    type="text"
    placeholder="Country"
    name="country"
    value={formData.country}
    onChange={handleChange}
    required
    className="input-lg border p-2 rounded-md mb-2"
  />
  
  <label className="text-base font-semibold mb-0.5" htmlFor="maritalStatus">Marital Status</label>
  <input
    type="text"
    placeholder="Marital Status"
    name="maritalStatus"
    value={formData.maritalStatus}
    onChange={handleChange}
    required
    className="input-lg border p-2 rounded-md mb-2"
  />
  
  <label className="text-base font-semibold mb-0.5" htmlFor="gender">Gender</label>
  <input
    type="text"
    placeholder="Gender"
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    required
    className="input-lg border p-2 rounded-md mb-2"
  />


  <div className="mt-auto flex justify-end">
              <button onClick={() => setIsFormOpen(false)} className="btn btn-primary py-2 px-4 mr-2">Cancel</button>
              <button type="submit" className="btn btn-blue px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700">Save</button>
            </div>
</form>

        </div>
      </div>
    )
  );
};

export default CustomerForm;
