jQuery(document).ready(function () {

    $("#AddNewContactButton").on('click', function () {
        $.ajax({
            url: '/AddressBook/AddNewContact',
            contentType: 'application/html',
            type: 'GET',
            dataType: 'html'
        }).success(function (result) {
           
            $("#partialView").html(result);
            $("#partialView").css("border", "solid 8px black");
            jQuery("#partialView").dialog(
            {
                width: 1000,
                height: 400,
                position: top,
                modal: true,
                overlay: {
                    opacity: 0.5
                }
            });
        });


    });


});