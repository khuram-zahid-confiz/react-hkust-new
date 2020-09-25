import React, { useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

export default function DishdetailComponent (props) {

    const renderDish = (dish) => {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    const renderComments = (dish) => {
        if (dish != null)
            return(
                dish.comments.map(comment => {
                    return (
                        <div>
                            <p>{ comment.comment }</p>
                            <p>-- { comment.author }, { comment.date }</p>
                        </div>
                    );
                })
            );
        else
            return(
                <div></div>
            );
    }

    return (
        <div className="row">
              <div  className="col-12 col-md-5 m-1">
                { renderDish(props.selectedDish) }
              </div>
              <div  className="col-12 col-md-6 m-1">
                { renderComments(props.selectedDish) }
              </div>
        </div>
    );
}