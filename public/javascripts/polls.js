$(function() {

   
    var cloudinaryJson = JSON.parse($("#cloudinaryJson").text());

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
    $("#pollForm").submit(function (event) {
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        $.ajax(
        {
            url : formURL,
            type: "POST",
            data : postData,
            success:function(data, textStatus, jqXHR) 
            {
                //data: return data from server
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
                //if fails      
            }
        });
        event.preventDefault(); //STOP default action
    })


    // Dropzone.options.url = cloudinaryJson.form_attrs.action;
    $("input.answerImage").dropzone({
                url: cloudinaryJson.form_attrs.action,
                init: function () {
                    this.on('sending', function (file, xhr, formData) {
                        formData.append('api_key', cloudinaryJson.hidden_fields.api_key);
                        formData.append('timestamp', cloudinaryJson.hidden_fields.timestamp);
                        formData.append('signature', cloudinaryJson.hidden_fields.signature);
                    });
                    this.on('success', function (file, response) {
                        $(this.element).val(response.url);
                        $(this.element).closest('td').find('img').attr('src', response.url);
                        console.log('Success! Cloudinary public ID is', response.public_id);
                    });
                }
            });

    $("#addAnswer").on("click", function(event){
        event.preventDefault();
        var numOfAnswers = $("tr.answer").length;
        var answerInputs = $("tr.answer").eq(0).clone();
        answerInputs.find("td.number").text(numOfAnswers + 1);
        answerInputs.find(".answerText").attr('name', "answerText[" + numOfAnswers + "]");
        answerInputs.find("input.answerImage").attr('name', "answerImage[" + numOfAnswers + "]");
        answerInputs.find(".answerSum").attr('name', "answerSum[" + numOfAnswers + "]");
        $("table#answers").append(answerInputs);
        answerInputs.find("input.answerImage").dropzone({
                url: cloudinaryJson.form_attrs.action,
                init: function () {
                    this.on('sending', function (file, xhr, formData) {
                        formData.append('api_key', cloudinaryJson.hidden_fields.api_key);
                        formData.append('timestamp', cloudinaryJson.hidden_fields.timestamp);
                        formData.append('signature', cloudinaryJson.hidden_fields.signature);
                    });
                    this.on('success', function (file, response) {
                        $(this.element).val(response.url);
                        $(this.element).closest('.controls').find('img').attr('src', response.url);
                        console.log('Success! Cloudinary public ID is', response.public_id);
                    });
                }
            });
    })

});




