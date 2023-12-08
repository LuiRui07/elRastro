import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* The width: '100%' above ensures that the bar spans the full width. */}
      <TextField
        label="¿Qué estas buscando?"
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{ width: '80%' }} 
      />
      <IconButton onClick={handleSearch} size="large">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
