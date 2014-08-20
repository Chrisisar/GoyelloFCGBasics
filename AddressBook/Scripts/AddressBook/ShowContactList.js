jQuery(document).ready(function () {

    $("#overlay").hide();
    $("#partialView").hide();
    $("#AddNewContactButton").on('click', function () {
        var partialView = $('<div id="partialView"></div>');
        $.ajax({
            url: '/AddressBook/AddNewContact',
            contentType: 'application/html',
            type: 'GET',
            dataType: 'html'
        }).success(function (result) {
           
            partialView.append(result);
            setupDialog(partialView);
        });
    });

    $("#EditContactButton").on('click', function () {
        var $data = $(this).parent().children("input[type='hidden']").val();

        $.ajax({
            url: '/AddressBook/EditContact',
            data: "ContactID=" + $data,
            contentType: 'application/html',
            type: 'GET',
            dataType: 'html'
        }).success(function (result) {

            $("#partialView").html(result);
            setupDialog();
        });
    });
           
    function setupDialog(partialView) {
        $("#overlay").show();

        partialView.dialog(
        {
            autoResize: true,
            height: 'auto',
            position: top,
            modal: true,
            'open': function () {
                partialView.dialog('option', 'width', this.scrollWidth);
            },
            'close': function () {
                $("#overlay").hide();
                partialView.dialog().remove();
            },
            buttons: {
                Confirm: function () {
                    $.ajax({
                        url: '/AddressBook/AddNewContact',
                        type: 'POST',
                        data: $("#ContactForm").serialize(),
                        success: function (result) {
                            if (!result.Success) {
                                partialView.html(result);
                            } else {
                                partialView.dialog('close');

                            }
                        }
                    })
                },
                Cancel: function () {
                    partialView.dialog('close');
                }
            }
        });
        partialView.dialog("option", "position", "center");
        partialView.show();
    };

    function refreshContactList() {

    }
});