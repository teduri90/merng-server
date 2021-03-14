const Marker = require('../../models/Marker');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async getMarkers() {
            try {
                const markers = await Marker.find();
                return markers;
            } catch(err) {
                throw new Error(err);
            }
        }, //
        /*
        async filterMarkers(_, {username, category}, context) {
            try {
                //console.log(context);
                //console.log(username);
                //console.log(category);
                if (username == '') {
                    const markers = await Marker.find({category});
                    console.log("abc");
                    return markers;
                } else if (category == '') { 
                    const markers = await Marker.find({username});
                    console.log("abc");
                    return markers;
                }
                 else {
                    const markers = await Marker.find({username, category});
                    console.log("def");
                    return markers;                    
                }
            } catch(err) {
                throw new Error(err);
            }
        }*/
    },

    Mutation: {
        async createMarker(_, {lat, lng, body, category}, context) {
            const user = checkAuth(context);
            console.log(user);
            try {
                const newMarker = new Marker({
                    username: user.username,
                    // add a title?
                    lat,
                    lng,
                    body,
                    image: user.image,
                    category,
                    createdAt: new Date().toISOString()
                });

                const res = await newMarker.save()
                
                return res;
                // IT DOES NOT NEED TO BE RETURNED JUST TO CREATE IT

            } catch(err) {
                throw new Error(err);
            }
        }, //
        /*
        async likeMarker(_, { markerId }, context){
            const user = checkAuth(context);
            try {
                const marker = await Marker.findById(markerId);
                if(marker){
                    if (marker.likes.find(like => like.username === user.username)){
                        marker.likes = marker.likes.filter(like => like.username !== user.username);
                    } else {
                    marker.likes.push({
                        username: user.username,
                        createdAt: new Date().toISOString()
                    })
                }
                
                const res = await marker.save();
                return {
                    ...res._doc,
                    id: res.id
                }} else {
                    throw new Error("Error")
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async commentMarker(_, {markerId, body}, context){
            const user = checkAuth(context);
            try {
                const marker = await Marker.findById(markerId);
                if (marker){
                    marker.comments.push({
                        username: user.username,
                        body,
                        createdAt: new Date().toISOString()
                    })
                }
                const res = await marker.save();

                return {
                    ...res._doc,
                    id: res.id
                }

            } catch (err){
                throw new Error(err);
            }
        }*/
    }
};