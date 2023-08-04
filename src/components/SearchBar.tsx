import React from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        onSearch(query);
    };

    return (
        <input
            type="text"
            placeholder="Search Product"
            onChange={handleSearch}
            className="search-bar"
        />
    );
};

export default SearchBar;
