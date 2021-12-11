import React, { useEffect} from 'react';
import {connect,useDispatch} from 'react-redux';

import * as actions from '../../actions';
import AddToCart from '../views/AddToCart';
import {AddToCartContext} from '../../contexts/AddToCartContext';
import Loading from "../helpers/Loading";
import Price from "../helpers/Price";

const ProductDetails = (props) =>{
    const dispatch = useDispatch();
    const {loading, productDetails} = props;

    useEffect(()=>{
        dispatch(actions.getProductDetails(props.productId))
        },[dispatch,props.productId])

    if (loading) return <Loading />;
    return (
        // Passing AddToCartContext as it might be used at any deep level child.
        <AddToCartContext.Provider value={{action: props.addToCartAction}}>
            <div>
                {typeof productDetails !== 'undefined' &&
                <React.Fragment>
                    <h3 className="center mb-3"> {productDetails.Title}</h3>

                    <div className="product-box card mb-3">
                        <div className="card-body">
                            <div className="text-center mb-3">
                                <img alt={productDetails.Title}
                                     src={productDetails.ImageUrl}/>
                            </div>
                            <p className="card-text description">
                                {productDetails.Description}
                            </p>

                            <p className="card-text"><b>Category:</b> {productDetails.Category}</p>
                          <p className="card-text ">
                            <b>inventory:</b> {productDetails.inventory}
                          </p>
                            <p className="card-text"><b>Made by:</b> {productDetails.Manufacturer}</p>
                            <p className="card-text">
                                <b>Organic:</b> {productDetails.Organic ? 'Yes' : 'No'}</p>
                            <p className="card-text mb-5">
                                <b>Price:</b>
                                <Price product={productDetails} currency={props.usedCurrencyProp}/>
                            </p>

                            <AddToCart product={props.productDetails}/>
                        </div>
                    </div>
                </React.Fragment>
                }
            </div>
        </AddToCartContext.Provider>
    );

}

const mapStateToProps = state => {
    return {
        productDetails: state.products.productDetails,
        loading :state.products.loading,
        usedCurrencyProp: state.cart.usedCurrency,

    };
}

export default connect(mapStateToProps, actions)(ProductDetails);
