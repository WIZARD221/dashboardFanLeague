
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FanDutiesSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    fan : {
        type : mongoose.Schema.ObjectId, ref: 'FanProfile'
    },
    updated: {
        type: Date,
        default: Date.now
    },
    scoreGot : {
        type : Number,
        default : 0
    },
    showDuty : {
        type :  Boolean,
        default : false
    },
    clickOn : {
        type :  Number,
        default : 0
    },
     dutyId: {
        type : mongoose.Schema.ObjectId
    },
    dutyType: {
      type: String
    },
});

mongoose.model('FanDuties', FanDutiesSchema);