import React, { useEffect, useMemo, useReducer } from 'react';
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
  const [state, dispatch] = useReducer(reducer, {
    dishes: null, 
    comments: null, 
    promotions: null, 
    leaders: null
  });

  const HeaderView = useMemo(()=>{
    console.log("Header Component rendered");
    return (<Header />);
  }, []);

  const FooterView = useMemo(() => {
    console.log("Footer Component rendered");
    return (<Footer />);
  }, []);
  
  useEffect(() => {
      Axios.get(`http://localhost:3001/dishes`)
        .then((dishesResponse)=>{dispatch({type: 'ADD_DISHES', payload: dishesResponse.data})});
      Axios.get(`http://localhost:3001/comments`)
        .then((commentsResponse)=>{dispatch({type: 'ADD_COMMENTS', payload: commentsResponse.data})});
      Axios.get(`http://localhost:3001/promotions`)
        .then((promotionsResponse)=>{dispatch({type: 'ADD_PROMOTIONS', payload: promotionsResponse.data})});
      Axios.get(`http://localhost:3001/leaders`)
        .then((leadersResponse)=>{dispatch({type: 'ADD_LEADERS', payload: leadersResponse.data})});
    }
  , []);

  const DishWithId = (props) => {
    const dish = state.dishes != null ? state.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId,10))[0] : null;
    const comments = state.comments != null ? state.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId,10)) : null;
    return (
      <Dishdetail dish={dish} comments={comments} addComment={dispatch} />
    );
  };

  const Homepage = ({dishes, promotions, leaders}) => {
    const featuredDish = dishes != null ? dishes.filter((dish) => dish.featured)[0] : null;
    const featuredPromotion = promotions != null ? promotions.filter((promo) => promo.featured)[0] : null;
    const featuredLeader = leaders != null ? leaders.filter((leader) => leader.featured)[0] : null;
    return (
      <Home dish={featuredDish} promotion={featuredPromotion} leader={featuredLeader} />
    );
  }

  return (
    <BrowserRouter>
      <div>
        {HeaderView}
        <Switch>
          <Route path='/home' component = {() => <Homepage {...state} />} />
          <Route exact path='/menu' component = { () => <Menu dishes={state.dishes} /> } />
          <Route exact path='/contactus' component = {Contact} />
          <Route exact path='/aboutus' component = {() => <About leaders={state.leaders} />} />
          <Route path='/menu/:dishId' component = {DishWithId} />
          <Redirect to="/home" />
        </Switch>
        {FooterView}
      </div>
    </BrowserRouter>
  );
}