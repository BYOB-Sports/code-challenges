import { ChevronDown } from 'lucide-react';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'rating', label: 'Rating' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'name', label: 'Name' }
  ];

  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-colors cursor-pointer"
        aria-label="Sort courts by"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            Sort by: {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default SortDropdown;
