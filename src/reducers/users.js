export default function users(state = [], action){
    switch(action.type){
        case 'ADD_USER':
        return [
            ...state, {
                login: action.login,
                password: action.password,
                code: action.code,
            }];
        default:
            return state;
            }
    }
