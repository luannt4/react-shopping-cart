import React, {Component} from 'react';

import {AddToCartContext} from '../../contexts/AddToCartContext';
import ProductListSummary from '../views/ProductListSummary';
import ProductCard from '../views/ProductCard';
import Pagination from '../helpers/Pagination';
import Loading from "../helpers/Loading";

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            currentPage: 1,
            perPage: 12
        }
    }

    getPagedData = () => {
        const currentPageItemStart = (this.state.currentPage - 1) * this.state.perPage;
        const currentPageItemEnd = currentPageItemStart + this.state.perPage;
        return [currentPageItemStart, currentPageItemEnd];
    }

    handleThisPage = (number) => {
        this.setState({currentPage: number});
    }

    handlePreviousPage = () => {
        if (this.state.currentPage > 0) {
            this.setState({currentPage: (this.state.currentPage - 1)});
        }
    }

    handleNextPage = () => {
        const lastPage = Math.ceil(this.props.products.length / this.state.perPage);
        if (this.state.currentPage < lastPage) {
            this.setState({currentPage: (this.state.currentPage + 1)});
        }
    }

    render() {
        const {loading} =  this.props;
        if (loading) return <Loading />;

        const totalProductCount = this.props.products.length;

        const [currentPageItemStart, currentPageItemEnd] = this.getPagedData();
        const currentPageProducts = this.props.products.slice(currentPageItemStart, currentPageItemEnd);
        const productListMarkup = currentPageProducts.map(product =>
            <ProductCard product={product} key={product.Id}  currency={this.props.usedCurrencyProp}/>
        );

        // Passing AddToCartContext as it might be used at any deep level child.
        return (
            <AddToCartContext.Provider value={{action: this.props.addToCartAction}}>
                <div className="container home-container">
                    <div className="row justify-content-between mb-3">
                        <div className={'col-sm-6'}>
                            <h3 className="center">Product {this.props.pageName}</h3>
                        </div>
                        <div className={'col-sm-6 text-right'}>
                            <ProductListSummary
                                currentPageItemStart={currentPageItemStart}
                                currentPageItemEnd={currentPageItemEnd}
                                totalProductCount={totalProductCount}
                            />
                        </div>
                    </div>
                    <div className="row">
                        {productListMarkup}
                    </div>
                    <Pagination currentPage={this.state.currentPage} perPage={this.state.perPage}
                                totalProductCount={totalProductCount} handlePreviousPage={this.handlePreviousPage}
                                handleThisPage={this.handleThisPage} handleNextPage={this.handleNextPage}/>

                </div>
            </AddToCartContext.Provider>
        );

    }
}

