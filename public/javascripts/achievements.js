$(function() {

    var achievements = $("#achievementsJson").text() ?  JSON.parse($("#achievementsJson").text()) : {};
    achievements.unshift({name: "", _id: null});

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
                    url: "/achievements",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/achievements",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/achievements",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/achievements",
                    data: item
                });
            }
        },
        fields: [
            { name: "description", type: "text", width: 50 },
            { name: "name", type: "text", width: 50 },
            { name: "imageUrl", type: "image", width: 50 },
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { type: "control" }
        ]
    });

    $("input.jsgrid-button.jsgrid-mode-button").click();
    $("ul.nav li.active").removeClass('active');
    $("ul.nav li:contains('Fans')").addClass("active");
});




