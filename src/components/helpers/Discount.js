import React from 'react';

export default (props) => {
    const {product} = props;

    if (product.sale) {
        return (
            <span className="shop-card-discount">
               {Math.round(((product.discount_price - product.Price) * 100) / product.Price)}% Off
           </span>
        );
    }
    return false;

}
