import React, { useState, useEffect } from 'react';
import Catalog from '../../data/moldings.json';
import '../../styles/prdec.scss';
import Navbar from '../Navbar';
import NavBlockItems from '../NavBlockItems';
import Popup from '../Popup';
import Footer from '../Footer';

const Plintus = () => {
    const basketProductsFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const [basketProducts, setBasketProducts] = useState(basketProductsFromStorage);
    const [showPopUp, setShowPopUp] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    useEffect(() => {
        fetch('http://localhost:3002/moldings')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('cart', JSON.stringify(data));
                setBasketProducts(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(basketProducts));
    }, [basketProducts]);
    const toggleBasket = (id) => {
        setBasketProducts(prevBasketProducts => {
            const isInBasket = prevBasketProducts.includes(id);
            const updatedBasket = isInBasket
                ? prevBasketProducts.filter(productId => productId !== id)
                : [...prevBasketProducts, id];
                setPopupMessage(isInBasket ? 'Товар удален из корзины!' : 'Товар добавлен в корзину покупок!');
            return updatedBasket;
        });
        setShowPopUp(true);
    };
    useEffect(() => {
        if (showPopUp) {
            const timer = setTimeout(() => {
                setShowPopUp(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [showPopUp]);
    const filteredCatalog = Catalog.filter(record => 
        (record.id >= 27 && record.id <= 48) || (record.id >= 74 && record.id <= 133)
    );
    return (
        <div>
            <div>
                <Navbar />
                <NavBlockItems />
            </div>
            <p id='header'>Потолочные плинтуса</p>
            <div className='primedec-container'>
            <div className='primedec'>
                {filteredCatalog.map((record) => (
                    <div className='duties' key={record.id}>
                        <img src={require(`../../assets/catalog/primeDecor/${record.image}.jpg`)} alt={record.image} />
                        <div className='price-cart-cont'>
                            <p className='name'>{record.image}</p>
                            <button
                                className="basket-btn"
                                onClick={() => toggleBasket(record.id)}
                                style={{ backgroundColor: basketProducts.includes(record.id) ? 'rgb(115, 42, 42)' : 'rgb(42, 83, 115)' }}
                            >
                                {basketProducts.includes(record.id) ? 'Удалить' : 'В корзину'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {showPopUp && <Popup message={popupMessage} />}
        </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};
export default Plintus;
