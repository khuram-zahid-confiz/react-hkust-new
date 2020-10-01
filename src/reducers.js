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
      console.log("Comment: ", comment);
      return {...state, comments: [...state.comments, comment]};
    default:
      return state;
  }
}