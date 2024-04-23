import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
  memo,
} from "react";

type SearchContextType = {
  searchType: string;
  setSearchType: (searchType: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const defaultState: SearchContextType = {
  searchType: "characters",
  setSearchType: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
};

const SearchContext = createContext<SearchContextType>(defaultState);

export const useSearch = () => useContext(SearchContext);

type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider = memo(
  ({ children }: SearchProviderProps): ReactElement => {
    const [searchType, setSearchType] = useState<string>(
      defaultState.searchType
    );
    const [searchQuery, setSearchQuery] = useState<string>(
      defaultState.searchQuery
    );

    return (
      <SearchContext.Provider
        value={{ searchType, setSearchType, searchQuery, setSearchQuery }}
      >
        {children}
      </SearchContext.Provider>
    );
  }
);
