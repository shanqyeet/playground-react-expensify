import React from 'react';
import {NavLink} from 'react-router-dom';


const Header = () => (
    <header>
        <h1><NavLink to="/" exact={true}>Expensify</NavLink></h1>
        <ul> 
            <li><NavLink activeClassName="is-active" to="/create">Create</NavLink></li>
            <li><NavLink activeClassName="is-active" to="/help">Help</NavLink></li>
        </ul> 
    </header>
);

export default Header