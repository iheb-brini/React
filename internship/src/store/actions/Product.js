import * as actionTypes from './actionType';
import axios from '../../axios.production';

export const createProduct = (createdProduct) => {
    return {
        type: actionTypes.CREATE_PRODUCT,
        createdProduct: createdProduct
    }
};


export const readProducts = (records) => {
    return {
        type: actionTypes.READ_PRODUCTS,
        records: records
    }
};

export const requestProducts = () => {
    return dispatch => {
        axios.get('product/')
            .then(response => {
                console.log(response.data);
                dispatch(readProducts(response.data))
            })
            .catch(err => {
                dispatch(readProducts(err))
            });
    }
};

export const updateProduct = (updatedProduct) => {
    return {
        type: actionTypes.UPDATE_PRODUCT,
        updatedProduct: updatedProduct
    }
};

export const showDeleteModel = (show, id) => {
    return {
        type: actionTypes.SHOW_DELETE_MODAL,
        show: show,
        id: id
    }
};

export const deleteProduct = (id) => {
    return {
        type: actionTypes.DELETE_PRODUCT,
        id: id
    }
};