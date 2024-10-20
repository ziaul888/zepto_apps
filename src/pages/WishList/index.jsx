
import React, { useState } from 'react';
import Card from '../../components/UI/Card';

const Wishlist = () => {
  const books = JSON.parse(localStorage.getItem('wishlist')) || [];
  const [wishlistBooks,setWishlistBooks] = useState(books)

  const handleUpdateWishlist = (bookId) => {
    const updatedBooks = wishlistBooks.filter((book) => book.id !== bookId);
    setWishlistBooks(updatedBooks);
    localStorage.setItem('wishlist', JSON.stringify(updatedBooks));
  };
  console.log({wishlistBooks});
  
    return (
      <div className="w-full max-w-[1200px] mx-auto mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{wishlistBooks?.map((book) => (
						<Card
							key={book?.id}
							title={book?.title}
							authors={book?.authors}
							formats={book?.formats}
                            id={book?.id}
							handleUpdateWishlist={handleUpdateWishlist}
                            genres={book?.genres}
						/>
					))}
				</div>
        </div>
    );
};

export default Wishlist;
