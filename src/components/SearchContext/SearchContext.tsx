import { createContext, useState } from 'react';

type SearchContextType = {
  keyword: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType | null>(null);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [keyword, onChangeText] = useState('');

  return (
    <SearchContext.Provider value={{ keyword, onChangeText }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
