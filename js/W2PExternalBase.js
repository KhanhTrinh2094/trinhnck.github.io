//////////////////////////////////////////
// W2PExternalBase sample
// Copyright(C) 2012 CREO Networks Co.,Ltd.<http://www.creo.co.jp> All Rights Reserved.
//////////////////////////////////////////

/////////////////////////////
// W2PExternalBase class
/////////////////////////////

var W2PExternalBase = function (swfId, callbackFunction) {
	this.swfId = swfId;
	this.swfObj = null;
	this.loadCallbackFunction = callbackFunction;
	this.callbacks = new Array();
};

W2PExternalBase.prototype = {

	onLoadFinished: function (resultId, detail) {
		W2PExternal_outDebug("[W2PExternalBase.onLoadFinished()] " + resultId + ", " + detail);
		if ((this.loadCallbackFunction != null)
			&& (typeof this.loadCallbackFunction == "function")) {
			this.loadCallbackFunction.call(this, resultId, detail);
		}
	},

	getSwfObj: function () {
		W2PExternal_outDebug("[W2PExternalBase.getSwfObj()]");
		console.log(this.swfId);
		if (this.swfObj == null) {
			W2PExternal_outDebug("[W2PExternalBase.getSwfObj()] now get #" + this.swfId);
			this.swfObj = $("#" + this.swfId).get(0);
			if (this.swfObj == null) {
				W2PExternal_outDebug("Not found swf object: " + this.swfId);
			}
		}
		return this.swfObj;
	},

	setCallbacks: function (callbacks) {
		W2PExternal_outDebug("[W2PExternalBase.getCallbacks()]");
		this.callbacks = callbacks;
	},

	onNotify: function (funcId, notifyId, details) {
		W2PExternal_outDebug("[W2PExternalBase.onNotify()] " + funcId + ", " + notifyId);
		var callbackByFuncId = this.callbacks[funcId];
		if ((callbackByFuncId != null)
			&& (typeof callbackByFuncId == "function")) {
			callbackByFuncId.call(null, notifyId, details);
		} else {
			W2PExternal_outDebug("[W2PExternalBase.onNotify()] function Not Found.");
		}
	}
};

