const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./user').UserSchema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    sportHall: {
        type: String,
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    host: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }

});




const Event = mongoose.model('event', EventSchema);

Event.count({}, function (err, count) {
    if(count < 5){
        console.log('add a event');
        const event = new Event({
            name: "NK Stoeptegelduiken",
            price: "5 Knompies",
            sportHall: "LD043",
            sport: "Stoeptegelduiken",
            availability: true
        });
        event.save();
    }

    else {
        console.log('zit al een game in de db')
    }
});




module.exports = Event;