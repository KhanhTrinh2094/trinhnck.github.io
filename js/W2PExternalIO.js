//////////////////////////////////////////
// W2PExternalIO sample
// Copyright(C) 2012 CREO Networks Co.,Ltd.<http://www.creo.co.jp> All Rights Reserved.
//////////////////////////////////////////

/////////////////////////////
// Globals
/////////////////////////////

var w2pExternalIO = null;

function W2PExternal_init() {
	W2PExternal_isDebugMode = false;
	W2PExternal_update = "2012/08/30 13:00";

	if (! window['console']) {
		window.console = null;
	}
	W2PExternal_outDebug(W2PExternal_update);
}

function W2PExternal_outDebug(mesg) {
	if (W2PExternal_isDebugMode && (console != null)) {
		console.log(mesg);
	}
}

function W2PExternalIO_getW2PExternalIO() {
	W2PExternal_outDebug("[W2PExternalIO_getW2PExternalIO()]");
	if (w2pExternalIO == null) {
		w2pExternalIO = new W2PExternalIO();
	}
	return w2pExternalIO;
}

function W2PExternalIO_createW2PBridge(swfId, onLoadFinished) {
	W2PExternal_outDebug("[W2PExternalIO_setW2PBridge()]");
	w2pExternalIO = W2PExternalIO_getW2PExternalIO();
	return w2pExternalIO.addW2PBridge(swfId, onLoadFinished);
}

function W2PExternalIO_createW2PPreview(swfId, onLoadFinished) {
	W2PExternal_outDebug("[W2PExternalIO_setW2PPreview()]");
	w2pExternalIO = W2PExternalIO_getW2PExternalIO();
	return w2pExternalIO.addW2PPreview(swfId, onLoadFinished);
}

function W2PExternalIO_createW2PPreviewex(swfId, onLoadFinished) {
	W2PExternal_outDebug("[W2PExternalIO_setW2PPreviewex()]");
	var w2pExternalIO = W2PExternalIO_getW2PExternalIO();
	return w2pExternalIO.addW2PPreviewex(swfId, onLoadFinished);
}

function W2PExternal_getSelfDomain() {
	W2PExternal_outDebug("[W2PExternal_getSelfDomain()]");
	var domain = w2pExternalIO.getSelfDomain();
	W2PExternal_outDebug("[W2PExternal_getSelfDomain()] ret:" + domain);
	return domain;
}

function W2PExternal_onNotify(objId, funcId, notifyId, details) {
	W2PExternal_outDebug("[W2PExternal_onNotify()]");
	w2pExternalIO.onNotify(objId, funcId, notifyId, details);
}

/////////////////////////////
// W2PExternalIO class
/////////////////////////////

var W2PExternalIO = function() {
	this.externalMap = new Object();
};

W2PExternalIO.prototype = {

	addW2PBridge : function(swfId, onLoadFinished) {
		W2PExternal_outDebug("[W2PExternalIO.addW2PBridge()] id: " + swfId);
		var externalObj = new W2PBridge(swfId, onLoadFinished);
		this.setExternal(externalObj);
		return externalObj;
	},

	addW2PPreview : function(swfId, onLoadFinished) {
		W2PExternal_outDebug("[W2PExternalIO.addW2PPreview()] id: " + swfId);
		var externalObj = new W2PPreview(swfId, onLoadFinished);
		this.setExternal(externalObj);
		return externalObj;
	},

	addW2PPreviewex : function(swfId, onLoadFinished) {
		W2PExternal_outDebug("[W2PExternalIO.addW2PPreviewex()] id: " + swfId);
		var externalObj = new W2PPreviewex(swfId, onLoadFinished);
		this.setExternal(externalObj);
		return externalObj;
	},

	setExternal : function(externalObj) {
		W2PExternal_outDebug("[W2PExternalIO.setExternal()] key: " + externalObj.swfId);
		this.externalMap[externalObj.swfId] = externalObj;
	},

	getSelfDomain : function() {
		W2PExternal_outDebug("[W2PExternalIO.getSelfDomain()]");
		return location.href.split('/')[2];
	},

	onNotify : function(objId, funcId, notifyId, details) {
		W2PExternal_outDebug("[W2PExternalIO.onNotify()] " + objId + ", " + funcId + ", " + notifyId);
		var externalObj = this.externalMap[objId];
		if (externalObj) {
			externalObj.onNotify(funcId, notifyId, details);
		} else {
			W2PExternal_outDebug("[W2PExternalIO.onNotify()] externalObj Not Fouind.");
		}
	}
};


/////////////////////////////
//main - output version
/////////////////////////////
W2PExternal_init();
