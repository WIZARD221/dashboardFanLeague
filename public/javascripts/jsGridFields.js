$(function() {

    var ImageField = function(config) {
        jsGrid.Field.call(this, config);
    };
 
    ImageField.prototype = new jsGrid.Field({
 
        css: "image-field",            // redefine general property 'css'
        align: "center",              // redefine general property 'align'
     
     
        // sorter: function(date1, date2) {
        //     return new Date(date1) - new Date(date2);
        // },
     
        itemTemplate: function(value) {
            return this._createImage(value);
        },
     
        insertTemplate: function(value) {
            var cloudinaryJson = JSON.parse($("#cloudinaryJson").text());
            return this._insertPicker = $('<input>').dropzone({
                url: cloudinaryJson.form_attrs.action,
                init: function () {
                    this.on('sending', function (file, xhr, formData) {
                        formData.append('api_key', cloudinaryJson.hidden_fields.api_key);
                        formData.append('timestamp', cloudinaryJson.hidden_fields.timestamp);
                        formData.append('signature', cloudinaryJson.hidden_fields.signature);
                    });
                    this.on('success', function (file, response) {
                        var imgInput = $('<input>').attr('src', response.url);
                        $(this.element).parent().append(imgInput);
                        console.log('Success! Cloudinary public ID is', response.public_id);
                    });
                }

            })
        },
     
        editTemplate: function(value) {
            var cloudinaryJson = JSON.parse($("#cloudinaryJson").text());
            return this._editPicker = $('<input>').dropzone({
                url: cloudinaryJson.form_attrs.action,
                init: function () {
                    this.on('sending', function (file, xhr, formData) {
                        formData.append('api_key', cloudinaryJson.hidden_fields.api_key);
                        formData.append('timestamp', cloudinaryJson.hidden_fields.timestamp);
                        formData.append('signature', cloudinaryJson.hidden_fields.signature);
                    });
                    this.on('success', function (file, response) {
                        $(this.element).val(response.url);
                        $(this.element).closest('tr').next().find('.image-field input').attr('src', response.url);
                        console.log('Success! Cloudinary public ID is', response.public_id);
                    });
                }

            })
        },
     
        insertValue: function() {
            return this._insertPicker.val();
        },
     
        editValue: function() {
            return this._editPicker.val();
        },
        _createImage: function(value) {
                return $("<input>").attr("type", "image").attr("src", value);
        }
    });

    jsGrid.fields.image = ImageField;

    var DateField = function(config) {
        sGrid.Field.call(this, config);
    };
 
    DateField.prototype = new jsGrid.Field({
 
        css: "date-field",            // redefine general property 'css'
        align: "center",              // redefine general property 'align'
     
        myCustomProperty: "foo",      // custom property
     
        sorter: function(date1, date2) {
            return new Date(date1) - new Date(date2);
        },
     
        itemTemplate: function(value) {
            return new Date(value).toDateString();
        },
     
        insertTemplate: function(value) {
            return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
        },
     
        editTemplate: function(value) {
            return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
        },
     
        insertValue: function() {
            return this._insertPicker.datepicker("getDate").toISOString();
        },
     
        editValue: function() {
            return this._editPicker.datepicker("getDate").toISOString();
        }
    });
 
    jsGrid.fields.date = DateField;
});