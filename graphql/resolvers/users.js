////////////////////////////////
////////// LOAD MODEL //////////
////////////////////////////////
const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');
const { UserInputError } = require('apollo-server');

////////////////////////////////
////// CREATE TOKEN & PWD //////
////////////////////////////////
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const { ApolloError } = require('apollo-server-errors');

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        image: user.image,
    }, SECRET_KEY, { expiresIn : '1h'});
};

const error = ApolloError;
console.log(error instanceof Error);

module.exports = {
    Query: {
        //// QUERY : LIST OF USERS /////
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            } catch(err) {
                throw new Error(err);
            }
        },   
    },
    
    Mutation: {
        async login(_, {username, password}){
            const user = await User.findOne({ username });
            if (!user){
                throw new Error("the user does not exist");
            };
            const match = await bcrypt.compare(password, user.password);
            if (!match){
                errors.general = "wrorng";
                throw new UserInputError("Wrong credential", {errors});
            }
            const token = generateToken(user);
            console.log("logged")
            return {
                ...user._doc,
                id: user.id,
                token
            };
        },

        // MUTATION : REGISTER A USER //
        async register(_, { username, email, password, confirmPassword, image }, context, info ){
            //////// FIND A DUPLICATE //////
            const user = await User.findOne({ username })
            if (user){
                throw new Error("the username is already in use");
            };
            ///////// CRYPT THE PWD ////////
            password = await bcrypt.hash(password, 12);

            /// CREATE A MODEL WITH DATA ///
            const newUser = new User({
                username,
                email,
                password,
                image,
                createdAt: new Date().toISOString()
            });

            //////// SAVE THE DATA /////////
            const res = await newUser.save();

            /////// GENERATE A TOEKN ///////
            const token = generateToken(res);

            // ???? DO I NEED TO RETURN ???? //
            return {
                ...res._doc,
                id: res.id,
                token
            };

        },
        
        async followingUser(_, {userId, username} ,context){
            const user = checkAuth(context);
            
            const following = await User.findById(user.id);

            following.followings.push({
                username: username,
                createdAt: new Date().toISOString()
            });

            const res = await following.save();

            const follower = await User.findById(userId);

            follower.followers.push({
                username : user.username,
                createdAt: new Date().toISOString()
            });

            const res2 = await follower.save();    

            return {
                ...follower._doc
            }
            /*
            const following = await User.followings.findById(userId);
            console.log(following);

            if(following){
                const followingIndex = following.followings.findIndex(c => c.id === userId);

                if(followingIndex){
                    following.followings.splice(followingIndex, 1);
                    await following.save();
                    return following;
                }

            } else {
                following.followings.push({
                    username: username,
                    createdAt: new Date().toISOString()
                });

                const res = await following.save();
            }
            
            ///
            ///
            ///
            const follower = await User.find.follwers.findById(user.id);

            if (follower){
                const followerIndex = follower.followers.findIndex(c => c.id === user.id);

                if(followingIndex){
                    follower.followers.splice(followerIndex, 1);
                    await follower.save();
                    return follwing;
                }

            } else {
                follower.followers.push({
                    username : user.username,
                    createdAt: new Date().toISOString()
                });
    
                const res2 = await follower.save();    
            }
            
            return {
                ...follower._doc
            }
            */

        }
    }
};
