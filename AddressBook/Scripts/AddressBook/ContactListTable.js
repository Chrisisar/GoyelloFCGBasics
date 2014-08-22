var ContactListTable = (function ($) {
    var self = this;


    function SetupPage() {
        self.ajaxRefreshContact = '/AddressBook/RefreshContactList';

        refreshContactList();
        $("#contactListTable").ajaxComplete(bindButtons);
        $("#overlay").hide();
        $("#partialView").hide();

        $("#AddNewContactButton").click(function () {
            var partialView = $('<div id="partialView"></div>');
            var operationUrl = '/AddressBook/AddNewContact';
            $.ajax({
                url: operationUrl,
                contentType: 'application/html',
                type: 'GET',
                dataType: 'html'
            }).success(function (result) {
                partialView.append(result);
                setupDialog(partialView, operationUrl);
            });
        });
    }

    SetupPage();

    var removeContact = function (id) {
        var operationUrl = '/AddressBook/RemoveContact';
        $.ajax({
            url: operationUrl,
            data: "ContactID=" + id,
            contentType: 'application/html',
            type: 'GET',
            dataType: 'html'
        }).success(function () {
            refreshContactList();
        });
    }

    function refreshContactList() {
        $.ajax({
            url: ajaxRefreshContact,
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

    function setupDialog(partialView, operationUrl) {
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
                        url: operationUrl,
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
    }

    function editContact(id) {
        var partialView = $('<div id="partialView"></div>');
        var operationUrl = '/AddressBook/EditContact';
        $.ajax({
            url: operationUrl,
            data: "ContactID=" + id,
            contentType: 'application/html',
            type: 'GET',
            dataType: 'html'
        }).success(function (result) {

            partialView.append(result);
            setupDialog(partialView, operationUrl);
        });
    }

    function bindButtons() {
        var editButtons = $(".editContactButton");
        editButtons.on('click', function () {
            var itemId = $(this).attr('data-id');
            editContact(itemId);
        });

        var removeButtons = $(".removeContactButton");
        removeButtons.on('click', function () {
            var itemId = $(this).attr('data-id');
            removeContact(itemId);
        });
    }

    return {
        EditContact: editContact,
        RemoveContact: removeContact,
        SetupDialog: setupDialog,
    };

})(jQuery);