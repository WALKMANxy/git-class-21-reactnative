// Imports
import React, { useState, useEffect } from "react";
import { useEpisodes } from "../../hooks/useGenericRMA"; // Ensure this is correctly imported
import PaginationControls from "../PaginationControls/PaginationControls";
import "./Episodes.scss"; // Make sure you have an SCSS file for Episodes
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/searchSlice";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

export const Episodes = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: any) => state.search.searchQuery);
  const [episodes, loading, totalPages, error] = useEpisodes(
    currentPage,
    searchQuery
  );

  // Listen for changes in searchQuery and reset currentPage to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    // Update the search query based on URL search params if needed
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("search");
    if (query) dispatch(setSearchQuery(query));
  }, [dispatch]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <div className="episodes-container">
        {episodes.map((episode) => (
          <div key={episode.id} className="episode-item">
            <div className="episode-info">
              <p className="episode-name">{episode.name}</p>
              <div className="episode-details">
                <p>Date: {episode.air_date}</p>
                <p>Episode: {episode.episode}</p>
                <p>Characters: {episode.characters.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodes;
