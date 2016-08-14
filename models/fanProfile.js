
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FanProfileSchema = new Schema({
    user : {
        type : mongoose.Schema.ObjectId, ref: 'User'
    },
    league : {
        type : mongoose.Schema.ObjectId, ref: 'League'
    },
    team : {
        type : mongoose.Schema.ObjectId, ref: 'TeamProfile'
    },
    level : {
        type : mongoose.Schema.ObjectId, ref: 'FanLevel',
        default : "56e5f4658401db51065c41d4"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    score : {
        type : Number,
        default : 0
    },
    achievements : {
        type :  [{ type : mongoose.Schema.ObjectId, ref: 'FanAchievement'}],
        default : []
    },
    prizes : {
        type :  [{ type : mongoose.Schema.ObjectId, ref: 'FanPrize'}],
        default : []
    },
    matches : {
        type :  [{ type : mongoose.Schema.ObjectId, ref: 'FanMatch'}],
        default : []
    },
    fanMoto : {
        type : mongoose.Schema.ObjectId, ref: 'FanMoto'
    },

});

mongoose.model('FanProfile', FanProfileSchema);
