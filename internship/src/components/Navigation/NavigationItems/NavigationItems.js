import React from 'react'
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxi/Auxi';


export default (props) => {
    let navItems = (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/signin' exact>login</NavigationItem>
            <NavigationItem link='/register'>register</NavigationItem>
        </ul>
    );
    if (props.signed_in) {
        navItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link='/' exact>Home</NavigationItem>
                <NavigationItem link='/account' exact>account</NavigationItem>
                <NavigationItem link='/logout'>Sign-out</NavigationItem>
            </ul>
        )
    }

    return (
        <Aux>
            {navItems}
        </Aux>
    )



}

