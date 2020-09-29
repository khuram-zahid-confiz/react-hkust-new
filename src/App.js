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
import { dishReducer, commentReducer, promotionReducer, leaderReducer } from './reducers';

export default function App () {
  const [dishes, dispatchActionDishes] = useReducer(dishReducer, null);
  const [comments, dispatchActionComments] = useReducer(commentReducer, null);
  const [promotions, dispatchActionPromotions] = useReducer(promotionReducer, null);
  const [leaders, dispatchActionLeaders] = useReducer(leaderReducer, null);

  const DishWithId = (props) => {
    if(dishes != null && comments != null)
      return (
        <Dishdetail 
          dish={dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId,10))[0]} 
          comments={comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId,10))} 
          addComment={dispatchActionComments}
        />
      );
    else
      return (
        <div></div>
      );
  };

  const Homepage = (props) => {
    if(props.dishes != null && props.promotions != null && props.leaders != null)
      return (
        <Home 
          dish={props.dishes.filter((dish) => dish.featured)[0]} 
          promotion={props.promotions.filter((promo) => promo.featured)[0]} 
          leader={props.leaders.filter((leader) => leader.featured)[0]} 
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
            <Route path='/home' component = {() => <Homepage dishes={dishes} promotions={promotions} leaders={leaders} />} />
            <Route exact path='/menu' component = { () => <Menu dishes={dishes} /> } />
            <Route exact path='/contactus' component = {Contact} />
            <Route exact path='/aboutus' component = {() => <About leaders={leaders} />} />
            <Route path='/menu/:dishId' component = {DishWithId} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}