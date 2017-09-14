export default function createAccount (user){
    return{
        type: 'ADD_USER',
        login: user.login,
        password: user.password,
        code: user.code,
    }
}