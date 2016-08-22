$(function() {

    var fanDuties = $("#fanDutiesJson").text() ?  JSON.parse($("#fanDutiesJson").text()) : {};
    fanDuties.unshift({name: "", _id: null});

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
        // data: fanDuties,
        controller: {
            loadData: function(filter) {
                 return $.ajax({
                    type: "GET",
                    url: "/fanDuties",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/fanDuties",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/fanDuties",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/fanDuties",
                    data: item
                });
            }
        },
        fields: [
            { name: "created", type: "text", width: 50 },
            { name: "fan", type: "text", width: 50 },
            { name: "updated", type: "text", width: 50 },
            { name: "scoreGot", type: "text", width: 50 },
            { name: "showDuty", type: "text", width: 50 },
            { name: "clickOn", type: "text", width: 50 },
            { name: "dutyId", type: "text", width: 50 },
            { name: "dutyType", type: "text", width: 50 },
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { type: "control" }
        ]
    });

    $("input.jsgrid-button.jsgrid-mode-button").click();
    $("ul.nav li.active").removeClass('active');
    $("ul.nav li:contains('Fans')").addClass("active");
});




