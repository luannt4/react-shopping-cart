import React from 'react';

export default (props) => {
    const {product} = props;
    const currencyKeys = Object.keys(props.currency);
    let currencyValue = props.currency[currencyKeys[0]];
    let currencyName = props.currency[currencyKeys[1]];

    if (product.sale) {
        return (
            <>
                    <span className={'price'}>
                             {currencyName === 'đ' ?
                                 (`${Math.round(product.discount_price * currencyValue).toLocaleString()}${currencyName}`) :
                                 (`${currencyName}${Math.round(product.discount_price * currencyValue).toLocaleString()} `)}
                    </span>
                <span className={'price price--noSale'}>
                            {currencyName === 'đ' ?
                                (`${Math.round(product.Price * currencyValue).toLocaleString()}${currencyName}`) :
                                (`${currencyName}${Math.round(product.Price * currencyValue).toLocaleString()} `)}
                        </span>
            </>
        );
    }else{
        return  <span className={'price '}>
                            {currencyName === 'đ' ?
                                (`${Math.round(product.Price * currencyValue).toLocaleString()}${currencyName}`) :
                                (`${currencyName}${Math.round(product.Price * currencyValue).toLocaleString()} `)}
                  </span>
    }
}
