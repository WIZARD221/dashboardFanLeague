
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FanLevelSchema = new Schema({
    levelName: {
        type: String,
        trim: true
    },
    levelNumber: {
        type: Number
    },
    levelImageUrl: {
        type: String
    },
    levelStartPoint: {
        type : Number
    },
    levelEndPoint: {
        type : Number
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('FanLevel', FanLevelSchema);
