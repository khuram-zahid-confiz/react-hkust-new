import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Menu from './components/MenuComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Home from './components/HomeComponent';
import Contact from './components/ContactComponent';
import Dishdetail from './components/DishdetailComponent';
import About from './components/AboutComponent';
import { reducer } from './reducers';
import Axios from 'axios';

export default function App () {
  const dishesTemp = useRef(null);
  const commentsTemp = useRef(null);
  const promotionsTemp = useRef(null);
  const leadersTemp = useRef(null);
  const freshStart = useRef(true);
  const [state, dispatch] = useReducer(reducer, {
    dishes: null, 
    comments: null, 
    promotions: null, 
    leaders: null
  });
  
  useEffect(() => {(
    async () => {
      if(dishesTemp.current == null) {
        const dishesResponse = await Axios.get(`http://localhost:3001/dishes`);
        dishesTemp.current = dishesResponse.data;
      }
      if(commentsTemp.current == null) {
        const commentsResponse = await Axios.get(`http://localhost:3001/comments`);
        commentsTemp.current = commentsResponse.data;
      }
      if(promotionsTemp.current == null) {
        const promotionsResponse = await Axios.get(`http://localhost:3001/promotions`);
        promotionsTemp.current = promotionsResponse.data;
      }
      if(leadersTemp.current == null) {
        const leadersResponse = await Axios.get(`http://localhost:3001/leaders`);
        leadersTemp.current = leadersResponse.data;
      }
      if(freshStart.current) {
        freshStart.current = false;
        if(state.dishes == null)
          dispatch({type: 'ADD_DISHES', payload: dishesTemp.current});
        if(state.comments == null)
          dispatch({type: 'ADD_COMMENTS', payload: commentsTemp.current});
        if(state.promotions == null)
          dispatch({type: 'ADD_PROMOTIONS', payload: promotionsTemp.current});
        if(state.leaders == null)
          dispatch({type: 'ADD_LEADERS', payload: leadersTemp.current});
      }
    })();
  }, []);

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