import React, { Component } from 'react'
import Details from '../../../components/UI/Dashboard/Details/Details';
import axios from '../../../axios.production';
import Spinner from '../../../components/UI/Spinner/Spinner';


export default class Productdetails extends Component {
    state = {
        product_details: {
            "id": 0,
            "name": null,
            "description": null,
            "price": 0,
            "category_id": 0,
            "category_name": null
        },
        canSend: false
    }

    componentDidMount() {
        this.updateProductDetails();
    }

    updateProductDetails() {
        let id = +this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);
        axios.get('/product/read_one?id=' + id)
            .then(response => {

                this.setState({
                    product_details: response.data,
                    canSend: true
                })
            })
            .catch()
    }



    render() {
        let content = (
            <Spinner />
        );

        if (this.state.canSend) {
            content = (
                <Details {...this.props} details={this.state.product_details} />
            )
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}
