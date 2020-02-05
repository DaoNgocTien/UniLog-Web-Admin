export const baseReducer = (initialState, reducerDictionary) => {
    //  return a redux reducing action
    return (state = initialState, action) => {
        //  reference to correct reducer
        const reducer = reducerDictionary[action.type];

        //  action type validation
        return (!reducer || action.error ) ? state : reducer(state, action)        
    };
}