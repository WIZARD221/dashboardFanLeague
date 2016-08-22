
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name : {
        type : String
    },
    facebookId:{
        type : String
    },
    email : {
        type : String
    },
    active : {
        type : Boolean
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    address:{
        country :{
            type : String
        },
        city : {
            type : String
        },
        street : {
            type : String
        }
    },
    teams : {
        type :  [{ type : mongoose.Schema.ObjectId, ref: 'FanProfile' }],
        default : []
    }
});


mongoose.model('User', UserSchema);
