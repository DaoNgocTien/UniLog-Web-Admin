
const initialState = {
    addNewStatus: true,
    editUserStatus: false,
    editUserMode: false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case "CHANGE_ADD_NEW_STATUS":
            return changeAddNewStatus(state);
        case "CHANGE_EDIT_USER_MODE":
            return changeEditUserMode(state);
        default:
            return state
    }
}

const changeAddNewStatus = (state) => {
    return { ...state, addNewStatus: !state.addNewStatus };
}

const changeEditUserMode = (state) => {
    return { ...state, editUserMode: !state.editUserMode };
}