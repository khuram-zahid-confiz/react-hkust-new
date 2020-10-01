import React, { useState, useRef } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

function CommentForm (props) {
    const [isModalOpen, toggleModal] = useState(false);
    const [errorAuthor, updateFormFeedback] = useState('');
    const ratingRef = useRef();
    const authorRef = useRef();
    const commentRef = useRef();
    const handleSubmit = () => {
        props.addComment({
            type: 'ADD_COMMENT',
            payload: {
                dishId: props.dish.id,
                rating: ratingRef.current,
                author: authorRef.current,
                comment: commentRef.current
            }
        });
        // event.preventDefault();
    }

    const validate = (author) => {
        let returnStr = '';
        if(!author) {
            returnStr = '';
        } 
        else {
            if(author.length < 3)
                returnStr = 'Must be greater than 2 characters';
            else if(author.length > 16)
                returnStr = 'Must be 15 characters or less';
            else 
                returnStr = '';
        }
        return returnStr;
    }
    return (
        <React.Fragment>
            <Button outline onClick={() => toggleModal(!isModalOpen)}>
                <span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>
            <Modal isOpen={isModalOpen} toggle={() => toggleModal(!isModalOpen)}>
            <ModalHeader toggle={() => toggleModal(!isModalOpen)}>Submit Comment</ModalHeader>
            <ModalBody>
                <Form onSubmit={() => handleSubmit()}>
                <FormGroup>
                    <Label htmlFor="rating">Rating</Label>
                    <Input type="select" id="rating" name="rating" ref={ratingRef} 
                        onChange={(event) => ratingRef.current = event.target.value}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="authorname">Your Name</Label>
                    <Input type="text" id="authorname" name="authorname"
                        valid={errorAuthor === ''}
                        invalid={errorAuthor !== ''} 
                        ref={authorRef} 
                        onChange={(event) => {
                            updateFormFeedback(validate(event.target.value)); 
                            authorRef.current = event.target.value;
                        }
                    } />
                    <FormFeedback>{errorAuthor}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="comment">Comment</Label>
                    <Input type="textarea" id="comment" name="comment" rows="6" ref={commentRef} 
                        onChange={(event) => commentRef.current = event.target.value} />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Login</Button>
                </Form>
            </ModalBody>
            </Modal>
        </React.Fragment>
    );
}

export default function Dishdetail (props) {

    const renderDish = (dish) => {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={'http://localhost:3001/' + dish.image} alt={dish.name} />
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
                    <CommentForm dish={props.dish} addComment={props.addComment} />
                </div>
            </div>
        </div>
    );
}