import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, SearchIcon } from "lucide-react";

interface SearchProps {
  searchItem: string;
  setSearchItem: (arg: string) => void;
  searchAction?: () => void;
  placeholder?: string;
  buttonLabel?: () => string;
  isSearching: boolean;
}

const Search = ({
  searchAction,
  searchItem,
  isSearching,
  setSearchItem,
  placeholder

}: SearchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          disabled={isSearching}
        />
      </div>
      <Button
        type="submit"
        disabled={!searchItem}
        className="px-6 py-6 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSearching ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <SearchIcon size={20} />
        )}
        {isSearching ? "Getting Info..." : "Get Info"}
      </Button>
    </div>
  );
};

export default Search;
