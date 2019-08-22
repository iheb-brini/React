import React, { Component } from 'react'
import axios from '../../axios.production';
import Dashboard from '../../components/UI/Dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom';
import classes from '../../assets/css/bootstrap.min.css';
import Productdetails from './Productdetails/Productdetails';
import ProductUpdate from './ProductUpdate/ProductUpdate';


export default class Production extends Component {

    state = {
        records: {}
    }

    componentDidMount() {
        axios.get('product/read')
            .then(response => {
                this.setState({
                    records: response.data['records']
                })
            })
            .catch();
    }


    render() {
        return (
            <div className={classes["container"]}>
                <Switch>
                    <Route path={this.props.match.url + "/delete"} render={() => (
                        <h1>delete</h1>
                    )} />
                    <Route path={this.props.match.url + "/update/:id"} render={() => (
                        <ProductUpdate  {...this.props} />
                    )} />
                    <Route path={this.props.match.url + "/details/:id"} render={() => (
                        <Productdetails {...this.props} />
                    )} />
                    <Route path="/products" render={() => (
                        <Dashboard
                            {...this.props}
                            records={this.state.records} />
                    )} />
                </Switch>

            </div>
        )
    }
}
