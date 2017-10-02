var isReloaded = false;

function w2pBridge_onLoadFinished(resultId, detail) {
	if (resultId == "I001") {
		if (typeof setFlashValueToItems == 'function') {
			setFlashValueToItems();
		} else {
			W2PExternal_outDebug("setFlashValueToItems() Not Found.");
		}
	} else {
		var mesg =  "ブリッジFlash のロードに失敗しました。：" + detail;
		addWarning(mesg);
		location.href = "#info";
	}
}

function w2pPreview_onLoadFinished(resultId, detail) {
	if (resultId != "I001") {
		var mesg = "プレビューFlash のロードに失敗しました。：" + detail;
		location.href = "#info";
	}
}

function onSaveFinished(resultId, detail) {
	if (resultId == "I001") {
		if(isReloaded) {
			var ret = w2pPreview.reload(onReloadFinished);
		} else {
			var ret = w2pPreview.validate(onValidateFinished);
		}
	} else {
		W2PExternal_outDebug(resultId + ", " + detail);
		var mesg = "";
		if (resultId == "E103") {
			mesg += "版下ドキュメントの取得に失敗しました。";
		} else if (resultId == "E201") {
			mesg += "組版、または保存に失敗しました。";
		} else if (resultId == "E900") {
			mesg += "はみ出しエラーがあります。";
		} else if (resultId == "E201") {
			mesg += "重なりエラーがあります。";
		} else {
			mesg += "結果ID：" + resultId;
		}
		if (mesg != "") {
			addWarning(mesg);
		}
	}
}

function onReloadFinished(resultId, details) {
	if (resultId == "I001") {
		var ret = w2pPreview.validate(onValidateFinished);
		if (ret) {
			W2PExternal_outDebug("w2pPreview.validate() call succeeded");
		} else {
			showWarning("w2pPreview.validate() call failed");
		}
	} else {
		W2PExternal_outDebug(resultId + ", " + detail);
		var mesg = "";
		if (resultId == "E101") {
			mesg += "初期化に失敗しました。";
		} else if (resultId == "E102") {
			mesg += "版下データのロード失敗に失敗しました。";
		} else {
			mesg += "結果ID：" + resultId;
		}
		if (mesg != "") {
			addWarning(mesg);
		}
	}
	isReloaded = false;
}

function onValidateFinished(resultId, details) {
	if (resultId == "I001") {
		W2PExternal_outDebug("NOW submit.");
		document.easyprev.postback_action.value = "next";
		document.easyprev.submit();
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

function onSaveFinishedAndReload(resultId, detail) {
	if (resultId == "I001") {
	} else {
//		addWarning(resultId + ", " + detail);
		W2PExternal_outDebug(resultId + ", " + detail);
		var mesg = "";
		if (resultId == "E103") {
			mesg += "版下ドキュメントの取得に失敗しました。";
		} else if (resultId == "E201") {
			mesg += "組版、または保存に失敗しました。";
		} else if (resultId == "E900") {
			mesg += "はみ出しエラーがあります。";
		} else if (resultId == "E201") {
			mesg += "重なりエラーがあります。";
		} else {
			mesg += "結果ID：" + resultId;
		}
		if (mesg != "") {
			addWarning(mesg);
		}
	}
	w2pPreview.reload();
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

function addWarning(mesg) {
	W2PExternal_outDebug("[addWarning()] " + mesg);
	$('#warn').css('display', 'block');
	$('#warn').append(mesg + "<br />");
}
