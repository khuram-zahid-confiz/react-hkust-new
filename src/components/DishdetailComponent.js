import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

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

    const RenderComments = (props) => {
        const dish = props.dish;
        if (dish != null)
            return(
                dish.comments.map(comment => {
                    return (
                        <div>
                            <p>{ comment.comment }</p>
                            <p>-- { comment.author }, { 
                                new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                                .format(new Date(Date.parse(comment.date)))
                            }</p>
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
                <RenderComments dish={props.selectedDish} />
              </div>
        </div>
    );
}