import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Catalog from '../data/moldings.json';
import SearchToggle from './SearchToggle';
import logo from '../assets/logo.jpg';
import { SlPhone, SlBasket, SlMenu, SlMagnifier } from "react-icons/sl";
import '../styles/navbar.scss';

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    const onMenuClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
            <form onSubmit={handleSearchSubmit} className='navbar-cont'>
                <Link to="/"><img src={logo} alt='logo' /></Link>
                <a href={`https://wa.me/+996705757528`} target="_blank" rel="noopener noreferrer" id='number'><SlPhone className='icon' /><p>0(705) 75-75-28</p></a>
                {isSmallScreen ? (
                    <Link to="/search"><SlMagnifier id='search-btn' className='search-btn'/></Link>
                ) : (
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
                )}
                <Link to="/cart"><SlBasket id='heart' /></Link>
                <SlMenu id='menuBar' onClick={onMenuClick}/>
            </form>
            {isSidebarOpen && (
                <div className="sidebar">
                    <button className="close-btn" onClick={onMenuClick}>×</button>
                    <Link to="/plintusnatyazhnye" className="link">Плинтуса для натяжных потолков</Link>
                    <Link to="/plintus" className="link">Потолочные плинтуса</Link>
                    <Link to="/molding" className="link">Молдинги</Link>
                    <Link to="/rozetki" className="link">Розетки потолочные</Link>
                    <Link to='/' className='link' id='homebtn'>Главная страница</Link>
                </div>
            )}
            {showSearchResults && searchResults.length > 0 && (
                <div className='search-results-container'>
                    {searchResults.map((result, index) => (
                        <p id='searched-p' key={index}>
                            <Link to={`/productDetails/${result.id}`} className='searched-item'>
                                <SearchToggle product={result} weight="700" />
                            </Link>
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Navbar;
