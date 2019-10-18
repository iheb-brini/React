import * as actionTypes from '../actions/actionType';


const initialState = {
    records: [],
    loading: false,
    deleteProduct: {
        showModal: false,
        productID: null
    },
    categories: []
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
        case actionTypes.CREATE_PRODUCT:
            newRecords = state.records;
            postion = 0;

            newRecords.push(action.createdProduct);
            // eslint-disable-next-line

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
        case actionTypes.READ_CATEGORY:
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
/*         case actionTypes.READ_CATEGORY:
            return {
                ...state,
                categories: action.records
            } */
        default:
            return state;
    }
};

export default reducer;
