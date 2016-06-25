$(function() {

    var matches = JSON.parse($("#matchesJson")[0].innerHTML);
    var stadiums = JSON.parse($("#stadiumsJson")[0].innerHTML);
    var leagues = JSON.parse($("#leaguesJson")[0].innerHTML);

    $("#jsGrid").jsGrid({
        height: "100%",
        width: "100%",
        filtering: true,
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        // autoload: true,
        pageSize: 10,
        pageLoading: false,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete client?",
        data: matches,
        controller: {
            loadData: function(filter) {
                 return $.ajax({
                    type: "GET",
                    url: "/matches",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/matches",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/matches",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/matches",
                    data: item
                });
            }
        },
        fields: [
            { name: "league", type: "select", 
              items: leagues, valueField: "_id",
              textField: "name", valueType: "string", width: 75 },
            { name: "id", type: "text", width: 75, editing: false, visible: false },
            { name: "awayTeam", type: "select", 
              items: {}, valueField: "_id",
              textField: "name", valueType: "string", width: 75 },
            { name: "homeTeam", type: "select", 
              items: {}, valueField: "_id",
              textField: "name", valueType: "string", width: 75 },
            { name: "awayTeamFanScore", type: "text", width: 50 },
            { name: "homeTeamFanScore", type: "text", width: 50 },
            { name: "awayTeamRealScore", type: "text", width: 50 },
            { name: "homeTeamRealScore", type: "text", width: 50 },
            { name: "season", type: "select", 
              items: {}, valueField: "_id",
              textField: "name", valueType: "string", width: 75 },
            { name: "matchRound", type: "select", 
              items: {}, valueField: "_id",
              textField: "name", valueType: "string", width: 75 },
            { name: "stadium", type: "select", 
              items: stadiums, valueField: "_id",
              textField: "name", valueType: "string", width: 75 },
            { name: "matchDate", type: "text", width: 50 },
            { type: "control" }
        ]
    });
});