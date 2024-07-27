import React from 'react';
import '../styles/popup.scss';

const Popup = ({ message }) => {
    return (
        <div className="popup">
            {message}
        </div>
    );
};

export default Popup;
