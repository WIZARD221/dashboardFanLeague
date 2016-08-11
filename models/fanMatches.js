
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FanMatchSchema = new Schema({
    updated : {
        type : Date,
        default : Date.now
    },
    match : {
        type : mongoose.Schema.ObjectId, ref: 'Match'
    },
    team : {
        type : mongoose.Schema.ObjectId, ref: 'TeamProfile'
    },
    fan : {
        type : mongoose.Schema.ObjectId, ref: 'FanProfile'
    },
    totalScore:{
        type : Number,
        default : 0
    },
    gotPointsDuties: {
        type :  [{ type : mongoose.Schema.ObjectId, ref: 'FanDuties'}],
        default : []
    },
    failedDuties: {
        type :  [{ type : mongoose.Schema.ObjectId, ref: 'FanDuties'}],
        default : []
    },
    distanceScore : {
        type : Number,
        default : 0
    },
    distanceDone : {
        type : Number,
        default : 0
    },
    pollsScore : {
        type : Number,
        default : 0
    },
    pollsDone : {
        type : Number,
        default : 0
    },
    articlesScore : {
        type : Number,
        default : 0
    },
    articlesDone : {
        type : Number,
        default : 0
    },
    triviaScore : {
        type : Number,
        default : 0
    },
    triviaDone : {
        type : Number,
        default : 0
    },
    friendsScore : {
        type : Number,
        default : 0
    },
    friendsSawWith : {
        type : Number,
        default : 0
    },
    tvScore : {
        type : Number,
        default : 0
    },
    didWatchMatchOutside : {
        type : Boolean,
        default : false
    },
    attendanceScore:{
        type : Number,
        default : 0
    },
    timeBeforeMatchScore:{
        type : Number,
        default : 0
    },
    timeBeforeMatchArrivalTime : {
        type : Number,
        default : 0
    },
    finishMatchPosition : {
        type : Number,
        default : 0
    },
    matchRound: {
        type : mongoose.Schema.ObjectId, ref: 'SeasonRound'
    },
    season: {
        type : mongoose.Schema.ObjectId, ref: 'Season'
    }
});

mongoose.model('FanMatch', FanMatchSchema);
