
var grid;

$(function() {

    var seasons = $("#seasonsJson").text() ?  JSON.parse($("#seasonsJson").text()) : {};
    seasons.unshift({name: "", _id: null});
    var seasonRounds = $("#seasonRoundsJson").text() ?  JSON.parse($("#seasonRoundsJson").text()) : {};
    seasonRounds.unshift({name: "", _id: null});

    grid = new jsGrid.Grid($("#jsGrid"), {
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
        // data: fanMatches,
        controller: {
            loadData: function(filter) {
                 return $.ajax({
                    type: "GET",
                    url: "/fanMatches",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/fanMatches",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/fanMatches",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/fanMatches",
                    data: item
                });
            }
        },
        fields: [
            { name: "updated", type: "text", width: 50 },
            { name: "match", type: "text", width: 50 },
            { name: "team", type: "text", width: 50 },
            { name: "fan", type: "text", width: 50 },
            { name: "totalScore", type: "text", width: 50 },
            { name: "gotPointDuties", type: "text", width: 50 },
            { name: "failedDuties", type: "text", width: 50 },
            { name: "distanceScore", type: "text", width: 50 },
            { name: "distanceDone", type: "text", width: 50 },
            { name: "pollsScore", type: "text", width: 50 },
            { name: "pollsDone", type: "text", width: 50 },
            { name: "articlesScore", type: "text", width: 50 },
            { name: "articlesDone", type: "text", width: 50 },
            { name: "triviasScore", type: "text", width: 50 },
            { name: "triviasDone", type: "text", width: 50 },
            { name: "friendsScore", type: "text", width: 50 },
            { name: "friendsSawWith", type: "text", width: 50 },
            { name: "tvScore", type: "text", width: 50 },
            { name: "didWatchMatchOutside", type: "text", width: 50 },
            { name: "attendanceScore", type: "text", width: 50 },
            { name: "timeBeforeMatchScore", type: "text", width: 50 },
            { name: "timeBeforeMatchArrivalTime", type: "text", width: 50 },
            { name: "finishMatchPosition", type: "text", width: 50 },
            { name: "matchRound", type: "select", 
              items: seasonRounds, valueField: "_id",
              textField: "title", valueType: "string", width: 75},
            { name: "season", type: "select", 
              items: seasons, valueField: "_id",
              textField: "year", valueType: "string", width: 75},
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { type: "control" }
        ],

        // onDataLoaded: function(args) {

        //     var data = args.data;
        //     for (var i = 0; i < data.length; i++) {
        //         data[i].season = data[i].season ? data[i].season.year : ""; 
        //         data[i].matchRound = data[i].matchRound ? data[i].matchRound.title : ""; 
        //     }
        //     args.grid.refresh()
        // }
    });


    $("input.jsgrid-button.jsgrid-mode-button").click();
    $("ul.nav li.active").removeClass('active');
    $("ul.nav li:contains('Fans')").addClass("active");
});




