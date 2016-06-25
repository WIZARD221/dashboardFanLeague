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
            { name: "awayTeam", type: "text", width: 75 },
            { name: "homeTeam", type: "text", width: 75 },
            { name: "awayTeamFanScore", type: "number", width: 50, filtering: false },
            { name: "homeTeamFanScore", type: "number", width: 50, filtering: false },
            { name: "awayTeamRealScore", type: "number", width: 50, filtering: false },
            { name: "homeTeamRealScore", type: "number", width: 50, filtering: false },
            { name: "season", type: "number", width: 50, filtering: false },
            { name: "matchRound", type: "text", width: 40 },
            { name: "stadium", type: "select", 
              items: stadiums, valueField: "_id",
              textField: "name", valueType: "string", width: 75 },
            { name: "country", type: "text", width: 75 },
            { name: "matchDate", type: "text", width: 75 },
            { type: "control" }
        ]
    });
});





















// var editableGrid = null;

// function loadTable() 
// {
//     editableGrid = new EditableGrid("EditableGridTable", {
        
//         // called when the XML has been fully loaded 
//         tableLoaded: function() { 
        
//             // display a message
//             _$("message").innerHTML = "<p class='ok'>Ready!</p>";
            
//             // renderer for the action column
//             this.setCellRenderer("action", new CellRenderer({render: function(cell, value) { 
//                 cell.innerHTML = "<a onclick=\"if (confirm('Are you sure you want to delete this person ? ')) editableGrid.remove(" + cell.rowIndex + ");\" style=\"cursor:pointer\">" +
//                                  "<span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a>";
//             }})); 

//             // render the grid
//             this.renderGrid("tablecontent", "table"); 
//         },
        
//         // called when some value has been modified: we display a message
//         modelChanged: function(rowIdx, colIdx, oldValue, newValue, row) { _$("message").innerHTML = "<p class='ok'>New value is '" + newValue + "'</p>"; }
//     });

//     // load XML file
//     editableGrid.loadJSON(document.URL + "/grid"); 
// }

// // start when window is loaded
// window.onload = loadTable;