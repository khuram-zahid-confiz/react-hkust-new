import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Dishdetail (props) {

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
        const comments = props.comments;
        if (comments != null)
            return(
                comments.map(comment => {
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
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    { renderDish(props.dish) }
                </div>
                <div  className="col-12 col-md-6 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
    );
}