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
            return this._insertPicker = $("<input>").dropzone({ url: "/file/post" });;
        },
     
        editTemplate: function(value) {
            return this._editPicker =$("<input>").dropzone({ url: "/file/post" });;
        },
     
        insertValue: function() {
            return this._insertPicker.datepicker("getDate").toISOString();
        },
     
        editValue: function() {
            return this._editPicker.datepicker("getDate").toISOString();
        },
        _createImage: function(value) {
                return $("<input>").attr("type", "image").attr("src", value);
        }
    });
    
    jsGrid.fields.image = ImageField;

    var MyDateField = function(config) {
        sGrid.Field.call(this, config);
    };
 
    MyDateField.prototype = new jsGrid.Field({
 
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
 
    jsGrid.fields.date = MyDateField;
});