import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Catalog from '../data/moldings.json';
import '../styles/cart.scss';
import Navbar from './Navbar';
import NavBlockItems from './NavBlockItems';
import html2canvas from 'html2canvas';

const Cart = ({cart}) => {
    const navigate = useNavigate();
    const basketProductsFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const [basketProducts, setBasketProducts] = useState(basketProductsFromStorage);
    const [counts, setCounts] = useState({});

    const increment = (id) => {
        setCounts(prevCounts => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 0) + 1
        }));
    };

    const decrement = (id) => {
        if (counts[id] && counts[id] > 0) {
            setCounts(prevCounts => ({
                ...prevCounts,
                [id]: prevCounts[id] - 1
            }));
        }
    };

    const deleteFromBasket = (id) => {
        const confirmation = window.confirm("Удалить товар из корзины?");
        if (confirmation) {
            const updatedBasket = basketProducts.filter(productId => productId !== id);
            setBasketProducts(updatedBasket);
            localStorage.setItem('cart', JSON.stringify(updatedBasket));
        }
    };

    const cascadeDeleteFromBasket = () => {
        const confirmation = window.confirm("Удалить все товары из корзины?");
        if (confirmation) {
            setBasketProducts([]);
            localStorage.removeItem('cart');
        }
    };
    const isEmpty = basketProducts.length === 0;
    useEffect(() => {
        const basketProductsFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        setBasketProducts(basketProductsFromStorage);
    }, []);

    const goToAnotherPage = () => {
        navigate('/');
    };
    const printScreen = () => {
        html2canvas(document.querySelector(".primedec")).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'Корзина Строй Декор.png';
            link.click();
        });
    };

    return (
        <div>
            <Navbar />
            <NavBlockItems />
            <h1 className='section-header'>Корзина</h1>
            <div className='primedec-container'>
                {basketProducts.length === 0 ? (
                    <button onClick={goToAnotherPage} className='main-page'>Главная страница</button>
                ) : (
                    <div className='primedec'>
                        {Catalog.filter(record => basketProducts.includes(record.id)).map(record => (
                            <div className='duties' key={record.id}>
                                <img src={require(`../assets/catalog/primeDecor/${record.image}.jpg`)} alt={record.image} />
                                <p className='name'>{record.image}</p>
                                    <div>
                                        <div className='cont-items-basket'>
                                            <div className='items-quantity-cont'>
                                                <button onClick={() => decrement(record.id)}>-</button>
                                                <p className='count-p'>{counts[record.id] || 0}</p>
                                                <button onClick={() => increment(record.id)}>+</button>
                                            </div>
                                            <button className="delete-btn" onClick={() => deleteFromBasket(record.id)}>Удалить</button>
                                        </div>
                                    </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {!isEmpty ? (
                <div className='print-delete-container'>
                    <button onClick={printScreen} className='print-screen'>Скачать список</button>
                    <button className='cascade-delete' onClick={cascadeDeleteFromBasket}>Удалить товары</button>
                </div>
            ) : null}
            
        </div>
    );
};

export default Cart;
