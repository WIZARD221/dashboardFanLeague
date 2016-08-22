$(function() {

    // var articles = $("#articlesJson").text() ?  JSON.parse($("#articlesJson").text()) : {};
    var teams = $("#teamsJson").text() ?  JSON.parse($("#teamsJson").text()) : {};

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
                    url: "/articles",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/articles",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/articles",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/articles",
                    data: item
                });
            }
        },
        fields: [
            { name: "by", type: "text", width: 50 },
            { name: "link", type: "text", width: 50 },
            { name: "description", type: "text", width: 50 },
            { name: "imageUrl", type: "image", width: 50 },
            { name: "title", type: "text", width: 50 },
            { name: "team", type: "select", 
              items: teams, valueField: "_id",
              textField: "name", valueType: "string", width: 75},
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { type: "control" }
        ]
    });

    $("input.jsgrid-button.jsgrid-mode-button").click();
    $("ul.nav li.active").removeClass('active');
    $("ul.nav li:contains('Teams')").addClass("active");
});




