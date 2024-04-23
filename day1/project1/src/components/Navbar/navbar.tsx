import React, { useState, useEffect, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.scss";
//import { useSearch } from "../../contexts/SearchContext";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/searchSlice";

const Navbar = memo(() => {
  //console.log("Navbar rendered");

  /*  const [inputValue, setInputValue] = useState(""); // Local state to handle input value
  const { setSearchQuery } = useSearch();
  const routeLocation = useLocation();
  const navigate = useNavigate();
 */

  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const routeLocation = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clear search query and input value when entering specific locations
    const clearSearch = () => {
      if (
        routeLocation.pathname === "/episodes" ||
        routeLocation.pathname === "/locations" ||
        routeLocation.pathname === "/extra-memory"
      ) {
        dispatch(setSearchQuery(''));
        setInputValue('');
      }
    };

    clearSearch();
  }, [routeLocation.pathname, dispatch]);


  // Debounce search query update
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
      if (inputValue.trim()) {
        // Update the URL without navigating away
        navigate(
          `${routeLocation.pathname}?search=${encodeURIComponent(inputValue)}`,
          { replace: true }
        );
      } else {
        // If the input is cleared, remove the query parameter
        navigate(`${routeLocation.pathname}`, { replace: true });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, dispatch, navigate, routeLocation.pathname]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update local state immediately
  };

  return (
    <div className="navbar">
      <div className="navbar-title">RICK AND MORTY API</div>
      {routeLocation.pathname !== "/" &&
        routeLocation.pathname !== "/extra-memory" && ( // Conditionally render the search bar if not on the homepage
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Type here to search..."
              value={inputValue}
              onChange={handleSearchChange}
            />
          </div>
        )}
      {routeLocation.pathname !== "/" && ( // Conditionally render the home button if not on the homepage
        <div className="navbar-action">
          <Link to="/" className="home-link">
            Home
          </Link>
        </div>
      )}
    </div>
  );
});

export default Navbar;
