// At the top of your HomePage.tsx file
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png"; // Adjust the path as necessary
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="subtitle">Rick and Morty API _ TESTAPP</h2>
      <nav>
        <ul>
          <li>
            <Link to="/characters">Characters</Link>
          </li>
          <li>
            <Link to="/locations">Locations</Link>
          </li>
          <li>
            <Link to="/episodes">Episodes</Link>
          </li>
          <li>
            <Link to="/extra-memory">Memory Game</Link>
            </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
