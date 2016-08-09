var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var TeamSeasonSchema = new Schema({
    team : {
        type : mongoose.Schema.ObjectId, ref: 'TeamProfile'
    },
    league : {
        type : mongoose.Schema.ObjectId, ref: 'League'
    },
    season : {
        type : mongoose.Schema.ObjectId, ref: 'Season'
    },
    loses: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    draws: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    fanPoints: {
        type: Number,
        default: 0
    },
    pollsPublish: {
        type: Number,
        default: 0
    },
    triviasPublish: {
        type: Number,
        default: 0
    },
    articlesPublish: {
        type: Number,
        default: 0
    }
});



mongoose.model('TeamSeason', TeamSeasonSchema);
