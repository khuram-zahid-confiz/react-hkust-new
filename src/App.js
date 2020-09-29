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
  const [dishes, dispatchActionDishes] = useReducer(dishReducer, DISHES);
  const [comments, dispatchActionComments] = useReducer(commentReducer, COMMENTS);
  const [promotions, dispatchActionPromotions] = useReducer(promotionReducer, PROMOTIONS);
  const [leaders, dispatchActionLeaders] = useReducer(leaderReducer, LEADERS);

  const DishWithId = (props) => {
    return(
      <Dishdetail 
        dish={dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId,10))[0]} 
        comments={comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId,10))} 
        addComment={dispatchActionComments}
      />
    );
  };

  const Homepage = ({dishes, promotions, leaders}) => {
    return (
      <Home 
        dish={dishes.filter((dish) => dish.featured)[0]} 
        promotion={promotions.filter((promo) => promo.featured)[0]} 
        leader={leaders.filter((leader) => leader.featured)[0]} 
      />
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