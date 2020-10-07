import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';

function RenderCard({dish, promotion, leader}) {
  const item = dish || promotion || leader;
  if(item != null)
    return (
        <Card>
            <CardImg src={'http://localhost:3001/' + item.image} alt={item.name} />
            <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
            <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
  else
    return (
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading . . .</p>
        </div>
    );

}

export default function Home(props) {
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard dish={props.dish} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard promotion={props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard leader={props.leader} />
                </div>
            </div>
        </div>
    );
}