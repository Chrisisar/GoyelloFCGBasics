
jQuery(document).ready(function () {
    //jQuery('.date').datepicker({ dateFormat: "dd/mm/yy"});

    $.datepicker.setDefaults({ dateFormat: 'yy-mm-dd', maxDate: new Date() });
    console.log($(".date").datepicker("option", "minDate"));
    jQuery(".date").datepicker("option", "maxDate", "+1d");
    console.log($(".date").datepicker("option", "minDate"));
    jQuery(".date").datepicker({
        maxDate: new Date()
    });

    DateToTextBoxes();

    $("#DateOfBirth-Day").add("#DateOfBirth-Month").add("#DateOfBirth-Year").on('input', function () {
        if ($("#DateOfBirth-Day").length == "1") {
            $("#DateOfBirth-Day").val('0' + $("#DateOfBirth-Day").val());
        }
        var $date = $("#DateOfBirth-Year").val() + '-' + $("#DateOfBirth-Month").val() + '-' + $("#DateOfBirth-Day").val();
        $("#DateOfBirth").val($date);
    });

    function DateToTextBoxes() {
        var $dates = $("#DateOfBirth").val().split("-");
        $("#DateOfBirth-Day").val($dates[2]);
        $("#DateOfBirth-Month").val($dates[1]);
        $("#DateOfBirth-Year").val($dates[0]);
    }
});
