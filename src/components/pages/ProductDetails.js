import React, { useEffect} from 'react';
import ProductDetails from '../containers/ProductDetails';

export default  (props) => {
    console.log(props.match);
    const { match: { params: { productId } } } = props; // this.props.match.params.productId
    return(
      <div className="container main-container">
        <ProductDetails productId={productId} />
      </div>
    )

}
