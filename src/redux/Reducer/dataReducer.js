// import Data from './../../Data.json';

// const uuidv4 = require('uuid/v4');
// const initialState = {
//     StoreData: Data,
//     ViewData: Data,
//     CurrentUserInfo: {}
// };
// const dataReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "GET_DATA":
//             return { ...state, StoreData: state.StoreData };
//         case "SEARCH":
//             return searchByName(state, action.key);
//         case "ADD_USER":
//             return addNewUser(state, action.user);
//         case "GET_USER_INFO":
//             return getUserInfo(state, action.user);
//         case "EDIT_USER_INFO":
//             return editUserInfo(state, action.newUserInfo);
//         case "DELETE_USER":
//             return deleteUser(state, action.id);
//         default:
//             return state;
//     }
// };


// const searchByName = (state, key) => {
//     if (key && key.length > 0) {
//         return {
//             ...state,
//             ViewData: state.StoreData.filter(item => item.name.toLowerCase().includes(key.toLowerCase()))
//         }
//     }
//     return state;
// }

// const addNewUser = (state, user) => {
//     user.id = uuidv4();
//     console.log(user);

//     if (user) {
//         state = {
//             ...state,
//             StoreData: [...state.StoreData, user],
//         };
//         return {
//             ...state,
//             ViewData: state.StoreData
//         }
//     }
//     return state
// }

// const getUserInfo = (state, user) => {
//     console.log(user);
//     if (user) {
//         return {
//             ...state,
//             CurrentUserInfo: user
//         }
//     }
//     return state
// }

// const editUserInfo = (state, newUserInfo) => {
//     console.log(newUserInfo);
//     if (newUserInfo) {
//         const newStoreData = state.StoreData.map(value => {
//             if (value.id === newUserInfo.id) {
//                 return newUserInfo;
//             }
//             return value;
//         })
//         return {
//             StoreData: newStoreData,
//             ViewData: newStoreData,
//             CurrentUserInfo: {}
//         }
//     }
//     return state
// }

// const deleteUser = (state, id) => {
//     if (id) {
//         console.log("id " + id);

//         const newStoreData = state.StoreData.filter(item => item.id !== id);
//         console.log(newStoreData);

//         return {
//             StoreData: newStoreData,
//             ViewData: newStoreData,
//             CurrentUserInfo: {}
//         }
//     }
//     return state
// }

// export default dataReducer;