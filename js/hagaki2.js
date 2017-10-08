
$(document).ready(function () {

	$('#next').click(function () {
		var ret = w2pPreviewex.validate(onValidateFinished);
		if (ret) {
			W2PExternal_outDebug("w2pPreviewex.validate() call succeeded");
		} else {
			showWarning("w2pPreviewex.validate() call failed");
		}
		return false;
	});

	$('#back').click(function () {
		var ret = w2pPreviewex.save(onSaveFinishedAndBack);
		if (ret) {
			W2PExternal_outDebug("w2pPreviewex.save() call succeeded");
		} else {
			showWarning("w2pPreviewex.save() call failed");
		}
		return false;
	});

});

function w2pPreviewex_onLoadFinished(resultId, detail) {
	if (resultId = "I001") {
	} else {
		showWarning(resultId + ", " + detail);
	}
}

function onValidateFinished(resultId, details) {
	if (resultId == "I001") {
		W2PExternal_outDebug("NOW save.");
		var ret = w2pPreviewex.save(onSaveFinished);
		if (ret) {
			W2PExternal_outDebug("w2pPreviewex.save() call succeeded");
		} else {
			showWarning("w2pPreviewex.save() call failed");
		}
	} else {
		var warn = "";
		for (var i = 0; i < details.length; ++i) {
			var arrDetails = details[i].split(',');
			var itemName = arrDetails[3];
			var message = arrDetails[1];
			if ((itemName != null) && (itemName.length > 0)) {
				warn += itemName + ":";
			}
			warn += message + "<br />";
		}
		showWarning(warn);
	}
}

function onSaveFinished(resultId, detail) {
	if (resultId == "I001") {
		W2PExternal_outDebug("NOW submit.");
		document.confirm.submit();
	} else {
		showWarning(resultId + ", " + detail);
	}
}

function onSaveFinishedAndBack(resultId, detail) {
	if (resultId == "I001") {
		W2PExternal_outDebug("NOW submit.");
		document.hagaki.submit();
	} else {
		showWarning(resultId + ", " + detail);
	}
}

function onAddImageFinished(notifyId, details) {
	if (notifyId == "I001") {
		resetInfo();
	} else {
		var mesg = "画像の追加に失敗しました。";
		if ((details != null) && (details.length > 0)) {
			var detail = details[0];
			if ((detail != null) && (detail.length > 0)) {
				mesg += "：" + detail;
			}
		}
		showWarning(mesg);
	}
}

function onDeleteImageFinished(resultId, detail) {
	if (resultId == "I001") {
		resetInfo();
	} else {
		showWarning(resultId + ", " + detail);
	}
}

function onResetHistoryFinished(resultId, detail) {
	if (resultId == "I001") {
		resetInfo();
	} else {
		showWarning(resultId + ", " + detail);
	}
}

function resetInfo() {
	W2PExternal_outDebug("[resetInfo()] ");
	$('#warn').css('display', 'none');
	$('#warn').html('');
}

function showWarning(mesg) {
	W2PExternal_outDebug("[showWarning()] " + mesg);
	$('#warn').css('display', 'block');
	$('#warn').html(mesg);
}

