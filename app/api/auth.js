import  client from "./client";
const endpoint = '/auth/login'

const login = (phone,password) => client.post('/auth/login',{phone,password})

export default 
{
    login
}