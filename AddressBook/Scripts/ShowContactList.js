jQuery(document).ready(function () {

    $("#AddNewContactButton").on('click', function () {
        $.ajax({
            url: '/AddressBook/AddNewContact',
            contentType: 'application/html',
            type: 'GET',
            dataType: 'html'
        }).success(function (result) {
            $(".partialView").html(result);
        });
    });
});