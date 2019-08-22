import React from 'react'
import shopLogo from '../../../assets/images/shop.png';
import classes from './Logo.css'
const logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={shopLogo} alt="My burger" />
        </div>
    )
}

export default logo
