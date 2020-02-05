

const InitialState = {
    isFetching: false
}
export const loginReducer = (state = InitialState, action) => {
    switch (action.type) {
        case "REQUEST_POSTS":
                console.log("loginReducer");
                console.log(action.requestFetching);
            return changeFetchingStatus(state, action.requestFetching);
        default:
            //console.log("loginReducer");
            
            return state
    }
}


const changeFetchingStatus = (state, requestFetching) =>{
   
       
        return {
            ...state,
            isFetching: requestFetching
        }
   
}
