const { model, Schema } = require('mongoose');

// first create a Schema using mongoose
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    image: String,
    followers: [{
        username: String,
        createdAt: String,
    }],
    followings: [{
        username: String,
        createdAt: String,
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    } // automatiically populate it user field
});

// then export a model with it for a later use
module.exports = model('User', userSchema);

// we can use GraphQL to enforce must