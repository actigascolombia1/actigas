/**
 * ===================================================================
 * AUTHOR: Neyib Alexander Daza Guerrero
 * POSITION: Senior Developer
 * ===================================================================
 * DESCRIPTION:
 *
 * ===================================================================
 */

/**
 * Enabled or disabled loader spinner
 * @param enabled
 */
var loader = function (enabled) {
    if (enabled === true) {
        $("#loading").removeClass("hidden");
    } else {
        $("#loading").addClass("hidden");
    }
};

/**
 * Send all ajax request based on next params
 *
 * @param url
 * @param method
 * @param data
 * @param successCallback
 * @param errorCallback
 */
var ajaxRequest = function (
    url,
    method,
    data,
    successCallback,
    errorCallback
) {
    loader(true);
    method = method.toUpperCase();
    if (typeof data === 'undefined' || typeof data === 'undefined') {
        return;
    }
    $.ajax({
        url: url,
        data: data,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        type: method,
        beforeSend: function () {
            if (typeof id !== 'undefined' && id !== '') {
                loader(true);
            }
        },
        success: function (response) {
            if (typeof successCallback !== 'undefined' && successCallback !== '') {
                loader(false);
                eval(successCallback + '(' + JSON.stringify(response) + ')');
            }
        },
        error: function (jqXHR) {
            if (typeof errorCallback !== 'undefined' && errorCallback !== '') {
                eval(errorCallback + '(' + JSON.stringify(jqXHR) + ')');
            } else {
                loader(false);
                showStickMessage('error', jqXHR.responseJSON.statusDescription);
            }
        }
    });
};

/**
 * Show a up right temporary message (Toast Notify)
 *
 * @param type
 * @param message
 */
var showMessage = function (type, message) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "700",
        "hideDuration": "1000",
        "timeOut": "4000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    switch (type) {
        case 'success':
            toastr.success(message);
            break;
        case 'error':
            toastr.error(message);
            break;
        case 'warning':
            toastr.warning(message);
            break;
        case 'info':
            toastr.info(message);
            break;
    }
};

/**
 * Show stick note toastr
 *
 * @param type
 * @param message
 */
var showStickMessage = function (type, message) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": "0",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    switch (type) {
        case 'success':
            toastr.success(message);
            break;
        case 'error':
            toastr.error(message);
            break;
        case 'warning':
            toastr.warning(message);
            break;
        case 'info':
            toastr.info(message);
            break;
    }
};

/**
 * Show sweet alert
 *
 * "warning", "error", "success", "info"
 *
 * @param type
 * @param title
 * @param message
 * @param textConfirmButton
 */
var showSweetAlert = function (type, title, message, textConfirmButton) {
    swal({
        title: title,
        text: message,
        icon: type,
        confirmButtonText: textConfirmButton,
        html: true,
        closeOnConfirm: true
    });
};

/**
 * Show a sweet alert
 *
 * @param type
 * @param title
 * @param message
 * @param showCancelButton
 * @param textCancelButton
 * @param textConfirmButton
 * @param confirmCallback
 * @param closeOnConfirm
 * @param cancelCallback
 */
var showSweetAlertWithOptions = function (type, title, message, showCancelButton, textCancelButton, textConfirmButton, confirmCallback, closeOnConfirm, cancelCallback) {
    swal({
        button: {
            text: "Estoy quemado en el archivo helpers.js"
        },
        title: title,
        text: message,
        icon: type,
        cancelButtonColor: "#EC4758",
        showCancelButton: showCancelButton,
        cancelButtonText: textCancelButton,
        confirmButtonColor: "#21356A",
        confirmButtonText: textConfirmButton,
        closeOnConfirm: closeOnConfirm,
        html: true
    }, function (isConfirm) {
        if (isConfirm) {
            if (typeof confirmCallback !== 'undefined' && confirmCallback !== '') {
                eval(confirmCallback + '()');
            } else {
                return false;
            }
        } else {
            if (typeof cancelCallback !== 'undefined' && cancelCallback !== '') {
                eval(cancelCallback + '()');
            } else {
                return false;
            }
        }
    });
};

/**
 * Storage element in HTML5 sessionStorage
 *
 * @param keyName
 * @param keyValue
 */
var storeInSessionStorage = function (keyName, keyValue) {
    sessionStorage.setItem(keyName, keyValue);
};

/**
 * Get element from HTML5 sessionStorage
 *
 * @param keyName
 * @returns {string}
 */
var getInSessionStorage = function (keyName) {
    return sessionStorage.getItem(keyName);
};
