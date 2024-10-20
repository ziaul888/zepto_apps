import React from 'react';

const Loader = () => {
    return (
        <div className="loading-container">
            <div className="loading-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    );
};

export default Loader;