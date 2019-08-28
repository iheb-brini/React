import * as actionTypes from './actionType';
import axios from '../../axios.production';


export const readCategory = (records) => {
    return {
        type: actionTypes.READ_CATEGORY,
        records: records
    }
}

export const requestCategory = dispatch => {
    return dispatch => {
        axios.get('category/read')
            .then((response) => {
                dispatch(readCategory(response.data))
            })
            .catch()
    }
}
