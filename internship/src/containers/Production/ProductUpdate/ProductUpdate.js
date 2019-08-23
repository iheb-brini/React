/*  eslint-disable  */

import React, { Component } from 'react'
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios.production';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import myData from './form.json';
import Aux from '../../../hoc/Auxi/Auxi';
import bootstrap from '../../../assets/css/bootstrap.min.css';
import classes from './ProductUpdate.css';


class ProductUpdate extends Component {
    state = {
        product_details: {

        },
        form_details: {
            ...myData
        },
        loading: true,
        formIsValid: true,

    }

    async componentDidMount() {
        await this.updateProduct();
        // console.log(this.state.form_details['name']);

        this.setState({
            loading: false
        })


        console.log(this.state.form_details);
    }

    updateProduct() {
        let id = +this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);
        return axios.get('/product/read_one?id=' + id)
            .then(response => {

                this.setState({
                    product_details: response.data,

                })
                //console.log(this.state.product_details);

            })
            .catch()
    }

    formHandler(event) {
        event.preventDefault();
        console.log('clicked');
        this.setState({
            loading: true
        })
        //console.log(this.state.product_details);

        // console.log(this.state.product_details);
        let formData = {
            ...this.state.product_details
        }


        delete formData.category_name;


        axios.post('product/update', formData)
            .then((response) => {
                console.log(response.data);
                this.props.onProductUpdate(formData);
                this.props.history.push(this.props.match.url);
                //this.props.match.url
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(this.state.product_details);

        const newproduct_details = {
            ...this.state.product_details
        }


        newproduct_details[inputIdentifier] = event.target.value;

        let formIsValid = true;


        this.setState({
            product_details: { ...newproduct_details },
            formIsValid: formIsValid
        })

        console.log(this.state.newproduct_details);


    }

    jsUcfirst(ch) {
        return ch.charAt(0).toUpperCase() + ch.slice(1);
    }


    render() {

        let content = (
            <Spinner />
        );

        if (!this.state.loading) {
            const formElements = [];
            for (let key in this.state.form_details) {
                formElements.push({
                    id: key,
                    config: this.state.form_details[key]
                });
            }

            let tableClasses = [classes.Table, bootstrap['table'],
            bootstrap['table-hover'], bootstrap['table-bordered']];
            content = (
                <form onSubmit={this.formHandler.bind(this)}>
                    <table className={tableClasses.join(' ')}>
                        <tbody>
                            {formElements.map(formElement => (
                                <tr key={formElement.id}>
                                    <td>{formElement.id === 'category_name' ?
                                        'Category name' : this.jsUcfirst(formElement.id)}</td>
                                    <td>
                                        <Input
                                            elementType={formElement.config.elementType}
                                            elementConfig={formElement.config.elementconfig}
                                            value={this.state.product_details[formElement.id]}
                                            invalid={!formElement.config.valid}
                                            shouldValidate={formElement.config.validation}
                                            touched={formElement.config.touched}
                                            changed={(event) => {
                                                this.inputChangedHandler(event, formElement.id)
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button className={classes['Button']} btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
                </form>
            )

        }
        return (
            <Aux>
                {content}
            </Aux>

        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        onProductUpdate: (updatedProduct) => dispatch({
            type: actionTypes.UPDATE_PRODUCT,
            updatedProduct: updatedProduct
        }),
    }
}

export default connect(null, mapDispatchToProps)(ProductUpdate);