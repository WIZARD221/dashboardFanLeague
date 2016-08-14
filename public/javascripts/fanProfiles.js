$(function() {

    var fanProfiles = $("#fanProfilesJson").text() ?  JSON.parse($("#fanProfilesJson").text()) : {};
    fanProfiles.unshift({name: "", _id: null});
    var achievements = $("#achievementsJson").text() ?  JSON.parse($("#achievementsJson").text()) : {};
    achievements.unshift({name: "", _id: null});
    var levels = $("#levelsJson").text() ?  JSON.parse($("#levelsJson").text()) : {};
    levels.unshift({levelNumber: "", _id: null});
    var teams = $("#teamsJson").text() ?  JSON.parse($("#teamsJson").text()) : {};
    teams.unshift({name: "", _id: null});
    var leagues = $("#leaguesJson").text() ?  JSON.parse($("#leaguesJson").text()) : {};
    leagues.unshift({name: "", _id: null});
    var prizes = $("#prizesJson").text() ?  JSON.parse($("#prizesJson").text()) : {};
    prizes.unshift({name: "", _id: null});
    var fanMotos = $("#fanMotosJson").text() ?  JSON.parse($("#fanMotosJson").text()) : {};
    fanMotos.unshift({name: "", _id: null});



    $("#jsGrid").jsGrid({
        height: "auto",
        width: "93%",
        filtering: true,
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageLoading: false,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete client?",
        // data: achievements,
        controller: {
            loadData: function(filter) {
                 return $.ajax({
                    type: "GET",
                    url: "/fanProfiles",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/fanProfiles",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/fanProfiles",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/fanProfiles",
                    data: item
                });
            }
        },
        fields: [
            { name: "league", type: "select", 
              items: leagues, valueField: "_id",
              textField: "name", valueType: "string", width: 75},
            { name: "team", type: "select", 
              items: teams, valueField: "_id",
              textField: "name", valueType: "string", width: 75},
            { name: "achievement", type: "select", 
              items: achievements, valueField: "_id",
              textField: "name", valueType: "string", width: 75},
            { name: "fanLevel", type: "select", 
              items: levels, valueField: "_id",
              textField: "levelNumber", valueType: "string", width: 75},
            { name: "prize", type: "select", 
              items: prizes, valueField: "_id",
              textField: "name", valueType: "string", width: 75},
            { name: "fanMoto", type: "select", 
              items: fanMotos, valueField: "_id",
              textField: "text", valueType: "string", width: 75},
            { name: "score", type: "text", width: 50 },
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { type: "control" }
        ]
    });

    $("input.jsgrid-button.jsgrid-mode-button").click();
});




