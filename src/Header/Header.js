import React, { useState } from 'react';
import './Header.css'; 

const Header = ({handleSearch}) => {
   const[searchInput, setSearchInput] = useState('');
   const[language, setLanguage] = useState('');
   const[year, setYear] = useState('');
   const searchHandler = ()=> {
    handleSearch(searchInput, language, year);
   }
  return (
    <header className="header">
      <div className="header-left">Martin Movies</div>
      <div className="header-right">
        <div className="language-container">
          <span>Language</span>
          <select className="language-dropdown" onChange={e => setLanguage(e.target.value)}>
            <option value={'en'}>English</option>
            <option value={'es'}>Spanish</option>
          </select>
        </div>
        <div >
          <select className="year-dropdown" value={year} onChange={e => setYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search movies..." 
          onChange={e => setSearchInput(e.target.value)} 
          />
          <button className="search-button" 
          onClick={searchHandler}
          >Search</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
