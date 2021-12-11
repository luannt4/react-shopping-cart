import React, { useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import * as actions from '../../actions';
import ProductList from "../containers/ProductList";

const Sale = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getProducts())
  }, [dispatch]);

  return(
        <ProductList
            products={props.products}
            loading={props.loading}
            usedCurrencyProp={props.usedCurrencyProp}
            cart={props.cart}
            pageName={props.pageName}
            addToCartAction={props.addToCartAction}
        />

  );
}

const mapStateToProps = state => {
  return {
    products: state.products.allProducts.filter(product => product.sale === true),
    loading :state.products.loading,
    usedCurrencyProp: state.cart.usedCurrency,
    cart: state.cart.cartItem
  }

}

export default connect(mapStateToProps, actions)(Sale);
