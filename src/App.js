import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Menu from './components/MenuComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Home from './components/HomeComponent';
import { DISHES } from './shared/dishes';

export default function App () {
  const [state, setState] = useState({
    dishes: DISHES
  });
  return (
    <BrowserRouter>
      <div>
        <Header />
          <Switch>
            <Route path='/home' component={ () => <Home /> } />
            <Route exact path='/menu' component={ () => <Menu {...state} /> } />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}