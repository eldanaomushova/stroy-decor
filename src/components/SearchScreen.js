import React, { useState, useEffect } from 'react';
import { LiaTimesSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import Catalog from '../data/moldings.json';
import SearchToggle from './SearchToggle';
import '../styles/searchedScreen.scss';

const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const results = Catalog.filter((product) =>
            product.image.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(results);
        setShowSearchResults(value !== '');
    };
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setShowSearchResults(true);
    };
    return (
        <div className='search-screen-cont'>
            <Link to="/" id='backHome-icon'><LiaTimesSolid /></Link>
            <h1 className='header'>Поиск</h1>
            <form onSubmit={handleSearchSubmit} className='navbar-cont'>
                    <>
                        <input
                            id='search'
                            type='text'
                            placeholder='Search'
                            className='search'
                            maxLength={128}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {showSearchResults && searchResults.length > 0 ? (
                            <Link to={`/productDetails/${searchResults[0]?.id}`} className='submit'>Search</Link>
                        ) : (
                            <a className='submit'>Search</a>
                        )}
                    </>
            </form>
            {showSearchResults && searchResults.length > 0 && (
                <div className='search-result'>
                    {searchResults.map((result, index) => (
                        <p id='searche-p' key={index}>
                            <Link to={`/productDetails/${result.id}`} className='searche-item'>
                                <SearchToggle product={result} weight="700" />
                            </Link>
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchScreen
