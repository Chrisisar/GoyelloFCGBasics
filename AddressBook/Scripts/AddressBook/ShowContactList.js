jQuery(document).ready(function () {

    $("#overlay").hide();
    $("#AddNewContactButton").on('click', function () {
        $.ajax({
            url: '/AddressBook/AddNewContact',
            contentType: 'application/html',
            type: 'GET',
            dataType: 'html'
        }).success(function (result) {
           
           
            $("#overlay").show();
            $("#partialView").hide();
            $("#partialView").html(result);
            jQuery("#partialView").dialog(
            {
                autoResize: true,
                height: 'auto',
                position: 'middle',
                center: true,
                modal: true,
                'open': function () { $(this).dialog('option', 'width', this.scrollWidth);
                },
                'close': $("#overlay").hide()
            });
            $("#partialView").show();
        });
    });
});