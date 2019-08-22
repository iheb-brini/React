import React, { Component } from 'react'
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios.production';
import Spinner from '../../../components/UI/Spinner/Spinner';
import myData from './form.json';
import Aux from '../../../hoc/Auxi/Auxi';
import bootstrap from '../../../assets/css/bootstrap.min.css';
import classes from './ProductUpdate.css';


export default class ProductUpdate extends Component {
    state = {
        product_details: {

        },
        form_details: {
            ...myData
        },
        canSend: false,
        formIsValid: false
    }

    async componentDidMount() {
        await this.updateProduct();
        // console.log(this.state.form_details['name']);

        const newObject = { ...this.state.form_details };
        for (let key of Object.keys(newObject)) {
            newObject[key]['value'] = this.state.product_details[key];
        }

        this.setState({
            form_details: { ...newObject },
            canSend: true
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
    }

    inputChangedHandler = (event, inputIdentifier) => {
        let newform_details = {
            ...this.state.form_details
        }
        let newFormElementValues = {
            ...newform_details[inputIdentifier]
        }

        newFormElementValues.value = event.target.value;

        newform_details[inputIdentifier] = newFormElementValues;

        let formIsValid = true;


        this.setState({
            form_details: { ...newform_details },
            formIsValid: formIsValid
        })
    }

    jsUcfirst(ch) {
        return ch.charAt(0).toUpperCase() + ch.slice(1);
    }


    render() {
        let content = (
            <Spinner />
        );

        if (this.state.canSend) {
            const formElements = [];
            for (let key in this.state.form_details) {
                formElements.push({
                    id: key,
                    config: this.state.form_details[key]
                });
            }

            let tableClasses = [classes.Table, bootstrap['table'],
            bootstrap['table-hover'] , bootstrap['table-bordered']];
            content = (
                <form onSubmit={this.formHandler}>
                    <table className={tableClasses.join(' ')}>
                        {formElements.map(formElement => (
                            <tr key={formElement.id}>
                                <td>{formElement.id === 'category_name' ?
                                    'Category name' : this.jsUcfirst(formElement.id)}</td>
                                <td>
                                    <Input
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementconfig}
                                        value={formElement.config.value}
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
                    </table>
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
