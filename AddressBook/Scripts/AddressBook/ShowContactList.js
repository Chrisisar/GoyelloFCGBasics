jQuery(document).ready(function () {

    $("#overlay").hide();
    $("#AddNewContactButton").on('click', function () {
        $.ajax({
            url: '/AddressBook/AddNewContact',
            contentType: 'application/html',
            type: 'GET',
            dataType: 'html'
        }).success(function (result) {
           
            $("#partialView").html(result);
            $("#overlay").show();
            jQuery("#partialView").dialog(
            {
                autoResize: true,
                height: 'auto',
                position: top,
                modal: true,
                'open': function () { $(this).dialog('option', 'width', this.scrollWidth); }
            });
            $("#partialView").dialog("option", "position", "center");
        });
    });
});