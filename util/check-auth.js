const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
    console.log(context);
    const authHeader = context.req.headers.authorization;
    
    // RECEIVE A TOKEN FROM THE REQUEST HEADERS
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch (err) {
                throw new AuthenticationError("Invalid/Expired Toekn");
            }
        } throw new Error("Auth Token must be Bearer");
    } throw new Error('Authorization header must be provided');  
};