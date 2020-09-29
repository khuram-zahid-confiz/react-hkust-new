export const dishReducer = (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
}
  
export const commentReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_COMMENT':
        var comment = action.payload;
        comment.id = state.length;
        comment.date = new Date().toISOString();
        console.log("Comment: ", comment);
        return state.concat(comment);
      default:
        return state;
    }
}
  
export const promotionReducer = (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
}
  
export const leaderReducer = (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
}