import * as types from '../actions/action-types';
const initialState = {
  allProducts: [],
  loading: false,
  productDetails:[]
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return { ...state, loading: true };

    case types.FETCH_PRODUCTS:
      const allProducts = action.products;
      return { ...state, ...{ allProducts }, loading: false };
    case types.GET_PRODUCTS_DETAIL:
      return { ...state, loading: true };

    case types.FETCH_PRODUCT_DETAILS:
      const productDetails = action.productDetails;
      return { ...state, ...{ productDetails }, loading: false };

    default:
      return state;
  }
}

export default productsReducer;
