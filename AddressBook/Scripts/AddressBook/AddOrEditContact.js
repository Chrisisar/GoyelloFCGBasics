
jQuery(document).ready(function () {
    //jQuery('.date').datepicker({ dateFormat: "dd/mm/yy"});

    //$.datepicker.setDefaults({ maxDate: new Date() });
    //console.log($(".date").datepicker("option", "minDate"));
    //jQuery(".date").datepicker("option", "maxDate", "+1d");
    //console.log($(".date").datepicker("option", "minDate"));
    jQuery(".date").datepicker({
        maxDate: new Date()
    });
});
