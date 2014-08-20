jQuery(document).ready(function () {
    refreshContactList();
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


    function bindButtons() {
        $(".editContactButton").on('click', function () {
            var $data = $(this).attr('data-id');
            var partialView = $('<div id="partialView"></div>');
            $.ajax({
                url: '/AddressBook/EditContact',
                data: "ContactID=" + $data,
                contentType: 'application/html',
                type: 'GET',
                dataType: 'html'
            }).success(function (result) {

                partialView.append(result);
                setupDialog(partialView);
            });
        });

        $(".removeContactButton").on('click', function () {
            var $data = $(this).attr('data-id');
            $.ajax({
                url: '/AddressBook/RemoveContact',
                data: "ContactID=" + $data,
                contentType: 'application/html',
                type: 'GET',
                dataType: 'html'
            }).success(function () {
                refreshContactList();
            });
        });
    }
           
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
                                refreshContactList();
                            }
                        }
                    });
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
        $.ajax({
            url: '/AddressBook/RefreshContactList',
            type: 'GET',
            success: function (result) {
                $("#contactListTable").html(result);
                bindButtons();
            },
            error: function (result) {
                alert("Error getting the list.");
            }
        });
    }
});