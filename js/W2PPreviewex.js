//////////////////////////////////////////
// W2PPreviewex sample
// Copyright(C) 2012 CREO Networks Co.,Ltd.<http://www.creo.co.jp> All Rights Reserved.
//////////////////////////////////////////

/////////////////////////////
// Globals
/////////////////////////////

W2PPreviewex_onLoadFinished = function (resultId, detail) {
	console.log("[W2PPreviewex_onLoadFinished()] " + resultId + ", " + detail);
	W2PExternal_outDebug("[W2PPreviewex_onLoadFinished()] " + resultId + ", " + detail);
	w2pPreviewex.onLoadFinished(resultId, detail);
};

W2PPreviewex_onValidateFinished = function (resultId, detail) {
	console.log("[W2PPreviewex_onValidateFinished()] " + resultId + ", " + detail);
	W2PExternal_outDebug("[W2PPreviewex_onValidateFinished()] " + resultId + ", " + detail);
	w2pPreviewex.onValidateFinished(resultId, detail);
};

W2PPreviewex_onSaveFinished = function (resultId, detail) {
	console.log("[W2PPreviewex_onSaveFinished()] " + resultId + ", " + detail);
	W2PExternal_outDebug("[W2PPreviewex_onSaveFinished()] " + resultId + ", " + detail);
	w2pPreviewex.onSaveFinished(resultId, detail);
};


/////////////////////////////
// W2PPreviewex class
/////////////////////////////

var W2PPreviewex = function (swfId, callbackFunction) {
	this.swfId = swfId;
	this.swfObj = null;
	this.callbacks = new Array();
	this.loadCallbackFunction = callbackFunction;
	this.validateCallbackFunction = null;
	this.saveCallbackFunction = null;
};

W2PPreviewex.prototype = new W2PExternalBase();

W2PPreviewex.prototype.validate = function (callbackFunction) {
	console.log("[W2PPreviewex.validate()]");
	W2PExternal_outDebug("[W2PPreviewex.validate()]");
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

W2PPreviewex.prototype.onValidateFinished = function (resultId, details) {
	W2PExternal_outDebug("[W2PPreviewex.onValidateFinished()] " + resultId);
	console.log("[W2PPreviewex.onValidateFinished()] " + resultId);
	if ((this.validateCallbackFunction != null) && (typeof this.validateCallbackFunction == "function")) {
		this.validateCallbackFunction.call(this, resultId, details);
	}
};

W2PPreviewex.prototype.save = function (callbackFunction) {
	console.log("[W2PPreviewex.save()]");
	W2PExternal_outDebug("[W2PPreviewex.save()]");
	var ret = false;
	this.saveCallbackFunction = callbackFunction;
	var obj = this.getSwfObj();
	if (obj) {
		obj.save();
		ret = true;
	}
	return ret;
};

W2PPreviewex.prototype.onSaveFinished = function (resultId, detail) {
	console.log("[W2PPreviewex.onSaveFinished()] " + resultId + ", " + detail);
	W2PExternal_outDebug("[W2PPreviewex.onSaveFinished()] " + resultId + ", " + detail);
	if ((this.saveCallbackFunction != null) && (typeof this.saveCallbackFunction == "function")) {
		this.saveCallbackFunction.call(this, resultId, detail);
	}
};
