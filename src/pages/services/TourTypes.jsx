import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function TourTypes() {
  const [tourName, setTourName] = useState('');
  const [tourTypes, setTourTypes] = useState([]);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!tourName) {
      alert('Please enter a tour name.');
      return;
    }
    try {
      const response = await axios.post('/tours', { tourName });
      setTourTypes([...tourTypes, response.data]);
      setTourName('');
    } 
    catch (error) {
        console.error('Error saving tour type:', error);
    }
  };

  useEffect(() => {
    fetchTourTypes();
  }, []);

  const fetchTourTypes = async () => {
    try {
      const response = await axios.get('/tours');
      setTourTypes(response.data);
    } catch (error) {
      console.error('Error fetching tour types:', error);
      if (error.response && error.response.status === 401) {
        alert('You are not authorized. Redirecting to login.');
        navigate('/login');
      }
    }
  };

  const handleEdit = async (id) => {
    const updatedTourName = prompt('Enter the new tour name:');
    if (!updatedTourName) return;

    try {
      const response = await axios.put(`/tours/${id}`, { tourName: updatedTourName });
      setTourTypes(tourTypes.map(tour => (tour._id === id ? response.data : tour)));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('You are not authorized. Redirecting to login.');
        window.location.href = '/login';
      } else {
        console.error('Error updating tour type:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;

    try {
      await axios.delete(`/tours/${id}`);
      setTourTypes(tourTypes.filter(tour => tour._id !== id));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('You are not authorized. Redirecting to login.');
        window.location.href = '/login';
      } else {
        console.error('Error deleting tour type:', error);
      }
    }
  };

  return (
    <>
    <div className='bg-[#f3f7f8] mx-[18rem] w-[24rem] border-blue border mt-20'>
      <h1 className='flex justify-start text-2xl font-bold mt-4 pl-8 text-blue'>
        Tour Types
      </h1>

      <div className='grid grid-cols-1 mt-2 mx-[2rem]'>
        <div className="mb-4">
          <label htmlFor="services" className="flex justify-start font-semibold text-gray-800 mb-2">
           Enter Tour
          </label>
          <div className="relative">
            <div className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer">
              <input
                id="tourName"
                type="text"
                className="bg-transparent text-sm text-gray-900 outline-none w-full"
                placeholder="Enter tour"
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='pb-6 flex justify-center '>
          <button
            className="bg-blue text-white items-center text-md font-bold w-40 py-2 mt-2 rounded-full hover:bg-[#005a59]"
            onClick={handleSave}
          >
            SAVE
          </button>
        </div>
      </div>      
    </div>
    {/* Display Tour Types in a Table */}
    <div className='mt-6 max-w-full mx-3'>
    <table className='min-w-full border-collapse'>
      <thead>
        <tr>
          <th className='border px-4 py-2'>Serial No.#</th>
          <th className='border px-4 py-2'>Tour Name</th>
          <th className='border px-4 py-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tourTypes.map((tour, index) => (
          <tr  key={tour._id}>
            <td className='border px-4 py-2 '>{index + 1}</td>
            <td className='border px-4 py-2'>{tour.tourName}</td>
            <td className='border px-4 py-3 flex justify-center space-x-4'>
              <FaEdit
                className='text-blue-600 cursor-pointer'
                onClick={() => handleEdit(tour._id)}
              />
              <FaTrashAlt
                className='text-red-600 cursor-pointer'
                onClick={() => handleDelete(tour._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div> 
  </>     
  );
}

export default TourTypes;
