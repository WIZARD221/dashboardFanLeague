var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MatchSchema = new Schema({
        matchDate : {
            type : Date
        },
        matchDateStart : {
            type : Date
        },
        updated : {
            type : Date,
            default : Date.now
        },
        homeTeam : {
            type : mongoose.Schema.ObjectId, ref: 'TeamProfile'
        },
        awayTeam : {
            type : mongoose.Schema.ObjectId, ref: 'TeamProfile'
        },
        stadium : {
            type : mongoose.Schema.ObjectId, ref: 'Stadium'
        },
        homeTeamRealScore:{
            type : Number
        },
        awayTeamRealScore:{
            type : Number
        },
        homeTeamFanScore:{
            type : Number
        },
        awayTeamFanScore:{
            type : Number
        },
        matchRound: {
            type : mongoose.Schema.ObjectId, ref: 'SeasonRound'
        },
        league: {
            type : mongoose.Schema.ObjectId, ref: 'League'
        },
        season: {
            type : mongoose.Schema.ObjectId, ref: 'Season'
        },
        homeTeamTrivia: {
            type :  [{ type : mongoose.Schema.ObjectId, ref: 'Trivia'}],
            default : []
        },
        homeTeamPoll: {
            type :  [{ type : mongoose.Schema.ObjectId, ref: 'Poll'}],
            default : []
        },
        homeTeamArticle: {
            type :  [{ type : mongoose.Schema.ObjectId, ref: 'Article'}],
            default : []
        },
        awayTeamTrivia: {
            type :  [{ type : mongoose.Schema.ObjectId, ref: 'Trivia'}],
            default : []
        },
        awayTeamPoll: {
            type :  [{ type : mongoose.Schema.ObjectId, ref: 'Poll'}],
            default : []
        },
        awayTeamArticle: {
            type :  [{ type : mongoose.Schema.ObjectId, ref: 'Article'}],
            default : []
        }
    }
);


module.exports = mongoose.model('Match', MatchSchema);
