var mongoose = require('mongoose');
var db = require('../config/db');
var Match = db.model('Match');
var TeamProfile = db.model('TeamProfile');


var getAll =  function (req, res) {




        
    return res.render('matches', {});
};

var grid =  function (req, res) {
    var gridData = {"metadata":[
                        {"name":"id","label":"ID","datatype":"string","editable":false},
                        {"name":"awayTeamFanScore","label":"AwayTeamFanScore","datatype":"integer","editable":true},
                        {"name":"homeTeamRealScore","label":"HomeTeamRealScore","datatype":"integer","editable":true},
                        {"name":"awayTeamRealScore","label":"AwayTeamRealScore","datatype":"double(m,2)","editable":true},
                        {"name":"country","label":"COUNTRY","datatype":"string","editable":true,"values":
                            {
                                "Europe":{"be":"Belgium","fr":"France","uk":"Great-Britain","nl":"Nederland"},
                                "America":{"br":"Brazil","ca":"Canada","us":"USA"},
                                "Africa":{"ng":"Nigeria","za":"South-Africa","zw":"Zimbabwe"}}
                            },
                        {"name":"matchDate","label":"Match Date","datatype":"date","editable":true},
                        {"name":"action","label":"","datatype":"html","bar":true,"editable":false,"values":null}],
                        "data": []
                    };

    Match.find({}).populate('_id awayTeam homeTeam matchRound season stadium')
         .lean().exec(function(err, matchesFromDb){
        for (var i = matchesFromDb.length - 1; i >= 0; i--) {
            var matchesJson = JSON.stringify(matchesFromDb);

            var id = matchesFromDb[i]._id;
            // delete matchesFromDb[i]['_id'];
            var values = matchesFromDb[i];
            var match = {"id": i, "values": {
                    "awayTeamFanScore": values.awayTeamFanScore,
                    "homeTeamRealScore": values.homeTeamRealScore,
                    "awayTeamRealScore": values.awayTeamRealScore,
                    "matchDate": values.matchDate
                }};
            
            gridData["data"].push(match);
        }

        return res.json(gridData);
    });
};   


module.exports = { getAll: getAll,
                   grid: grid};