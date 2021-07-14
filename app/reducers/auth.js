export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGIN_AS_GUEST':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};