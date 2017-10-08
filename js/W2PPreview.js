//////////////////////////////////////////
// W2PPreview sample
// Copyright(C) 2012 CREO Networks Co.,Ltd.<http://www.creo.co.jp> All Rights Reserved.
//////////////////////////////////////////

/////////////////////////////
// Globals
/////////////////////////////

W2PPreview_onLoadFinished = function (resultId, detail) {
	W2PExternal_outDebug("[W2PPreview_onLoadFinished()] " + resultId + ", " + detail);
	w2pPreview.onLoadFinished(resultId, detail);
};

W2PPreview_onReloadFinished = function (resultId, details) {
	W2PExternal_outDebug("[W2PPreview_onReloadFinished] " + resultId);
	w2pPreview.onReloadFinished(resultId, details);
};

W2PPreview_onValidateFinished = function (resultId, details) {
	W2PExternal_outDebug("[W2PPreview_onValidateFinished()] " + resultId);
	w2pPreview.onValidateFinished(resultId, details);
};

/////////////////////////////
// W2PPreview class
/////////////////////////////

var W2PPreview = function (swfId, callbackFunction) {
	this.swfId = swfId;
	this.swfObj = null;
	this.loadCallbackFunction = callbackFunction;
	this.callbacks = new Array();
	this.reloadCallbackFunction = null;
	this.validateCallbackFunction = null;
};

W2PPreview.prototype = new W2PExternalBase();

W2PPreview.prototype.reload = function (callbackFunction) {
	W2PExternal_outDebug("[W2PPreview.reload()]");
	var ret = false;
	try {
		this.reloadCallbackFunction = callbackFunction;
		var obj = this.getSwfObj();
		if (obj) {
			obj.reload();
			ret = true;
		}
	} catch (e) {
	}
	return ret;
};

W2PPreview.prototype.onReloadFinished = function (resultId, details) {
	W2PExternal_outDebug("[W2PPreview.onReloadFinished()] " + resultId);
	if ((this.reloadCallbackFunction != null) && (typeof this.reloadCallbackFunction == "function")) {
		this.reloadCallbackFunction.call(this, resultId, details);
	}
};

W2PPreview.prototype.validate = function (callbackFunction) {
	W2PExternal_outDebug("[W2PPreview.validate()]");
	var ret = false;
	try {
		this.validateCallbackFunction = callbackFunction;
		var obj = this.getSwfObj();
		if (obj) {
			obj.validate();
			ret = true;
		}
	} catch (e) {
	}
	return ret;
};

W2PPreview.prototype.onValidateFinished = function (resultId, details) {
	W2PExternal_outDebug("[W2PPreview.onValidateFinished()] " + resultId);
	if ((this.validateCallbackFunction != null) && (typeof this.validateCallbackFunction == "function")) {
		this.validateCallbackFunction.call(this, resultId, details);
	}
};
