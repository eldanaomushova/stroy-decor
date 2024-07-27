import React from 'react'
import Navbar from './Navbar'
import MainAllProducts from './primedec/MainAllProducts'
import NavBlockItems from '../components/NavBlockItems';
import Footer from './Footer';

const Main = () => {
    return (
        <React.Fragment>
            <Navbar/>
            <NavBlockItems />
            <MainAllProducts />
            <Footer />
        </React.Fragment>
    )
}

export default Main
