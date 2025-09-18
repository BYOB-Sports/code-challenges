import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search courts, locations, or amenities..." }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 text-black border border-gray-300 rounded-lg focus:border-[#edb04d] focus:outline-none focus:ring-3 focus:ring-[#edb04d]/10 transition-all"
        placeholder={placeholder}
        aria-label="Search tennis courts"
      />
    </div>
  );
};

export default SearchBar;
