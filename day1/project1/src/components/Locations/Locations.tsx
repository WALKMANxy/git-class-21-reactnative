// imports
import React, { useEffect, useState } from "react";
import { useLocation } from "../../hooks/useGenericRMA"; // Adjust the path as necessary
import PaginationControls from "../PaginationControls/PaginationControls";
import "./Locations.scss"; // Ensure you have a CSS/SCSS file for Locations
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/searchSlice";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

export const Locations = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: any) => state.search.searchQuery);
  const [locations, loading, totalPages, error] = useLocation(
    currentPage,
    searchQuery
  );

  // Listen for changes in searchQuery and reset currentPage to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Since we don't have to fetch additional details like the first episode for locations,
  // we can directly render the locations data without an additional useEffect.

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
      <div className="locations-container">
        {locations.map((location) => (
          <div key={location.id} className="location-item">
            <div className="location-info">
              <p className="location-name">{location.name}</p>
              <div className="location-details">
                <p>Type: {location.type}</p>
                <p>Dimension: {location.dimension}</p>
                <p>Residents: {location.residents.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
