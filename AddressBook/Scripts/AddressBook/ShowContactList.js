var ContactList = (function () {

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

    var refreshContactList = function () {
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

    var setupDialog = function (partialView, operationUrl) {
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

    var editContact = function (id) {
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

    var bindButtons = function() {
        var editButtons = $(".editContactButton");
        editButtons.each().on('click', function() {
            var itemId = $(this).attr('data-id');
            editContact(itemId);
        });

        var removeButtons = $(".removeContactButton");
        removeButtons.each().on('click', function () {
            var itemId = $(this).attr('data-id');
            removeContact(itemId);
        });
    }
    return {
        EditContact: editContact,
        RemoveContact: removeContact,
        RefreshContactList: refreshContactList,
        SetupDialog: setupDialog
    };
})();

jQuery(document).ready(function () {
    ContactList.RefreshContactList();
    $("#overlay").hide();
    $("#partialView").hide();
    $("#AddNewContactButton").on('click', function () {
        var partialView = $('<div id="partialView"></div>');
        var operationUrl = '/AddressBook/AddNewContact';
        $.ajax({
            url: operationUrl,
            contentType: 'application/html',
            type: 'GET',
            dataType: 'html'
        }).success(function (result) {

            partialView.append(result);
            ContactList.SetupDialog(partialView, operationUrl);
        });
    });
});