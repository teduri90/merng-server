const { model, Schema } = require('mongoose');

// Each Marker with Lat and Lng will be an independent post by a user
// Users may see what they want to see based on filters

// What if someone wants to own the same location???

const MarkerSchema = new Schema({
    username: String, // need to figure out how to add a profile image
    lat: String,
    lng: String,
    body: String, // content of the string
    image: String,
    category: String,
    createdAt: String,
    likes: [{
        username: String,
        createdAt: String,
    }],
    comments: [{
        body: String,
        username: String,
        createdAt: String, 
    }],
});

module.exports = model('Marker', MarkerSchema);

// we can use GraphQL to enforce must