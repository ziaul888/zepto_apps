import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (searchTerm, currentUrl, genreValue) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = currentUrl || `${process.env.REACT_APP_API_URL}`;
                if (searchTerm) {
                    const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
                    url += `?search=${encodedSearchTerm}`;
                }
                if (genreValue && genreValue !== "All") {
                    const encodedGenreValue = encodeURIComponent(genreValue);
                    url += (searchTerm ? '&' : '?') + `genre=${encodedGenreValue}`;
                }
                const response = await axios.get(url);
                setData(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                setError(null); 
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [searchTerm, currentUrl, genreValue]); 
    return { data, loading, error, nextPage, prevPage };
};

export default useFetch;
