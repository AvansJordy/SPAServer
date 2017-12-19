/**
 * Created by Jordy Frijters on 18-12-2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    }
});

const User = mongoose.model('users', UserSchema);


module.exports=User;