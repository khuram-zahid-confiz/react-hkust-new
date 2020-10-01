import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Menu (props) {

    let menu = () => {
        return (
            <div></div>
        );
    }
    if(props.dishes != null) {
        menu = props.dishes.map((dish) => {
            return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card>
                    <Link to={`/menu/${dish.id}`} >
                        <CardImg width="100%" src={'http://localhost:3001/' + dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Link>
                </Card>
            </div>
            );
        });
    }

    const nullView = () => {
        return (
            <div></div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                { props.dishes != null ? menu : nullView }
            </div>
        </div>
    );
}