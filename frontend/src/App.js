
import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';

import loginPage from './Pages/loginPage';
import prosumer from './Pages/prosumer';
import simulatorEvents from './Pages/simulatorEvents';
import MainNavigation from './Component/Navigation/mainNavigation';


class App extends Component {
  render(){
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
         <Switch>
           <Redirect from ="/" to="/loginPage" exact/>
            <Route path ="/loginPage" component={loginPage} />
            <Route path ="/simulatorEvents" component={simulatorEvents}/>
            <Route path ="/prosumer" component={prosumer}/>
         </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
  }
}
export default App;