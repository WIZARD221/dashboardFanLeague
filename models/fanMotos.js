var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var FanMotoSchema = new Schema({
    text : {
        type : String
    },
    updated: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type : mongoose.Schema.ObjectId, ref: 'User'
    },
    isPublic :{
        type : Boolean
    },
    team : {
        type : mongoose.Schema.ObjectId, ref: 'TeamProfile',
    }
});



mongoose.model('FanMoto', FanMotoSchema);
