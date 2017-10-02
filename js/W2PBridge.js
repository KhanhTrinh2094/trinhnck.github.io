//////////////////////////////////////////
// W2PBridge sample
// Copyright(C) 2012 CREO Networks Co.,Ltd.<http://www.creo.co.jp> All Rights Reserved.
//////////////////////////////////////////

/////////////////////////////
// Globals
/////////////////////////////

function W2PBridge_getSelfDomain() {
	return W2PExternal_getSelfDomain();
}

W2PBridge_onLoadFinished = function(resultId, detail) {
	W2PExternal_outDebug("[W2PBridge_onLoadFinished()] " + resultId + ", " + detail);
	w2pBridge.onLoadFinished(resultId, detail);
};

W2PBridge_onSaveFinished = function(resultId, detail) {
	W2PExternal_outDebug("[W2PBridge_onSaveFinished()] " + resultId + ", " + detail);
	w2pBridge.onSaveFinished(resultId, detail);
};

/////////////////////////////
// W2PBridge class
/////////////////////////////

var W2PBridge = function(swfId, callbackFunction) {
	this.swfId = swfId;
	this.swfObj = null;
	this.loadCallbackFunction = callbackFunction;
	this.callbacks = new Array();
	this.saveCallbackFunction = null;
};

W2PBridge.prototype = new W2PExternalBase();

W2PBridge.prototype.getValue = function(itemId) {
	W2PExternal_outDebug("[W2PBridge.getValue()] itemId: " + itemId);
	var val = null;
	var obj = this.getSwfObj();
	if (obj) {
		val = obj.getValue(itemId);
	}
	return val;
}

W2PBridge.prototype.setValue = function(itemId, inputValue) {
	W2PExternal_outDebug("[W2PBridge.setValue()] itemId: " + itemId);
	var retID = null;
	var obj = this.getSwfObj();
	if (obj) {
		retID = obj.setValue(itemId, inputValue);
		if (retID != 'I001') {
			W2PExternal_outDebug("itemId: " + itemId + ", retID: " + retID);
		}
	}
	return retID;
}


W2PBridge.prototype.save = function(callbackFunction) {
	W2PExternal_outDebug("[W2PBridge.save()]");
	var ret = false;
	try {
		this.saveCallbackFunction = callbackFunction;
		var obj = this.getSwfObj();
		if (obj) {
			obj.save();
			ret = true;
		}
	} catch(e) {
	}
	return ret;
};

W2PBridge.prototype.onSaveFinished = function(resultId, detail) {
	W2PExternal_outDebug("[W2PBridge.onSaveFinished()] " + resultId + ", " + detail);
	if ((this.saveCallbackFunction != null) && (typeof this.saveCallbackFunction == "function")) {
		this.saveCallbackFunction.call(this, resultId, detail);
	}
};

