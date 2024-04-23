// hooks/useFirstEpisodes.js
import { useState, useEffect } from "react";
import Axios from "axios";
import { Character } from "../models/model";

export const useFirstEpisodes = (characters: Character[]) => {
  const [firstEpisodes, setFirstEpisodes] = useState<string[]>([]);

  useEffect(() => {
    const fetchFirstEpisodes = async () => {
      const episodeNames = await Promise.all(
        characters.map(async (character) => {
          if (character.episode.length > 0) {
            try {
              const response = await Axios.get(character.episode[0]);
              return response.data.name;
            } catch (error) {
              console.error("Error fetching first episode:", error);
              return "Unknown";
            }
          }
          return "Unknown"; 
        })
      );
      setFirstEpisodes(episodeNames);
    };

    if (characters.length > 0) {
      fetchFirstEpisodes();
    }
  }, [characters]);

  return firstEpisodes;
};
