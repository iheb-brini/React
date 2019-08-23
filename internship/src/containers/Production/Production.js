import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import axios from '../../axios.production';
import Dashboard from '../../components/UI/Dashboard/Dashboard';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import { Route, Switch } from 'react-router-dom';
import classes from '../../assets/css/bootstrap.min.css';
import Productdetails from './Productdetails/Productdetails';
import ProductUpdate from './ProductUpdate/ProductUpdate';
import ProductDelete from './ProductDelete/ProductDelete';
import Aux from '../../hoc/Auxi/Auxi';


class Production extends Component {

    state = {
        canReload: true
    }

    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    componentDidMount() {
        console.log('Production mount');
        this.readProducts();
        this._isMounted = true;

    }

    deleteHandler(id) {
        //console.log('clicked ', id);
        this.props.deletionModel(true, id);
    }
    confirmDeletetion() {

        let formData = {
            id: this.props.modal.productID
        }
        axios.post('product/delete', formData)
            .then(response => {
                console.log(response.data);
                this.props.deleteProduct(this.props.modal.productID);
                //this.props.deletionModel(false, null);
            })
            .catch(err => {
            })
            .finally(() => {
                this.props.deletionModel(false, null)
            })
    }
    cancelDeletetion() {
        this.props.deletionModel(false, null)
    }


    readProducts() {

        axios.get('product/read')
            .then(response => {
                this.props.onProductCreate(response.data['records'])
                console.log(response.data['records']['1']);

            })
            .catch();
    }
    render() {
        return (
            <div className={classes["container"]}>
                <Switch>
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

                            <Dashboard
                                clicked={this.deleteHandler.bind(this)}
                                {...this.props}
                                records={this.props.records} />
                        </Aux>

                    )} />
                </Switch>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        records: state.records,
        modal: state.deleteProduct
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onProductCreate: (records) => dispatch({
            type: actionTypes.READ_PRODUCTS,
            records: records
        }),
        deletionModel: (show, id) => dispatch({
            type: actionTypes.SHOW_DELETE_MODAL,
            show: show,
            id: id
        }),
        deleteProduct: (id) => dispatch({
            type: actionTypes.DELETE_PRODUCT,
            id: id
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Production);