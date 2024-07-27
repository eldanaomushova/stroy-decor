import React from 'react';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import '../styles/footer.scss';

const Footer = () => {
    return (
        <div className='footer'>
        <line />
            <div className='footer-container'>
            <div className='logo-container'>
                <Link to="/"><img src={logo} alt='logo' id='logo'/></Link>
            </div>
            <div className='years-container'>
                <p className='years-text'>&#169; 2023-2024</p>
            </div>
        </div>
        </div>
        
    )
}

export default Footer
