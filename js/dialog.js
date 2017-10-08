function dialog_confirm_open(title, message, response) {
	var _dlg = $('<div>' + message + '</div>')

	_dlg.dialog({
		open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		close: function (event) {
			$(this).dialog('destroy');
			$(event.target).remove();
		},
		closeOnEscape: false,
		modal: true,
		resizable: false,
		title: title,
		position: {
			my: "center center-200"
		},
		buttons: {
			'はい': function () {
				$(this).dialog('close');
				response(true);
			},
			'いいえ': function () {
				$(this).dialog('close');
				response(false);
			}
		}
	});
}

function dialog_ok_open(title, message, response) {
	var _dlg = $('<div>' + message + '</div>')

	_dlg.dialog({
		open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		close: function (event) {
			$(this).dialog('destroy');
			$(event.target).remove();
		},
		closeOnEscape: false,
		modal: true,
		resizable: false,
		title: title,
		position: {
			my: "center center-200"
		},
		buttons: {
			'OK': function () {
				$(this).dialog('close');
				if (typeof response !== 'undefined') {
					response();
				}
			}
		}
	});
}

function dialog_prompt_open(title, message, okButtonName, cancelButtonName, response) {
	var _dlg = $('<div>' + message + '<br><input id="inputData" size="37" type="text" value=""></div>');

	_dlg.dialog({
		open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		close: function (event) {
			$(this).dialog('destroy');
			$(event.target).remove();
		},
		closeOnEscape: false,
		modal: true,
		resizable: false,
		title: title,
		position: {
			my: "center center-200"
		},
		buttons: [
			{
				text: okButtonName,
				click: function () {
					var inputData = $('#inputData').val();
					$(this).dialog('close');
					response(true, inputData);
				}
			},
			{
				text: cancelButtonName,
				click: function () {
					$(this).dialog('close');
					response(false);
				}
			}]
	});
}