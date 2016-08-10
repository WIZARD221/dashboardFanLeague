$(function() {

   
    var teams = $("#teamsJson").text() ?  JSON.parse($("#teamsJson").text()) : {};
    teams.unshift({name: "", _id: null});
    var polls = $("#pollsJson").text() ?  JSON.parse($("#pollsJson").text()) : {};
    polls.unshift({name: "", _id: null});

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
                    url: "/polls",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/polls",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/polls",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/polls",
                    data: item
                });
            }
        },
        fields: [
            { name: "team", type: "select", selectedIndex: -1,
              items: teams, valueField: "_id",
              textField: "name", valueType: "string", width: 75},
            { name: "question", type: "text", width: 50 },
            { name: "pollType", type: "text", width: 50 },
            { name: "lastMatchResult", type: "text", width: 50 },
            { name: "launchDate", type: "text", width: 50 },
            { name: "created", type: "text", width: 50 },
            { name: "image", type: "image", width: 50 },
            { name: "answers", type: "text", width: 50 },
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { type: "control" }
        ]
    });

    $("input.jsgrid-button.jsgrid-mode-button").click();
});




