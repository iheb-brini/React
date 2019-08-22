import React, { Component } from 'react'
import classes from './Login.css';


import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-auth';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


export default class Login extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'email',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'text',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'text',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Your zipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 8,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'text',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementconfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {
                },
                valid: true,
                touched: false
            }
        },
        loading: false,
        formIsValid: false

    }


    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const formData = {};
        // eslint-disable-next-line
        for (let formEltId in this.state.orderForm) {
            formData[formEltId] = this.state.orderForm[formEltId].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then((response) => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
                this.props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false,
                    purchasing: false
                })
            });
    }

    checkValidaty(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidaty(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;

        let formIsValid = true;
        // eslint-disable-next-line
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid;
        }
 

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    };

    render() {
        const formElementsArray = [];
        // eslint-disable-next-line
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementconfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => { this.inputChangedHandler(event, formElement.id) }} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        )
    }
}
