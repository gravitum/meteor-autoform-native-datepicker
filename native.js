/* global AutoForm, $ */

AutoForm.addInputType("native-datepicker", {
  template: "afBootstrapDatepicker",
  valueOut: function () {

    if (this.data("value")) {
      return this.data("value")
    }
  },
  valueConverters: {
    "string": function (val) {
      return (val instanceof Date) ? AutoForm.Utility.dateToDateStringUTC(val) : val;
    },
    "stringArray": function (val) {
      if (val instanceof Date) {
        return [AutoForm.Utility.dateToDateStringUTC(val)];
      }
      return val;
    },
    "number": function (val) {
      return (val instanceof Date) ? val.getTime() : val;
    },
    "numberArray": function (val) {
      if (val instanceof Date) {
        return [val.getTime()];
      }
      return val;
    },
    "dateArray": function (val) {
      if (val instanceof Date) {
        return [val];
      }
      return val;
    }
  }
});

Template.afBootstrapDatepicker.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    delete atts.datePickerOptions;
    delete atts.nativePickerOptions;
    return atts;
  }
});

var showPicker = _.throttle(function(inst){
    var input = inst.$("input")
    var options = {
      date: input.data("value") || new Date(),
      mode: 'date'
    };
    options.windowTitle =  inst.data.label || ""
    if(inst.data.atts.nativePickerOptions) {
      _.extend(options,inst.data.atts.nativePickerOptions);
    }
    datePicker.show(options, function(date){
      if(date instanceof Date){
        input.data("value", date);
        if(inst.data.atts.nativePickerOptions && inst.data.atts.nativePickerOptions.format){
          input.val(moment(date).format(inst.data.atts.format));
        }else{
          input.val(date)
        }
        
        // alert("date result " + date);
        input.trigger("change")         
      }
 
    });
}, 700) 
Template.afBootstrapDatepicker.events({
  "click": function(ev,inst){
    showPicker(inst);
  }
})

var defaults = {
        mode : 'date',
        date : '',
        minDate: 0,
        maxDate: 0,
        doneButtonLabel: "Done",
        cancelButtonLabel: "Cancel",
        clearButtonLabel: "Clear",
        clearButton: false,
        cancelButton: false,
        windowTitle: ""
    };



function utcToLocal(utcDate) {
  var localDateObj = new Date();
  localDateObj.setDate(utcDate.getUTCDate());
  localDateObj.setMonth(utcDate.getUTCMonth());
  localDateObj.setFullYear(utcDate.getUTCFullYear());
  localDateObj.setHours(0);
  localDateObj.setMinutes(0);
  localDateObj.setSeconds(0);
  localDateObj.setMilliseconds(0);
  return localDateObj;
}
