var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SeasonRoundSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    season: {
        type : mongoose.Schema.ObjectId, ref: 'Season'
    },
    league: {
        type : mongoose.Schema.ObjectId, ref: 'League'
    },
    created: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('SeasonRound', SeasonRoundSchema);
