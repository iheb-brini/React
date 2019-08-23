import * as actionTypes from './actions';


const initialState = {
    records: [],
    deleteProduct: {
        showModal: false,
        productID: null
    }
};

const reducer = (state = initialState, action) => {
    let newRecords = state.records;
    let postion = 0;

    switch (action.type) {
        case actionTypes.SHOW_DELETE_MODAL:
            return {
                ...state,
                deleteProduct: {
                    showModal: action.show,
                    productID: action.id
                }
            }
        case actionTypes.READ_PRODUCTS:
            return {
                ...state,
                records: action.records
            }
        case actionTypes.UPDATE_PRODUCT:
            newRecords = state.records;
            postion = 0;
            // eslint-disable-next-line
            for (let index in newRecords) {
                if (newRecords[index].id === action.updatedProduct.id)
                    postion = index
            }
            newRecords[postion] = {
                ...newRecords[postion],
                ...action.updatedProduct
            }

            return {
                ...state,
                records: newRecords
            }
        case actionTypes.DELETE_PRODUCT:
            newRecords = state.records;
            postion = 0;
            // eslint-disable-next-line
            for (let index in newRecords) {
                if (newRecords[index].id === action.id)
                    postion = index
            }
            newRecords.splice(postion, 1)
            return {
                ...state,
                records: newRecords
            }
        default:
            return state;
    }
};

export default reducer;
