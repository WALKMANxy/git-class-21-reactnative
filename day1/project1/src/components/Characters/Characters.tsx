import React, { useEffect, useState } from "react";
import { useCharacters } from "../../hooks/useGenericRMA"; // Adjust the path as necessary
import { useDispatch, useSelector } from "react-redux";
import PaginationControls from "../PaginationControls/PaginationControls";
import "./Characters.scss";
import { useFirstEpisodes } from "../../hooks/useFirstEpisodes";
import { setSearchQuery } from "../../redux/searchSlice";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

export const Characters = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: any) => state.search.searchQuery);
  const [characters, loading, totalPages, error] = useCharacters(
    currentPage,
    searchQuery
  );
  const firstEpisodes = useFirstEpisodes(characters);

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

  /* const [firstEpisodes, setFirstEpisodes] = useState<string[]>([]);

  useEffect(() => {
    const fetchFirstEpisodes = async () => {
      const episodeNames = await Promise.all(
        characters.map(async (char) => {
          try {
            const response = await Axios.get(char.episode[0]);
            return response.data.name;
          } catch (error) {
            console.error("Error fetching first episode:", error);
            return "Unknown";
          }
        })
      );
      setFirstEpisodes(episodeNames);
    };

    if (characters.length > 0) {
      fetchFirstEpisodes();
    }
  }, [characters]);
 */

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
      <div className="characters-container">
        {characters.map((char, index) => (
          <div key={char.id} className="character-item">
            <div className="character-image">
              <img src={char.image} alt={char.name} />
            </div>
            <div className="character-info">
              <p className="character-name">{char.name}</p>
              <div className="character-details">
                <p>
                  <span className="label">Gender:</span> {char.gender}
                </p>
                <p>
                  <span className="label">Status:</span> {char.status}
                </p>
                <p>
                  <span className="label">Last known location:</span>{" "}
                  {char.location.name}
                </p>
                <p>
                  <span className="label">First seen in:</span>{" "}
                  {firstEpisodes[index] || "Unknown"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
