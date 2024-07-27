import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Catalog from '../data/moldings.json';
import '../styles/productdetail.scss';
import Navbar from '../components/Navbar';
import NavBlockItems from './NavBlockItems';
import Popup from '../components/Popup';
import Footer from './Footer';

const ProductDetails = () => {
    const { productId } = useParams();
    const [basketProducts, setBasketProducts] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const basketProductsFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        setBasketProducts(basketProductsFromStorage);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(basketProducts));
    }, [basketProducts]);

    const product = Catalog.find(product => product.id === parseInt(productId));
    if (!product) {
        return <div>Product not found!</div>;
    }

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
        setTimeout(() => setShowPopUp(false), 2000); 
    };

    const goToAnotherPage = () => {
        navigate('/');
    };

    return (
        <div>
            <div>
                <Navbar />
                <NavBlockItems />
            </div>
            <h2 className='h2-header'>Информация о товаре</h2>
            <div className='items'>
                <img src={require(`../assets/catalog/primeDecor/${product.image}.jpg`)} alt={product.image} />
                <div className='price-cart-cont'>
                    <p className='name-img'>{product.image}</p>
                    <button
                        className="basket-btn"
                        onClick={() => toggleBasket(product.id)}
                        style={{ backgroundColor: basketProducts.includes(product.id) ? 'rgb(115, 42, 42)' : 'rgb(42, 83, 115)' }}
                    >
                        {basketProducts.includes(product.id) ? 'Удалить' : 'В корзину'}
                    </button>

                </div>
            </div>
            {showPopUp && <Popup message={popupMessage} />}
            <button onClick={goToAnotherPage} className='main-page-btn'>Главная страница</button>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default ProductDetails;
