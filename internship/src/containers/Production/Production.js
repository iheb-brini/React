import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios.production';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Dashboard from '../../components/UI/Dashboard/Dashboard';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Route, Switch } from 'react-router-dom';
import classes from '../../assets/css/bootstrap.min.css';
import Productdetails from './Productdetails/Productdetails';
import ProductUpdate from './ProductUpdate/ProductUpdate';
import ProductDelete from './ProductDelete/ProductDelete';
import Aux from '../../hoc/Auxi/Auxi';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import ProductCreate from './ProductCreate/ProductCreate';
import { stringLiteral } from '@babel/types';


class Production extends Component {

    state = {
        canReload: true,
    }

    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    componentDidMount() {
        console.log('Production mount');
        //this.props.onProductRead();

        this.readProducts();
        console.log(this.props.loading);

    }

    componentDidUpdate() {
        console.log('did update');
    }

    deleteHandler(id) {
        //console.log('clicked ', id);
        this.props.onDeletionModel(true, id);
    }
    confirmDeletetion() {

        let formData = {
            id: this.props.modal.productID
        }
        axios.post('product/delete', formData)
            .then(response => {
                console.log(response.data);
                this.props.onProductDeletion(this.props.modal.productID);
                //this.props.deletionModel(false, null);
            })
            .catch(err => {
            })
            .finally(() => {
                this.props.onDeletionModel(false, null)
            })
    }
    cancelDeletetion() {
        this.props.onDeletionModel(false, null)
    }


    readProducts() {

        axios.get('product/read')
            .then(response => {
                this.props.onProductRead(response.data['records'])
            })
            .catch(err => console.log(err));
    }
    render() {
        let crud = <Spinner />;
        console.log('kk' + this.props.records);
        console.log(this.props.records);

        if (this.props.records.length > 0)
            crud = (
                <Switch>
                    <Route path={this.props.match.url + "/create"} render={() => (
                        <ProductCreate {...this.props} />
                    )} />
                    <Route path={this.props.match.url + "/delete"} render={() => (
                        <ProductDelete {...this.props} />
                    )} />
                    <Route path={this.props.match.url + "/update/:id"} render={() => (
                        <ProductUpdate  {...this.props} />
                    )} />
                    <Route path={this.props.match.url + "/details/:id"} render={() => (
                        <Productdetails {...this.props} />
                    )} />
                    <Route path="/products" render={() => (
                        <Aux>
                            <Modal show={this.props.modal.showModal} modalClosed={this.cancelDeletetion.bind(this)}>
                                <p>Are you sure?</p>
                                <Button btnType='Success' clicked={this.confirmDeletetion.bind(this)}>CONFIRM</Button>
                                <Button btnType='Danger' clicked={this.cancelDeletetion.bind(this)}>CANCEL</Button>
                            </Modal>
                            <NavLink to='/products/create' >Create Product</NavLink>

                            <Dashboard
                                clicked={this.deleteHandler.bind(this)}
                                {...this.props}
                                records={this.props.records} />
                        </Aux>

                    )} />
                </Switch>
            );



        return (
            <div className={classes["container"]}>
                {crud}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        records: state.records,
        modal: state.deleteProduct,
        loading: state.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onProductRead: (records) => dispatch(actions.readProducts(records)),
        onProductsInit: () => dispatch(actions.requestProducts()),
        onProductDeletion: (id) => dispatch(actions.deleteProduct(id)),
        onDeletionModel: (show, id) => dispatch(actions.showDeleteModel(show, id)),
        onCategoryRead: () => dispatch(actions.requestProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Production, axios));