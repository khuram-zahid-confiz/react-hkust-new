import React, { useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishdetailComponent from './DishdetailComponent';

export default function Menu (props) {

    const [state, setState] = useState({
        selectedDish: null
    });

    const onDishSelect = (dish) => {
        setState({ selectedDish: dish });
    }

    const menu = props.dishes.map((dish) => {
        return (
          <div  className="col-12 col-md-5 m-1">
            <Card key={dish.id}
              onClick={() => onDishSelect(dish)}>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardImgOverlay>
                  <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay>
            </Card>
          </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
            <DishdetailComponent selectedDish={state.selectedDish} />
        </div>
    );
}