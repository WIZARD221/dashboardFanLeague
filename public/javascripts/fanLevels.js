$(function() {

    var fanLevels = $("#fanLevelsJson").text() ?  JSON.parse($("#fanLevelsJson").text()) : {};
    fanLevels.unshift({name: "", _id: null});

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
        // data: fanLevels,
        controller: {
            loadData: function(filter) {
                 return $.ajax({
                    type: "GET",
                    url: "/fanLevels",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/fanLevels",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/fanLevels",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/fanLevels",
                    data: item
                });
            }
        },
        fields: [
            { name: "levelStartPoint", type: "text", width: 50 },
            { name: "levelEndPoint", type: "text", width: 50 },
            { name: "levelNumber", type: "text", width: 50 },
            { name: "levelName", type: "text", width: 50 },
            { name: "levelImageUrl", type: "image", width: 50 },
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { type: "control" }
        ]
    });

    $("input.jsgrid-button.jsgrid-mode-button").click();
    $("ul.nav li.active").removeClass('active');
    $("ul.nav li:contains('Fans')").addClass("active");
});




