import React, { useReducer } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Menu from './components/MenuComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Home from './components/HomeComponent';
import Contact from './components/ContactComponent';
import Dishdetail from './components/DishdetailComponent';
import About from './components/AboutComponent';
import { DISHES } from './shared/dishes';
import { COMMENTS } from './shared/comments';
import { PROMOTIONS } from './shared/promotions';
import { LEADERS } from './shared/leaders';
import { reducer } from './reducers';

export default function App () {
  const [state, dispatch] = useReducer(reducer, {dishes: null, comments: null, promotions: null, leaders: null});
  if(state.dishes == null)
    dispatch({type: 'ADD_DISHES', payload: DISHES});
  if(state.comments == null)
    dispatch({type: 'ADD_COMMENTS', payload: COMMENTS});
  if(state.promotions == null)
    dispatch({type: 'ADD_PROMOTIONS', payload: PROMOTIONS});
  if(state.leaders == null)
    dispatch({type: 'ADD_LEADERS', payload: LEADERS});

  const DishWithId = (props) => {
    if(state.dishes != null && state.comments != null)
      return (
        <Dishdetail 
          dish={state.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId,10))[0]} 
          comments={state.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId,10))} 
          addComment={dispatch}
        />
      );
    else
      return (
        <div></div>
      );
  };

  const Homepage = ({dishes, promotions, leaders}) => {
    if(dishes != null && promotions != null && leaders != null)
      return (
        <Home 
          dish={dishes.filter((dish) => dish.featured)[0]} 
          promotion={promotions.filter((promo) => promo.featured)[0]} 
          leader={leaders.filter((leader) => leader.featured)[0]} 
        />
      );
    else
      return (
        <div></div>
      );
  }

  return (
    <BrowserRouter>
      <div>
        <Header />
          <Switch>
            <Route path='/home' component = {() => <Homepage {...state} />} />
            <Route exact path='/menu' component = { () => <Menu dishes={state.dishes} /> } />
            <Route exact path='/contactus' component = {Contact} />
            <Route exact path='/aboutus' component = {() => <About leaders={state.leaders} />} />
            <Route path='/menu/:dishId' component = {DishWithId} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}