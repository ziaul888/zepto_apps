import React, { useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import useFetch from "../../hook/useFetch";
import { useLocation } from "react-router-dom";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Home = () => {
	const [currentUrl, setCurrentUrl] = useState(process.env.REACT_APP_API_URL);
	const query = useQuery(); 
    const searchValue = query.get("search");
	const genreValue = query.get("genre"); 
	console.log({genreValue});
	
	const { data: books, loading, error ,nextPage,prevPage} = useFetch(searchValue, currentUrl,genreValue);

	const handleNextPage = () => {
        if (nextPage) {
            setCurrentUrl(nextPage); 
        }
    };

	console.log({books})

    const handlePrevPage = () => {
        if (prevPage) {
            setCurrentUrl(prevPage); 
        }
    };

	return (
		<div className="w-full max-w-[1200px] mx-auto mt-4">
			{loading && (
				<div className="loading-container">
					<div className="loading-dots">
						<span className="dot"></span>
						<span className="dot"></span>
						<span className="dot"></span>
					</div>
				</div>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

				{!loading && books?.map((book) => (
					<Card 
						key={book?.id}
						title={book?.title}
						authors={book?.authors}
						formats={book?.formats}
                        id={book?.id}
						genres={book?.bookshelves}
					/>
				))}
			</div>
            {books?.length>0  && !loading &&
            	<div className="flex justify-center items-center mt-6 mb-4 gap-4">
				<button
					className="px-4 py-2 bg-gray-300 rounded"
					onClick={handlePrevPage}
					disabled={!prevPage} 
				>
					Previous
				</button>
				<button
					className="px-4 py-2 bg-gray-300 rounded"
					onClick={handleNextPage}
					disabled={!nextPage}
				>
					Next
				</button>
			</div> }
		</div>
	);
};

export default Home;
