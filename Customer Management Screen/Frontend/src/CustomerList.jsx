import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = ({ customers, setSearchTerm, handleClearSearch, currentPage, setCurrentPage, recordsPerPage, handlePagination }) => {
  const [sorting, setSorting] = useState({
    name: 'asc', 
    creationDate: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, [sorting]); 

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/customers', {
        params: { sortBy: sorting }
      });
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSort = (column) => {
    setSorting((prevSorting) => ({
      ...prevSorting,
      [column]: prevSorting[column] === 'asc' ? 'desc' : 'asc'
    }));
  };
  const sortedRecords = customers.sort((a, b) => {
    if (sorting.name === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sorting.name === 'desc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = sortedRecords.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);
  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-2"> List of Customer's</h2>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input border input w-full py-2 px-4 rounded-lg"
        />
        <button onClick={handleClearSearch} className="btn btn-primary ml-2 py-2 px-4">Clear</button>
      </div>
      <table className="table-auto w-full input border input rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 input border input w-full  rounded-lg">
              <div className="flex items-center" onClick={() => handleSort('name')}>
                <span>Name</span>
                {sorting.name === 'asc' && <span className="ml-1">&#9650;</span>}
                {sorting.name === 'desc' && <span className="ml-1">&#9660;</span>}
              </div>
            </th>
            <th className="px-4 py-2 input border input w-full  rounded-lg">Email</th>
            <th className="px-4 py-2 input border input w-full  rounded-lg">Mobile</th>
            <th className="px-4 py-2 input border input w-full  rounded-lg">City</th>
            <th className="px-4 py-2 input border input w-full  rounded-lg">State</th>
            <th className="px-4 py-2 input border input w-full  rounded-lg">Country</th>
            <th className="px-4 py-2 input border input w-full  rounded-lg">Gender</th>
            <th className="px-4 py-2 input border input w-full  rounded-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((customer) => (
            <tr key={customer._id}>
              <td className="border px-4 py-2">{customer.name}</td>
              <td className="border px-4 py-2">{customer.email}</td>
              <td className="border px-4 py-2">{customer.mobile}</td>
              <td className="border px-4 py-2">{customer.city}</td>
              <td className="border px-4 py-2">{customer.state}</td>
              <td className="border px-4 py-2">{customer.country}</td>
              <td className="border px-4 py-2">{customer.gender}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(customer._id)}
                  className="btn btn-blue mr-2 hover:bg-red-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="btn btn-red mr-2 hover:bg-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="mt-4">
        <ul className="flex">
          <li className="mr-2">
            <button
              onClick={prePage}
              disabled={currentPage === 1}
              className={`btn ${currentPage === 1 ? 'btn-disabled' : 'btn-primary'}`}
              style={{ backgroundColor: '#4299e1' }} 
            >
              Prev
            </button>
          </li>
          {numbers.map((n) => (
            <li key={n} className="mr-2">
              <button
                onClick={() => changePage(n)}
                className={`btn ${currentPage === n ? 'btn-secondary border' : 'btn-primary'}`}
              >
                {n}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`btn ${currentPage === totalPages ? 'btn-disabled' : 'btn-primary'}`}
              style={{ backgroundColor: '#4299e1' }} 
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CustomerList;
