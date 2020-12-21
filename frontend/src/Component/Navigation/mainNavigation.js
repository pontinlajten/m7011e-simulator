import React from 'react';
import {NavLink} from 'react-router-dom';

import './mainNavigator.css'

const MainNavigation = props => (
    <header className="naviagtionBar">
        <div className="navigationBarPic">
        <h1>poggers</h1>
        </div>
        <div className="navigationBarItems">
            <ul>
                <li><NavLink to="/loginPage"> Login</NavLink> </li>
                <li><NavLink to="/prosumer"> Prosumer</NavLink> </li>
                <li><NavLink to="/simulatorEvents"> simulatorEvents</NavLink> </li>

               
            </ul>
        </div>
    </header>
);



export default MainNavigation;