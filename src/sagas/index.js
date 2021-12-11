import {delay} from 'redux-saga';

import { put, takeLatest, all,takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGetProduct() {
  yield delay(1000);
  const json = yield axios.get('/data/ProductData.json')
      .then(response => {
        return response.data.Products;
      })
      .catch(error => {
        return error;
      });

  yield put({ type: "FETCH_PRODUCTS", products: json || [{ error: json.message }] });

}

function* fetchProductDetail(action) {
    yield delay(1000);
    const json = yield axios.get('/data/ProductData.json')
        .then(response => {
            const ProductDetail = response.data.Products.find(product => {
                return product.Id.toString() === action.productId.toString()
            });
            return ProductDetail;
        })
        .catch(error => {
            return error;
        });

    yield put({ type: "FETCH_PRODUCT_DETAILS", productDetails: json || [{ error: json.message }] });

}

function* actionWatcher() {
    yield takeLatest('GET_PRODUCTS', fetchGetProduct)
    yield takeEvery('GET_PRODUCTS_DETAIL', fetchProductDetail)

}


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
