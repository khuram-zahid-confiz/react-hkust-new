import React from 'react';

export default function RenderComments (props) {
    const comments = props.comments;
    const deleteComment = (commentId) => {
        props.deleteComment({
            type: 'DELETE_COMMENT',
            payload: {
                id: commentId
            }
        });
    }
    if (comments != null)
        return(
            comments.map(comment => {
                return (
                    <div onClick={() => deleteComment(comment.id)}>
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