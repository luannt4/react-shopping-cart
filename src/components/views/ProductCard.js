import React from 'react';
import {Link} from 'react-router-dom';
import AddToCart from './AddToCart';
import Price from "../helpers/Price";
import Discount from "../helpers/Discount";

export default ({product, currency}) => {

    return (
        <div className="col-6 col-sm-3">

            <div className="product-box card mb-4 shadow-sm">
                <div className="bd-placeholder-img">
                    <Link to={"/product-detail/" + product.Id}>
                        <img className="card-img-top" alt={product.Title} src={product.ImageUrl}/>
                    </Link>
                    <Discount product={product}/>
                </div>
                <div className="card-body">
                    <h6 className="card-title">
                        <Link to={"/product-detail/" + product.Id}>{product.Title}</Link>
                    </h6>
                    <p className="card-text ">Category: {product.Category}</p>
                    <p className="card-price">
                        <Price product={product} currency={currency}/>
                    </p>

                    <p className="card-text d-none">Stock: {product.inventory > 0 ? product.inventory : 'Sold Out'}</p>

                    <AddToCart product={product}/>
                </div>
            </div>

        </div>
    );
}
