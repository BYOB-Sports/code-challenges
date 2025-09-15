// SearchBar provides a sticky search input for filtering courts by title.
// Props:
//   value: Current search string
//   onChange: Function to update search string
//   placeholder: Optional input placeholder
import { Input } from 'antd';
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => (
  <div className="mb-6 px-2 sticky top-0 z-20 bg-white">
    <Input.Search
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || 'Search courts by title...'}
      allowClear
      size="large"
      className="w-full"
    />
  </div>
);

export default SearchBar;
