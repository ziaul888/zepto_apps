import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://gutendex.com/books/${id}`);
        setBook(response.data); 
      } catch (err) {
        if (err.response && err.response.data && err.response.data.detail) {
          setError(err.response.data.detail); 
        } else {
          setError('Something went wrong. Please try again later.');
        }
      } finally {
        setLoading(false); // Set loading to false once request is done
      }
    };

    fetchBookDetails();
  }, [id]); // Run effect when 'id' changes

  // Show loading indicator while fetching data
  if (loading) {
    return (
        <div className="container mx-auto my-6 p-4 max-w-xl">     
         <div className="loading-container justify-center">
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      </div>

    );
  }

  // Show error message if an error occurred
  if (error) return <p>Error: {error}</p>;

  // Display book details
  return (
    <div className="container mx-auto my-6 p-4 max-w-xl">
      {/* Display Book Cover Image */}
      <div className="flex justify-center mb-6">
        <img
          src={book?.formats['image/jpeg'] || 'default_image_url.jpg'}
          alt={book?.title || 'Book Cover'}
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Display Book Details */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{book?.title || 'Unknown Title'}</h1>
        <h2 className="text-xl font-semibold text-gray-700">
          Author: {book?.authors.map(author => author.name).join(', ') || 'Unknown Author'}
        </h2>
        <p className="text-lg text-gray-600 mt-2">Genre: Unknown Genre</p> {/* Assuming no genre in the API */}
        <p className="text-md text-gray-500 mt-2">ID: {id}</p>
      </div>

      {/* Additional Download Links or Details (Optional) */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Download Links:</h2>
        {book?.formats ? (
          <ul>
            {Object.keys(book.formats).map((format, index) => (
              <li key={index} className="text-blue-600 underline mt-2">
                <a href={book.formats[format]} target="_blank" rel="noopener noreferrer">
                  {format}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No download links available.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
