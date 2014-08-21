window.setupDialog = function(partialView, operationUrl) {
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
};

window.refreshContactList = function() {
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

window.EditContact = function (id) {
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

window.RemoveContact = function(id) {
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

jQuery(document).ready(function () {
    refreshContactList();
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
            setupDialog(partialView, operationUrl);
        });
    });


    function bindButtons() {
        //$(".editContactButton").on('click', EditContact());

        //$(".removeContactButton").on('click', RemoveContact());
    }
           
    
});