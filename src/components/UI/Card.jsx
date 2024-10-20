import React, { useState } from 'react';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Card = ({ title, authors, formats, id, handleUpdateWishlist,genres }) => {
  const [isHovered, setIsHovered] = useState(false);
  const authorNames = authors?.map((author) => author.name).join(', ') || 'Unknown Author';
  const imageUrl = formats['image/jpeg'] || 'default_image_url.jpg';

  const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const isInWishlist = existingWishlist.some(item => item.id === id);

  const addToWishlists = (e, book) => {
    e.stopPropagation();
    let updatedWishlist;
    if (isInWishlist) {
      updatedWishlist = existingWishlist.filter(item => item.id !== book.id);
      toast.info(`${book.title} removed from wishlist`);
    } else {
      toast.success(`${book.title} added to wishlist`);
      updatedWishlist = [...existingWishlist, book];

    }

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    if(handleUpdateWishlist){
      handleUpdateWishlist(book.id);
    }
  };

  const book = {
    id,
    title: title || 'Unknown Title',
    authors,
    formats,
    genres
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 mx-auto transition-transform duration-200 ease-in-out transform hover:scale-105 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/book/${id}`} className="block">
        <img
          src={imageUrl}
          alt={title}
          style={{ width: "300px", height: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <h3 className="font-bold  mt-2 text-center line-clamp-2 text-[16px] sm:text-[14px]">
          {title || 'Unknown Title'}
        </h3>
        <p className="text-center text-[14px] sm:text-[12px]">Author: {authorNames}</p>
        <p className="text-center text-[14px] sm:text-[12px]">Genre: {genres.length > 0 ? genres[0] : 'Unknown Genre'}</p>
      </Link>
      <div
        className={`absolute bottom-[40%] right-2 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out cursor-pointer`}
      >
        <button
          onClick={(e) => addToWishlists(e, book)}
          className="bg-gray-500 text-white p-2 rounded-full transition-transform duration-300 ease-in-out hover:bg-gray-600 hover:scale-110"
        >
          {isInWishlist ? (
            <MdOutlineFavorite className="text-[20px] text-red-500" />
          ) : (
            <MdOutlineFavoriteBorder className="text-[20px]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default React.memo(Card);
