var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SeasonRoundSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    season: {
        type : mongoose.Schema.ObjectId, ref: 'SeasonSchema'
    },
    league: {
        type : mongoose.Schema.ObjectId, ref: 'LeagueSchema'
    },
    created: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('SeasonRound', SeasonRoundSchema);
