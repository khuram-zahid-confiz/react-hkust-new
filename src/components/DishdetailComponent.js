import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { CommentForm } from './CommentFormComponent';
import RenderComments from './RenderCommentsComponent';
import { baseUrl } from './baseUrl';

export default function Dishdetail (props) {

    const renderDish = (dish) => {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={`${baseUrl}/` + dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div className="col-12">
                    <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                    <p>Loading . . .</p>
                </div>
            );
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish ? props.dish.name : ''}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish ? props.dish.name : ''}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    { renderDish(props.dish) }
                </div>
                <div  className="col-12 col-md-6 m-1">
                    <RenderComments comments={props.comments} deleteComment={props.dispatchMethod}/>
                    <CommentForm dish={props.dish} addComment={props.dispatchMethod} />
                </div>
            </div>
        </div>
    );
}