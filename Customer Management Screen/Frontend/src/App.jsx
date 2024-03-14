import React, { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import axios from 'axios';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, currentPage]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000?search=${searchTerm}&page=${currentPage}`);
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Customer Management Screen</h1>
      <button
        onClick={() => setIsFormOpen(true)}
        className="btn btn-primary mb-4 bg-blue-400 hover:bg-blue-600"
      >
        Create Customer
      </button>
      <CustomerForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} fetchCustomers={fetchCustomers} />
      <CustomerList
        customers={customers}
        setSearchTerm={setSearchTerm}
        handleClearSearch={handleClearSearch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        recordsPerPage={recordsPerPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default App;
