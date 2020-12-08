import Axios from "axios";
import { baseUrl } from './baseUrl';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DISHES':
      return {...state, dishes: action.payload};
    case 'ADD_COMMENTS':
      return {...state, comments: action.payload};
    case 'ADD_PROMOTIONS':
      return {...state, promotions: action.payload};
    case 'ADD_LEADERS':
      return {...state, leaders: action.payload};
    case 'ADD_COMMENT':
      var comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      Axios.post(`${baseUrl}/comments/`, comment)
        .then(res => console.log("Comment: ", res.data));
      return {...state, comments: [...state.comments, comment]};
    case 'DELETE_COMMENT':
      comment = action.payload;
      return {...state, comments: state.comments.filter(currentComment => currentComment.id !== comment.id)};
    default:
      return state;
  }
}