import React, { Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Aux from '../Auxi/Auxi';


class Layout extends Component {
    state = {
        showSideDrawer: false,
        signed_in: true
    }

    SideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    SideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    }

    toggleLogging = () => {
        this.setState({
            signed_in: !this.state.signed_in
        });
    };


    render() {
        return (
            <Aux>
                <Toolbar signed_in={this.state.signed_in} drawerToggleClicked={this.SideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.SideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>

            </Aux>
        )
    }
}

export default Layout;