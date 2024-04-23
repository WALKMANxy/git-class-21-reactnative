import { Character } from "../models/Character";

const refreshCharacters = async (
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    setCharacters(data.results);
  } catch (error) {
    console.error("Error refreshing characters:", error);
  }
};

export default refreshCharacters;
