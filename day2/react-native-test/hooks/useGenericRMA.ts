import { useState, useEffect } from "react";
import axios from "axios";
import { Character, Episode, Response, Location } from "../models/model";

const useGenericRMA = <T>(
  root: string,
  searchQuery: string = ""
): [T[], boolean, string | null] => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const queryParam = searchQuery ? `&name=${encodeURIComponent(searchQuery)}` : "";

      try {
        let allResults: T[] = [];
        let page = 1;
        let response = await axios.get<Response<T>>(
          `https://rickandmortyapi.com/api/${root}?page=${page}${queryParam}`
        );
        allResults = response.data.results;

        while (response.data.info.next) {
          page++;
          response = await axios.get<Response<T>>(
            `https://rickandmortyapi.com/api/${root}?page=${page}${queryParam}`
          );
          allResults = allResults.concat(response.data.results);
        }

        setData(allResults);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setError("No results found with that name!");
          setData([]); // Clear any existing data
        } else {
          setError("An error occurred while fetching the data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [root, searchQuery]);

  return [data, loading, error];
};

export const useCharacters = (searchQuery: string = "") =>
  useGenericRMA<Character>("character", searchQuery);

export const useEpisodes = (searchQuery: string = "") =>
  useGenericRMA<Episode>("episode", searchQuery);

export const useLocation = (searchQuery: string = "") =>
  useGenericRMA<Location>("location", searchQuery);
