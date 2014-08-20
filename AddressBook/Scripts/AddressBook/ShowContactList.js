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
            setupDialog();
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

    function addCloseDialogButtonHandler() {
        $("#CloseDialogButton").on('click', function() {
            $("#partialView").dialog('close');
            $("#overlay").hide();
        });
    };

    function setupDialog() {
        $("#overlay").show();
        $("#partialView").dialog(
        {
            autoResize: true,
            height: 'auto',
            position: top,
            modal: true,
            'open': function () { $(this).dialog('option', 'width', this.scrollWidth); }
        });
        $("#partialView").dialog("option", "position", "center");
        $("#partialView").show();
        addCloseDialogButtonHandler();
    };
});