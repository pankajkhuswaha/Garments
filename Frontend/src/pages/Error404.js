import React from 'react';
import broken from '../images/empty-cart.jpg'; // assuming this is the URL for a broken/error image

const Error404 = () => {
  const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${broken})`,
    backgroundSize: 'cover',
    mixBlendMode: 'overlay'
  };

  return (
    <div style={style}>
      <h1 className="title">404</h1>
    </div>
  );
};

export default Error404;