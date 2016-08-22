var grid;

$(function() {

    var teams = $("#teamsJson").text() ?  JSON.parse($("#teamsJson").text()) : {};
    teams.unshift({name: "", _id: null});

    grid = new jsGrid.Grid($("#jsGrid"), {
        height: "auto",
        width: "93%",
        filtering: true,
        inserting: true,
        // editing: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageLoading: false,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete client?",
        controller: {
            loadData: function(filter) {
                 return $.ajax({
                    type: "GET",
                    url: "/keywords",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/keywords",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/keywords",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/keywords",
                    data: item
                });
            }
        },
        fields: [
            { name: "name", type: "select", 
              items: teams, valueField: "_id",
              textField: "name", valueType: "string", width: 75},
            { name: "keyWord", type: "text", width: 50, editing: false },
            { name: "_id", type: "text", width: 75, editing: false, visible: false },
            { type: "control" }
        ],

        onDataLoaded: function(args) {
            var keyWords = arrangeData(args.data);
            args.grid.data = keyWords;
            args.grid.refresh();
        },

        onItemInserted: function (args) {
            var keyWord = arrangeItem(args.item);
            args.grid.data.push(keyWord);
            args.grid.refresh();
        }

    });

    function arrangeData(data) {
        var keyWords =[];

        for (var i = 0; i < data.length; i++) {
            var teamKeyWords = data[i].keyWords ? data[i].keyWords : [];

            if (teamKeyWords.length > 0) {
                for (var j = 0; j < teamKeyWords.length; j++) {
                    var keyWord= {};
                    keyWord.name = data[i]._id;
                    keyWord._id = data[i]._id;
                    keyWord.keyWord = teamKeyWords[j];
                    keyWords.push(keyWord);
                }
            }
        }

        return keyWords;
    }

    function arrangeItem(item) {
        var keyWord= {};
        keyWord.name = item._id;
        keyWord._id = item._id;
        keyWord.keyWord = item.keyWords[item.keyWords.length-1];

        return keyWord;
    }

    $("input.jsgrid-button.jsgrid-mode-button").click();
    $("ul.nav li.active").removeClass('active');
    $("ul.nav li:contains('Teams')").addClass("active");
});




