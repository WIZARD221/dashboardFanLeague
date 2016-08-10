$(function() {

   
    var teams = $("#teamsJson").text() ?  JSON.parse($("#teamsJson").text()) : {};
    teams.unshift({name: "", _id: null});
    var trivias = $("#triviasJson").text() ?  JSON.parse($("#triviasJson").text()) : {};
    trivias.unshift({name: "", _id: null});

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
                    url: "/trivias",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/trivias",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/trivias",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/trivias",
                    data: item
                });
            }
        },
        fields: [
            { name: "team", type: "select", selectedIndex: -1,
              items: teams, valueField: "_id",
              textField: "name", valueType: "string", width: 75},
            { name: "triviaQuestion", type: "text", width: 50 },
            { name: "correctAnswer", type: "text", width: 50 },
            { name: "triviaTime", type: "text", width: 50 },
            { name: "generalImage", type: "text", width: 50 },
            { name: "correctAnswer", type: "text", width: 50 },
            { name: "triviaType", type: "image", width: 50 },
            { name: "triviaLevel", type: "text", width: 50 },
            { name: "updated", type: "text", width: 50 },
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { type: "control" }
        ]
    });

    $("input.jsgrid-button.jsgrid-mode-button").click();
});




