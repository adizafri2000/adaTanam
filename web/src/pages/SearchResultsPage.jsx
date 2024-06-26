import React from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
  const query = useQuery();
  const searchQuery = query.get('query');

  return (
    <div>
      <h2>Search Results Page</h2>
      {searchQuery && <p>Search Query: {searchQuery}</p>}
      {/* Fetch and display search results based on the searchQuery */}
    </div>
  );
};

export default SearchResultsPage;
