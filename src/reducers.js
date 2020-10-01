export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DISHES':
      debugger;
      return {...state, dishes: action.payload};
    case 'ADD_COMMENTS':
      debugger;
      return {...state, comments: action.payload};
    case 'ADD_PROMOTIONS':
      debugger;
      return {...state, promotions: action.payload};
    case 'ADD_LEADERS':
      debugger;
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