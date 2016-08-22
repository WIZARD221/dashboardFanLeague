$(function() {

    // var articles = $("#articlesJson").text() ?  JSON.parse($("#articlesJson").text()) : {};
    var teams = $("#teamsJson").text() ?  JSON.parse($("#teamsJson").text()) : {};
    teams.unshift({name: "", _id: null});
    var leagues = $("#leaguesJson").text() ?  JSON.parse($("#leaguesJson").text()) : {};
    leagues.unshift({name: "", _id: null});
    var seasons = $("#seasonsJson").text() ?  JSON.parse($("#seasonsJson").text()) : {};
    seasons.unshift({name: "", _id: null});



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
        // data: articles,
        controller: {
            loadData: function(filter) {
                 return $.ajax({
                    type: "GET",
                    url: "/teamSeasons",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/teamSeasons",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/teamSeasons",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/teamSeasons",
                    data: item
                });
            }
        },
        fields: [
            { name: "league", type: "select", 
              items: leagues, valueField: "_id", selectedIndex: -1,
              textField: "name", valueType: "string", width: 75},
            { name: "team", type: "select", selectedIndex: -1,
              items: teams, valueField: "_id",
              textField: "name", valueType: "string", width: 75},
            { name: "season", type: "select", selectedIndex: -1,
              items: seasons, valueField: "_id",
              textField: "year", valueType: "string", width: 75},
            { name: "fanPoints", type: "text", width: 50 },
            { name: "points", type: "text", width: 50 },
            { name: "draws", type: "text", width: 50 },
            { name: "wins", type: "text", width: 50 },
            { name: "loses", type: "text", width: 50 },
            { name: "articlesPublish", type: "text", width: 50 },
            { name: "pollsPublish", type: "text", width: 50 },
            { name: "triviasPublish", type: "text", width: 50 },
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { type: "control" }
        ]
    });

    $("input.jsgrid-button.jsgrid-mode-button").click();


    function filteredOptions(leagues, options) {
        var leaguesFilterdOptions = {};

        for (var i = leagues.length - 1; i >= 0; i--) {
            leaguesFilterdOptions[leagues[i]["_id"]] = null;
        }


        for (var key in options) {
            for (var j = options[key].length - 1; j >= 0; j--) {
                var itemLeagueId = options[key][j].league;
                var itemName = options[key][j].name;
                var itemId = options[key][j]._id;
                if (itemName && itemName != '' && itemLeagueId &&  itemLeagueId!= '') {
                    leaguesFilterdOptions[itemLeagueId] ? true : leaguesFilterdOptions[itemLeagueId] = {};
                    leaguesFilterdOptions[itemLeagueId][key] ? true : leaguesFilterdOptions[itemLeagueId][key] = {};
                    leaguesFilterdOptions[itemLeagueId][key][itemId] = itemName;
                }
            }
        }

        return leaguesFilterdOptions;
    };

    $(document).on("change", "table.jsgrid-table tr.jsgrid-edit-row td.jsgrid-align-center select, table.jsgrid-table tr.jsgrid-filter-row td.jsgrid-align-center select, table.jsgrid-table tr.jsgrid-insert-row td.jsgrid-align-center select", function(event) {
        if ($(this).parent().index() == 0) {
            setColumns(this, ["league", "team", "season"]);    
        }
    });

    $(document).on("focus", "table.jsgrid-table tr.jsgrid-edit-row td.jsgrid-align-center select, table.jsgrid-table tr.jsgrid-filter-row td.jsgrid-align-center select, table.jsgrid-table tr.jsgrid-insert-row td.jsgrid-align-center select", function(event) {
        if ($(this).parent().index() != 0) {
            setColumns(this, ["league", "team", "season"]);    
        }
    });

    function setColumns(select, colNames) {
        var teams = $("#teamsJson").text() ?  JSON.parse($("#teamsJson").text()) : {};
        var seasons = $("#seasonsJson").text() ?  JSON.parse($("#seasonsJson").text()) : {};
        var leagues = $("#leaguesJson").text() ?  JSON.parse($("#leaguesJson").text()) : {};
        var headers = getHeaders();

        var op = filteredOptions(leagues,{team: teams, season: seasons});

        var colName = $(select).closest('#jsGrid').find('.jsgrid-grid-header').find('th').eq($(select).parent().index()).text();
        if ($.inArray(colName,colNames) != -1) {
            var selectedLeagueId = $(select).closest("tr").find("select")[0].selectedOptions[0].value;
            if (op[selectedLeagueId]) {
                for (var key in op[selectedLeagueId]) {
                    var selectIndex = headers[key];
                    var  currentSelect = $(select).closest('tr').find("td").eq(selectIndex).find("select");
                    if (currentSelect.attr('updated') != selectedLeagueId) {
                        replaceOptions(currentSelect, op[selectedLeagueId][key]);
                        currentSelect.attr('updated', selectedLeagueId);
                    }
                }
            }       
        }
    };

    function replaceOptions(select , newOptions) {
        $(select).empty();
        for (var key in newOptions) {
            $(select).append('<option value='+ key +'>'+ newOptions[key] + '</option>');
        } 
    };

    function getHeaders() {
        var ths = $('#jsGrid th');
        var headers = {};
        for (var i = 0; i < ths.length; i++) {
            headers[ths.eq(i).text()] = i;
        }
        return headers;
    };

    $("ul.nav li.active").removeClass('active');
    $("ul.nav li:contains('Teams')").addClass("active");

});




