import React, { Component } from 'react'
import axios from '../../axios.production';
import Dashboard from '../../components/UI/Dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom';


export default class Production extends Component {

    state = {
        records: {}
    }

    componentDidMount() {
        console.log(this.props.match.url);

        axios.get('product/read')
            .then(response => {
                this.setState({
                    records: response.data['records']
                })
            })
            .catch();
    }

    readproducthandler(id) {
        console.log('created ' + id);
    }

    updateproducthandler(id) {
        console.log('updated ' + id);
    }

    deleteproducthandler(id) {
        console.log('deleted ' + id);
    }

    render() {
        return (
            <div className="container">
                <Switch>
                    <Route path={this.props.match.url+ "/delete"} render={() => (
                        <h1>delete</h1>
                    )} />
                    <Route path="/update/:id" render={() => (
                        <h1>update</h1>
                    )} />
                    <Route path="/details/:id" render={() => (
                        <h1>details</h1>
                    )} />
                    <Route path="/" exact render={() => (
                        <Dashboard
                            details={this.readproducthandler}
                            update={this.updateproducthandler}
                            delete={this.deleteproducthandler}
                            records={this.state.records} />
                    )} />
                </Switch>

            </div>
        )
    }
}
