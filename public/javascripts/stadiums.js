$(function() {
    var stadiums = JSON.parse($("#stadiumsJson").text());

    var leagues = $("#leaguesJson").text() ?  JSON.parse($("#leaguesJson").text()) : {};

    $("#jsGrid").jsGrid({
        height: "auto",
        width: "93%",
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
        data: stadiums,
        controller: {
            loadData: function(filter) {
                 return $.ajax({
                    type: "GET",
                    url: "/stadiums",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/stadiums",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/stadiums",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/stadiums",
                    data: item
                });
            }
        },
        fields: [
            { name: "name", type: "text", width: 50 },
            { name: "league", type: "select", 
              items: leagues, valueField: "_id",
              textField: "name", valueType: "string", width: 75},
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { name: "imageUrl", type: "image", width: 50 },
            { name: "city", type: "text", width: 50 },
            { name: "stadiumSize", type: "number", width: 50 },
            { name: "locationCoordinates", type: "number", width: 50 },
            { type: "control" }
        ]
    });

    $("input.jsgrid-button.jsgrid-mode-button").click();

    // $(document).on("change", "table.jsgrid-table tr.jsgrid-edit-row td.jsgrid-align-center select, table.jsgrid-table tr.jsgrid-filter-row td.jsgrid-align-center select, table.jsgrid-table tr.jsgrid-insert-row td.jsgrid-align-center select", function(event) {
    //     setMainColumn(this);
    // });

    // $(document).on("focus", "table.jsgrid-table tr.jsgrid-edit-row td.jsgrid-align-center select, table.jsgrid-table tr.jsgrid-filter-row td.jsgrid-align-center select, table.jsgrid-table tr.jsgrid-insert-row td.jsgrid-align-center select", function(event) {
    //     setSecondaryColumns(this);
    // });


    // function setMainColumn(select) {
    //     var colName = $(select).closest('#jsGrid').find('.jsgrid-grid-header').find('th').eq($(select).parent().index()).text();
    //     if (colName === "league") {
    //         var leagueId = select.selectedOptions[0].value;
    //         var league = $.grep(leagues, function(e){ return e._id == leagueId; })[0];
    //         var teams = orderTeams(league);

    //         var awayTeam = $(select).closest("tr").find("select")[1];
    //         var homeTeam = $(select).closest("tr").find("select")[2];
    //         replaceOptions(awayTeam, teams);
    //         replaceOptions(homeTeam, teams);
    //     }
    // };

    // function setSecondaryColumns(select) {
    //     var colName = $(select).closest('#jsGrid').find('.jsgrid-grid-header').find('th').eq($(select).parent().index()).text();
    //     if ($.inArray(colName,["awayTeam", "homeTeam"]) != -1) {
    //         var leagueId = $(select).closest("tr").find("select")[0].selectedOptions[0].value;
    //         var league = $.grep(leagues, function(e){ return e._id == leagueId; })[0];
    //         var teams = orderTeams(league);

    //         replaceOptions(select, teams);
    //     }
    // };

    // function orderTeams(league) {
    //     var teams = [];
    //     for (var i = league.teams.length - 1; i >= 0; i--) {
    //          teams.push({_id: league.teams[i]._id, name: league.teams[i].name})
    //     }
    //     return teams;
    // };

    // function replaceOptions(select , newOptions) {
    //     $(select).empty();
    //     for (var i = newOptions.length - 1; i >= 0; i--) {
    //         $(select).append('<option value='+ newOptions[i]._id +'>'+ newOptions[i].name + '</option>');
    //     }
    // };


});




