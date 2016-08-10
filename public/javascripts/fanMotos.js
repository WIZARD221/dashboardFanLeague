$(function() {
    
    var teams = $("#teamsJson").text() ?  JSON.parse($("#teamsJson").text()) : {};
    teams.unshift({name: "", _id: null});
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
        // data: fanMotos,
        controller: {
            loadData: function(filter) {
                 return $.ajax({
                    type: "GET",
                    url: "/fanMotos",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/fanMotos",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/fanMotos",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/fanMotos",
                    data: item
                });
            }
        },
        fields: [
            { name: "team", type: "select", selectedIndex: -1,
              items: teams, valueField: "_id",
              textField: "name", valueType: "string", width: 75},
            { name: "isPublic", type: "text", width: 50 },
            { name: "createdBy", type: "text", width: 50 },
            { name: "text", type: "text", width: 50 },
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { type: "control" }
        ]
    });

    $("input.jsgrid-button.jsgrid-mode-button").click();
});




