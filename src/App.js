import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Menu from './components/MenuComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Home from './components/HomeComponent';
import Contact from './components/ContactComponent';
import Dishdetail from './components/DishdetailComponent';
import { DISHES } from './shared/dishes';
import { COMMENTS } from './shared/comments';
import { PROMOTIONS } from './shared/promotions';
import { LEADERS } from './shared/leaders';

export default function App () {
  const [dishes, setDishes] = useState(DISHES);
  const [comments, setComments] = useState(COMMENTS);
  const [promotions, setPromotions] = useState(PROMOTIONS);
  const [leaders, setLeaders] = useState(LEADERS);

  const DishWithId = ({match}) => {
    return(
        <Dishdetail dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
    );
  };

  return (
    <BrowserRouter>
      <div>
        <Header />
          <Switch>
            <Route path='/home' component={ () => <Home 
                  dish={dishes.filter((dish) => dish.featured)[0]} 
                  promotion={promotions.filter((promo) => promo.featured)[0]} 
                  leader={leaders.filter((leader) => leader.featured)[0]} 
                /> 
            } />
            <Route exact path='/menu' component={ () => <Menu dishes={dishes} /> } />
            <Route exact path='/contactus' component={Contact} />
            <Route path='/menu/:dishId' component={DishWithId} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}