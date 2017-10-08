//////////////////////////////////////////
// Flash データ連携用項目設定
//////////////////////////////////////////
// 件数保持項目
var FLASH_NAME_COUNT = "NAME_COUNT";			// 氏名件数
var FLASH_COMPANY_NAME_COUNT = "COMPANY_NAME_COUNT";	// 連名件数
var FLASH_TEL_COUNT = "TEL_COUNT";			// 電話番号件数
var FLASH_MAIL_URL_LIST_COUNT = "MAIL_URL_COUNT";		// メールアドレス件数

var FLASH_NAME_COUNT_MAX = 6;		// 氏名最大件数
var FLASH_TEL_COUNT_MAX = 3;		// 電話番号最大件数
var FLASH_MAIL_URL_LIST_COUNT_MAX = 3;		// メールアドレス最大件数

// 1件のみ項目
var FLASH_USER_TYPE = "USER_TYPE";			// 差出人種別
var FLASH_TEXT_BODY = "message";			// 本文
var FLASH_USER_COMMENT = "comment2";			// コメント
var FLASH_ADDRESS_FRONT_TEXT = "comment-1";			// 住所前追加文
var FLASH_ZIP = "zipcode";			// 郵便番号
var FLASH_ADDRESS1 = "address1";			// 住所１
var FLASH_ADDRESS2 = "address2";			// 住所２
var FLASH_ADDRESS3 = "address3";			// 住所３
var FLASH_COMPANY = "company";			// 会社名
var FLASH_ORGANIZATION1 = "organization1";		// 事業所・部署名・支店名1
var FLASH_ORGANIZATION2 = "organization2";		// 事業所・部署名・支店名2
var FLASH_ORGANIZATION3 = "organization3";		// 事業所・部署名・支店名3

// 複数登録可項目
var FLASH_SEI_EITHER = "lastname";		// 姓
var FLASH_MEI_EITHER = "firstname";		// 名
var FLASH_OLD_SEI_EITHER = "suffix";			// 旧姓/年齢
var FLASH_POSITION_EITHER = "prefix";			// 役職
//var FLASH_COMPANY_SEI_EITHER   = "COMPANY_SEI";		// 連名姓
//var FLASH_COMPANY_MEI_EITHER   = "COMPANY_MEI";		// 連名名
//var FLASH_TEL_EITHER           = "tel-value";		// TEL
var FLASH_TEL_EITHER = "tel";				// TEL
var FLASH_TEL_TITLE_EITHER = "tel-title";		// TELタイトル
//var FLASH_MAIL_URL_EITHER      = "mail-value";		// Mail
var FLASH_MAIL_URL_EITHER = "email";			// Mail
var FLASH_MAIL_URL_TITLE_EITHER = "email-title";			// Mailタイトル

// ご利用タイプ
var USER_TYPE_FLG_PERSONAL = "1";				// 個人
var USER_TYPE_FLG_CORPORATION = "2";				// 法人

// 現在のご利用タイプ
var current_user_type_flg = "1";

//////////////////////////////////////////
// Flash からデータを取得
//////////////////////////////////////////
function setFlashValueToItems() {
	SetToItem("body", FLASH_TEXT_BODY, "value");
	SetToItem("comment", FLASH_USER_COMMENT, "value");
	SetToItem("zipcode", FLASH_ZIP, "value");
	SetToItem("address1", FLASH_ADDRESS1, "value");
	SetToItem("address2", FLASH_ADDRESS2, "value");
	SetToItem("address3", FLASH_ADDRESS3, "value");
	SetToItem("company", FLASH_COMPANY, "value");
	SetToItem("organization1", FLASH_ORGANIZATION1, "value");
	SetToItem("organization2", FLASH_ORGANIZATION2, "value");
	SetToItem("organization3", FLASH_ORGANIZATION3, "value");
	// 	// 利用者タイプを設定し、項目の表示/非表示を制御
	// 	var u = SetToItem("usertype", FLASH_USER_TYPE, "value");
	// 	if (u == null)
	// 	{
	// 		u = USER_TYPE_FLG_PERSONAL;
	// 	}
	// 	PersonCorporationChenge(u);

	// 氏名を設定し、項目の表示/非表示を制御
	var visible_num = 1;
	var l;
	var f;
	var s;
	var p;
	for (var i = visible_num; i <= FLASH_NAME_COUNT_MAX; i++) {
		l = SetToItem("lastname" + i, FLASH_SEI_EITHER + i, "value");
		f = SetToItem("firstname" + i, FLASH_MEI_EITHER + i, "value");
		p = SetToItem("prefix" + i, FLASH_POSITION_EITHER + i, "value");
		s = SetToItem("suffix" + i, FLASH_OLD_SEI_EITHER + i, "value");
		switch (current_user_type_flg) {
			case USER_TYPE_FLG_PERSONAL:
				p = null;
				break;
			case USER_TYPE_FLG_CORPORATION:
				s = null;
				break;
		}
		if (l != null && l.length > 0
			|| f != null && f.length > 0
			|| p != null && p.length > 0
			|| s != null && s.length > 0) {
			visible_num = i;
		}
	}
	add_del_fullname(visible_num);

	// 電話を設定し、項目の表示/非表示を制御
	visible_num = 1;
	var t;
	var tt;
	for (var i = visible_num; i <= FLASH_TEL_COUNT_MAX; i++) {
		t = SetToItem("tel" + i, FLASH_TEL_EITHER + i, "value");
		tt = SetToItem("tel-title" + i, FLASH_TEL_TITLE_EITHER + i, "value");
		if (t != null && t.length > 0
			|| tt != null && tt.length > 0) {
			visible_num = i;
		}
	}
	add_del_tel(visible_num);

	// メールアドレスを設定し、項目の表示/非表示を制御
	visible_num = 1;
	var e;
	var et;
	for (var i = visible_num; i <= FLASH_MAIL_URL_LIST_COUNT_MAX; i++) {
		e = SetToItem("email" + i, FLASH_MAIL_URL_EITHER + i, "value");
		et = SetToItem("email-title" + i, FLASH_MAIL_URL_TITLE_EITHER + i, "value");
		if (e != null && e.length > 0
			|| et != null && et.length > 0) {
			visible_num = i;
		}
	}
	add_del_email(visible_num);
}

function SetToItem(column_name, flash_id, property) {
	// Flash から id を指定してデータを抽出
	var return_value = null;
	try {
		return_value = w2pBridge.getValue(flash_id);
	}
	catch (e) {
		addWarning("Flashプレビュー：" + flash_id + " からの値の取得に失敗しました。");
	}

	var i = 0;

	if (return_value != null && return_value.length > 0) {
		document.getElementsByName(column_name)[0].disabled = false;
	}

	if (property == "text") {
		document.getElementsByName(column_name)[0].text = return_value;
	}
	else if (property == "value") {
		document.getElementsByName(column_name)[0].value = return_value;
	}
	else if (property == "selected") {
		var selectAry = document.getElementsByName(column_name)[0];

		for (i = 0; i < selectAry.length; i++) {
			if (selectAry[i].value == return_value) {
				selectAry.selectedIndex = i;
				break;
			}
		}
	}
	else if (property == "checked") {
		var radioAry = document.getElementsByName(column_name);

		for (i = 0; i < radioAry.length; i++) {
			if (radioAry[i].value == return_value) {
				radioAry[i].checked = true;
			}
		}
	}

	return return_value;
}

//////////////////////////
// Flash へデータを反映 //
//////////////////////////
function ReflectedInThePreview() {
	resetInfo();
	SetItemsToFlashValue(onSaveFinishedAndReload);
}

function setTrimValue(column_name) {
	var val = document.getElementsByName(column_name)[0].value;
	document.getElementsByName(column_name)[0].value = trim(val);
}

//////////////////////////////////////////
// Flash へデータ登録
//////////////////////////////////////////

function SetItemsToFlashValue(callbackFunction) {

	var setPersonalBlank = true;
	var tmp = document.getElementsByName("usertype")[1];
	if ((document.getElementsByName("usertype")[1].value == "2") &&
		(document.getElementsByName("usertype")[1].checked)) {
		setPersonalBlank = false;
	}

	setTrimValue("zipcode");

	// 	SetToFlashValue("usertype", FLASH_USER_TYPE, "value");
	SetToFlashValue("body", FLASH_TEXT_BODY, "value");
	SetToFlashValue("comment", FLASH_USER_COMMENT, "value");
	SetToFlashValue("zipcode", FLASH_ZIP, "value");
	SetToFlashValue("address1", FLASH_ADDRESS1, "value");
	SetToFlashValue("address2", FLASH_ADDRESS2, "value");
	SetToFlashValue("address3", FLASH_ADDRESS3, "value");
	SetToFlashValue("company", FLASH_COMPANY, "value", setPersonalBlank);
	SetToFlashValue("organization1", FLASH_ORGANIZATION1, "value", setPersonalBlank);
	SetToFlashValue("organization2", FLASH_ORGANIZATION2, "value", setPersonalBlank);
	SetToFlashValue("organization3", FLASH_ORGANIZATION3, "value", setPersonalBlank);

	// 	for (var i = 1; i <= FLASH_NAME_COUNT_MAX; i++)
	// 	{
	// 		SetToFlashValue("lastname"+i, FLASH_SEI_EITHER+i, "value");
	// 		SetToFlashValue("firstname"+i, FLASH_MEI_EITHER+i, "value");
	// 		SetToFlashValue("suffix"+i, FLASH_OLD_SEI_EITHER+i, "value");
	// 		SetToFlashValue("prefix"+i, FLASH_POSITION_EITHER+i, "value");
	// 	}
	// 	for (var i = 1; i <= FLASH_TEL_COUNT_MAX; i++)
	// 	{
	// 		SetToFlashValue("tel"+i, FLASH_TEL_EITHER+i, "value");
	// 		SetToFlashValue("tel-title"+i, FLASH_TEL_TITLE_EITHER+i, "value");
	// 	}
	// 	for (var i = 1; i <= FLASH_MAIL_URL_LIST_COUNT_MAX; i++)
	// 	{
	// 		SetToFlashValue("email"+i, FLASH_MAIL_URL_EITHER+i, "value");
	// 		SetToFlashValue("email-title"+i, FLASH_MAIL_URL_TITLE_EITHER+i, "value");
	// 	}

	// 氏名を設定し、項目の表示/非表示を制御
	var visible_num = 1;
	var l;
	var f;
	var s;
	var p;
	for (var i = visible_num; i <= FLASH_NAME_COUNT_MAX; i++) {
		l = SetToFlashValue("lastname" + i, FLASH_SEI_EITHER + i, "value");
		f = SetToFlashValue("firstname" + i, FLASH_MEI_EITHER + i, "value");
		s = SetToFlashValue("suffix" + i, FLASH_OLD_SEI_EITHER + i, "value", (!setPersonalBlank));
		p = SetToFlashValue("prefix" + i, FLASH_POSITION_EITHER + i, "value", setPersonalBlank);
		switch (current_user_type_flg) {
			case USER_TYPE_FLG_PERSONAL:
				p = null;
				break;
			case USER_TYPE_FLG_CORPORATION:
				s = null;
				break;
		}
		if (l != null && l.length > 0
			|| f != null && f.length > 0
			|| s != null && s.length > 0
			|| p != null && p.length > 0) {
			visible_num = i;
		}
	}
	add_del_fullname(visible_num);

	// 電話を設定し、項目の表示/非表示を制御
	visible_num = 1;
	var t;
	var tt;
	for (var i = visible_num; i <= FLASH_TEL_COUNT_MAX; i++) {
		t = SetToFlashValue("tel" + i, FLASH_TEL_EITHER + i, "value");
		tt = SetToFlashValue("tel-title" + i, FLASH_TEL_TITLE_EITHER + i, "value");
		if (t != null && t.length > 0
			|| tt != null && tt.length > 0) {
			visible_num = i;
		}
	}
	add_del_tel(visible_num);

	// メールアドレスを設定し、項目の表示/非表示を制御
	visible_num = 1;
	var e;
	var et;
	for (var i = visible_num; i <= FLASH_MAIL_URL_LIST_COUNT_MAX; i++) {
		e = SetToFlashValue("email" + i, FLASH_MAIL_URL_EITHER + i, "value");
		et = SetToFlashValue("email-title" + i, FLASH_MAIL_URL_TITLE_EITHER + i, "value");
		if (e != null && e.length > 0
			|| et != null && et.length > 0) {
			visible_num = i;
		}
	}
	add_del_email(visible_num);

	if (!w2pBridge.save(callbackFunction)) {
		addWarning("Flashブリッジ：入力値の保存に失敗しました。");
	}
}

function SetToFlashValue(column_name, flash_id, property, isSetBlank) {
	// 入力フォーム から id を指定してデータを抽出して、Flashへ登録
	var return_value = "";
	var i = 0;

	if (typeof isSetBlank === 'undefined') {
		isSetBlank = false;
	}

	// 入力フォームが "無効" だった場合は抽出しない。
	if (document.getElementsByName(column_name)[0].disabled == false) {
		if (isSetBlank) {
			return_value = "";
		} else if (property == "text") {
			return_value = document.getElementsByName(column_name)[0].text;
		} else if (property == "value") {
			return_value = document.getElementsByName(column_name)[0].value;
		} else if (property == "selected") {
			return_value = document.getElementsByName(column_name)[0].options[document.getElementsByName(column_name)[0].selectedIndex].value;
		} else if (property == "checked") {
			var radioAry = document.getElementsByName(column_name);

			for (i = 0; i < radioAry.length; i++) {
				if (radioAry[i].checked) {
					return_value = radioAry[i].value;
				}
			}
		}
	}

	try {
		w2pBridge.setValue(flash_id, return_value);
		console.log(w2pBridge);
	}
	catch (e) {
		addWarning("Flashプレビュー：" + flash_id + " への値の設定に失敗しました。");
	}

	return return_value;
}

//////////////////////////////////////////
// 氏名追加
//////////////////////////////////////////
var name_max_count = 6;
var name_counter = 0;

function AddNameText(add_count) {
	name_counter = ChangeDispRecordCount(name_counter, name_max_count, add_count, "name_table");
	//	ChangeDispRecordCount(name_counter, name_max_count, add_count, "position_table");
	document.getElementById("hdn_name_count").value = name_counter;
}

//////////////////////////////////////////
// 電話番号追加
//////////////////////////////////////////
var tel_max_count = 2;
var tel_counter = 0;

function AddTelText(add_count) {
	tel_counter = ChangeDispRecordCount(tel_counter, tel_max_count, add_count, "tel_table");
	document.getElementById("hdn_tel_count").value = tel_counter;
}

//////////////////////////////////////////
// メールアドレス追加
//////////////////////////////////////////
var mail_url_max_count = 2;
var mail_url_counter = 0;

function AddMailUrlText(add_count) {
	mail_url_counter = ChangeDispRecordCount(mail_url_counter, mail_url_max_count, add_count, "mail_url_table");
	document.getElementById("hdn_mail_url_count").value = mail_url_counter;
}

//////////////////////////////////////////
// 表示件数切替
//////////////////////////////////////////
function ChangeDispRecordCount(now_count, max_count, add_count, table_id_name) {
	if (now_count == max_count) {
		return max_count;
	}

	if (add_count + now_count > max_count) {
		add_count = max_count - now_count;
	}

	for (var i = 1; i <= max_count; i++) {
		ChangeVisibleRow(table_id_name + i, false);
	}

	for (var i = 1; i <= now_count + add_count; i++) {
		ChangeVisibleRow(table_id_name + i, true);
	}

	return now_count + add_count;
}

//////////////////////////////////////////
// ご利用タイプ変更時イベント
//////////////////////////////////////////
function onClickUserType() {
	ChangeUserTypeDisplay();
}

function ChangeUserTypeDisplay() {
	var selected_value = "";
	var userTypeAry = document.getElementsByName("user_type");

	for (var i = 0; i < userTypeAry.length; i++) {
		if (userTypeAry[i].checked) {
			selected_value = userTypeAry[i].value;
		}
	}

	if (selected_value == USER_TYPE_FLG_PERSONAL) {
		ChangeVisibleRow("customer_name_list", true);
		ChangeVisibleRow("company_list", false);
		ChangeVisibleRow("section_list", false);
		ChangeVisibleRow("section_list2", false);
		//		ChangeVisibleRow("position_list", false);
		document.getElementsByName("company1")[0].value = "";
		document.getElementsByName("company2")[0].value = "";
		document.getElementsByName("company3")[0].value = "";
		for (var i = 1; i <= name_max_count; i++) {
			if (i == 1) {
				ChangeVisibleRow("position_table" + i, false);
				document.getElementsByName("position" + i)[0].value = "";
			}
			ChangeVisibleRow("old_sei_table" + i, true);
		}
		//		ChangeVisibleRow("company_name_list", false);
	} else {
		ChangeVisibleRow("customer_name_list", true);
		ChangeVisibleRow("company_list", true);
		ChangeVisibleRow("section_list", true);
		ChangeVisibleRow("section_list2", true);
		for (var i = 1; i <= name_max_count; i++) {
			ChangeVisibleRow("old_sei_table" + i, false);
			document.getElementsByName("old_sei" + i)[0].value = "";
			if (i == 1) {
				ChangeVisibleRow("position_table" + i, true);
			}
		}
		//		ChangeVisibleRow("position_list", true);
		//		ChangeVisibleRow("company_name_list", true);
	}
}

function ChangeVisibleRow(column_name, flg) {
	var visible_flg = "visible";
	var display_flg = "";
	var height_flg = "auto";

	if (!flg) {
		visible_flg = "hidden";
		display_flg = "none";
		height_flg = "0px";
	}

	document.getElementById(column_name).style.visibility = visible_flg;
	document.getElementById(column_name).style.display = display_flg;
	document.getElementById(column_name).style.height = height_flg;
}

//////////////////////////////////////////
// 次へ：プレビュー
//////////////////////////////////////////
function ShowPreview(wm, bcsid) {
	SaveClick();
	document.location.href =
		"./preview.html?wm=" + wm + "&bcsid=" + bcsid;
}

//////////////////////////////////////////
// 戻る：トップ
//////////////////////////////////////////
function backToTop(wm) {
	document.location.href = ".?wm=" + wm;
}

//////////////////////////////////////////
// 郵便番号検索
//////////////////////////////////////////
function SearchAddress(sid, aid, magic) {

	var zip_value = $("#zip").val();

	if (!zip_value || zip_value == "") {
		return;
	}

	var datastring = "sid=" + sid + "&aid=" + aid + "&m=" + magic + "&zip=" + zip_value;
	var urlstring = "/Web/1.0/zip/search.php";

	$.ajax({
		type: "GET",
		url: urlstring,
		data: datastring,
		dataType: "xml",
		success: function (xmldata) {
			SetAddressResult(xmldata);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			showWarning("住所の検索に失敗しました");
		}
	});
}

function SetAddressResult(xmldata) {
	var province = $(xmldata).find("Addresses").find("Address").find("Province").text();
	var city = $(xmldata).find("Addresses").find("Address").find("City").text();
	var street_1 = $(xmldata).find("Addresses").find("Address").find("Street_1").text();

	// 住所が取得できない場合は処理は行わない
	if (province == "") {
		return;
	}

	var address = province + city;

	$("#address1").val(address);
	$("#address2").val(street_1);
}

////////////////////////
// フォーム要素を取得 //
////////////////////////
function getFormParts() {
	var elm_list = new Array();

	// ドキュメント内の <form /> の要素を全て取得
	// ※ <select /> や <taxtarea /> 等をここで取得。
	for (var i = 0, i_limit = document.forms.length; i < i_limit; i++) {
		for (var j = 0, j_limit = document.forms[i].length; j < j_limit; j++) {
			elm_list.push(document.forms[i][j]);
		}
	}

	// ↑の配列参照では type="image" が取得できないため、
	// タグ名で <input /> を取得して、type="image" を取得する。
	var input_list = document.getElementsByTagName("input");
	if (input_list != null) {
		for (var i = 0, i_limit = input_list.length; i < i_limit; i++) {
			elm = input_list[i];
			switch (elm.type.toLowerCase()) {
				case 'image':
					elm_list.push(elm);
					break;
			}
		}
	}

	return elm_list;
}

///////////////////////////////////////
// "個人" or "法人" の切り替え処理。 //
///////////////////////////////////////
function PersonCorporationChenge(visible_setval) {
	// 自分を獲得
	var e = (window.event) ? window.event : arguments.callee.caller.arguments[0];
	var self = null;
	var usertype = USER_TYPE_FLG_PERSONAL;
	var is_update = false;
	var is_save2server = false;
	var elm_list = getFormParts();

	// 他の関数から、表示件数を指定して呼ばれた場合。
	if (visible_setval == USER_TYPE_FLG_PERSONAL || visible_setval == USER_TYPE_FLG_CORPORATION) {
		usertype = USER_TYPE_FLG_PERSONAL;
		is_update = true;
	}

	else if (typeof e == 'undefined' || e.type.toLowerCase() == "load") {
		// load時の呼び出し
		// HTMLドキュメントから "利用者タイプ" を取得する。
		elm_list = getFormParts();
		for (var i = 0; i < elm_list.length; i++) {
			if (elm_list[i].type.toLowerCase() == "radio"
				&& elm_list[i].name.toLowerCase() == "usertype"
				&& elm_list[i].checked == true) {
				self = elm_list[i];
				// 				usertype = self.value.toLowerCase();
				usertype = self.id.toLowerCase();
				is_update = true;
				break;
			}
		}
	}

	else {
		// 何かしらの event での呼び出し。
		self = e.target || e.srcElement;
		if (!self.type || !self.name) { return; }
		if (self.disabled == true) { return; }
		if (self.type.toLowerCase() == "radio" && self.name.toLowerCase() == "usertype") {
			// 			usertype = self.value.toLowerCase();
			usertype = self.id.toLowerCase();
			is_update = true;
			is_save2server = true; // サーバー側に選択した状態を保存する。
		}
	}

	if (is_update == true) {
		var person_elm_list = new Array();
		var corporation_elm_list = new Array();
		// var elm_list = document.getElementsByTagName("span");

		var tr_elm_list = document.getElementsByTagName("tr");
		for (var i = 0; i < tr_elm_list.length; i++) {
			if (tr_elm_list[i].className == null) { continue; }
			if (tr_elm_list[i].className.toLowerCase().indexOf("group_corporation") != -1) {
				corporation_elm_list.push(tr_elm_list[i]);
			}
			else if (tr_elm_list[i].className.toLowerCase().indexOf("group_person") != -1) {
				person_elm_list.push(tr_elm_list[i]);
			}
		}
		var td_elm_list = document.getElementsByTagName("td");
		for (var i = 0; i < td_elm_list.length; i++) {
			if (td_elm_list[i].className == null) { continue; }
			if (td_elm_list[i].className.toLowerCase().indexOf("group_corporation") != -1) {
				corporation_elm_list.push(td_elm_list[i]);
			}
			else if (td_elm_list[i].className.toLowerCase().indexOf("group_person") != -1) {
				person_elm_list.push(td_elm_list[i]);
			}
		}
		if (person_elm_list.length <= 0 && corporation_elm_list.length <= 0) {
			return;
		}
		var person_disable = true;
		var corporation_disable = true;
		var to_visible_elm_list = null;
		var to_hidden_elm_list = null;
		switch (usertype) {
			case USER_TYPE_FLG_PERSONAL:
				// "個人"ラジオボタンをチェックされた場合、
				// ID="個人"の入力フォームを"表示"&"有効"にして、
				// ID="法人"の入力フォームを"非表示"&"無効"にする。
				to_visible_elm_list = person_elm_list;
				to_hidden_elm_list = corporation_elm_list;
				person_disable = false;
				corporation_disable = true;
				break;

			case USER_TYPE_FLG_CORPORATION:
				// "法人"ラジオボタンをチェックされた場合、
				// ID="個人"の入力フォームを"非表示"&"無効"にして、
				// ID="法人"の入力フォームを"表示"&"有効"にする。
				to_visible_elm_list = corporation_elm_list;
				to_hidden_elm_list = person_elm_list;
				person_disable = true;
				corporation_disable = false;
				break;
		}
		if (to_visible_elm_list != null) {
			for (var i = 0; i < to_visible_elm_list.length; i++) {
				to_visible_elm_list[i].style.visibility = "visible";
				to_visible_elm_list[i].style.display = "";
			}
		}
		if (to_hidden_elm_list != null) {
			for (var i = 0; i < to_hidden_elm_list.length; i++) {
				to_hidden_elm_list[i].style.visibility = "hidden";
				to_hidden_elm_list[i].style.display = "none";
			}
		}
		for (var k = 0; k < elm_list.length; k++) {
			switch (elm_list[k].name.toLowerCase()) {
				case "company":
				case "organization1":
				case "organization2":
				case "organization3":
				case "prefix1":
				case "prefix2":
				case "prefix3":
				case "prefix4":
				case "prefix5":
				case "prefix6":
					elm_list[k].disabled = corporation_disable;
					break;
				case "suffix1":
				case "suffix2":
				case "suffix3":
				case "suffix4":
				case "suffix5":
				case "suffix6":
					elm_list[k].disabled = person_disable;
					break;
			}
		}
		current_user_type_flg = usertype;

		// 氏名を設定内容を確認し、項目の表示/非表示を制御
		var visible_num = 1;
		var l;
		var f;
		var s;
		var p;
		for (var i = visible_num; i <= FLASH_NAME_COUNT_MAX; i++) {
			l = document.getElementsByName("lastname" + i)[0].value;
			f = document.getElementsByName("firstname" + i)[0].value;
			p = document.getElementsByName("prefix" + i)[0].value;
			s = document.getElementsByName("suffix" + i)[0].value;
			switch (current_user_type_flg) {
				case USER_TYPE_FLG_PERSONAL:
					p = null;
					break;
				case USER_TYPE_FLG_CORPORATION:
					s = null;
					break;
			}
			if (l != null && l.length > 0
				|| f != null && f.length > 0
				|| p != null && p.length > 0
				|| s != null && s.length > 0) {
				visible_num = i;
			}
		}
		add_del_fullname(visible_num);
	}

	// サーバー側に選択した状態を保存する。
	if (is_save2server == true) {
		//save_usertype(usertype);
	}
}

// "利用者タイプ" をサーバへ保存する。
function save_usertype(usertype) {
	var result = usertype;

	var datastring = "usertype=" + usertype;

	var urlstring = document.URL;
	var path = "";
	var p = urlstring.indexOf("?");
	if (p >= 0) {
		path = urlstring.substring(p);
		urlstring = urlstring.substring(0, p);
	}
	p = urlstring.lastIndexOf("/");
	if (p >= 0) { urlstring = urlstring.substring(0, ++p); }
	urlstring += "usertype_store.php" + path;

	$.ajax(
		{
			type: "POST",
			url: urlstring,
			data: datastring,
			dataType: "xml",
			success: function (xmldata) {
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			}
		}
	);

	return result;
}

// "利用者タイプ" をサーバから取得する。
function load_usertype() {
	var usertype = USER_TYPE_FLG_PERSONAL;
	return usertype;
}

///////////////////////
// "氏名"の追加/削除 //
///////////////////////
function add_del_fullname(visible_setnum) {
	// 自分を獲得
	var e = (window.event) ? window.event : arguments.callee.caller.arguments[0];
	var self = null;
	var num = 1;
	var min_num = 1;
	var max_num = FLASH_NAME_COUNT_MAX;
	var is_update = false;
	var elm_list = getFormParts();
	var del_button_disable = true;
	var add_button_disable = true;

	// 他の関数から、表示件数を指定して呼ばれた場合。
	if (typeof visible_setnum != 'undefined'
		&& ((min_num <= visible_setnum && visible_setnum <= max_num)
			|| visible_setnum == 0)) {
		if (visible_setnum == 0) {
			// 現在表示している件数を取得。
			for (var k = 0; k < elm_list.length; k++) {
				if (elm_list[k].name.toLowerCase() == "visible_fullname_count"
					&& (min_num <= elm_list[k].value && elm_list[k].value <= max_num)) {
					num = Number(elm_list[k].value);
					break;
				}
			}
		}
		if (min_num <= visible_setnum && visible_setnum <= max_num) {
			num = visible_setnum;
			is_update = true;
		}
	}

	// load時の呼び出し。
	else if (typeof e == 'undefined' || e.type.toLowerCase() == "load") {
		// 現在表示している件数を取得。
		for (var k = 0; k < elm_list.length; k++) {
			if (elm_list[k].name.toLowerCase() == "visible_fullname_count"
				&& (min_num <= elm_list[k].value && elm_list[k].value <= max_num)) {
				num = Number(elm_list[k].value);
				break;
			}
		}
		is_update = true;
	}

	// 何かしらの event での呼び出し。
	else {
		if (e.type.toLowerCase() != "click") { return; }
		self = e.target || e.srcElement;
		if (!self.type || !self.name) { return; }
		if (self.disabled == true) { return; }
		if (self.type.toLowerCase() == "button") {
			// 現在表示している件数を取得して、
			// 押されたボタンの種類によって、
			// 件数を変更する。
			for (var k = 0; k < elm_list.length; k++) {
				if (elm_list[k].name.toLowerCase() == "visible_fullname_count"
					&& (min_num <= elm_list[k].value && elm_list[k].value <= max_num)) {
					num = Number(elm_list[k].value);
					break;
				}
			}
			switch (self.name.toLowerCase()) {
				case "del_fullname":
					if (num > min_num) { num--; }
					is_update = true;
					break;
				case "add_fullname":
					if (num < max_num) { num++; }
					is_update = true;
					break;
			}
		}
	}

	// 追加/削除の処理を実行
	if (is_update == true) {
		var fullname_elm_list = new Array();
		var tr_elm_list = document.getElementsByTagName("tr");
		for (var i = 0; i < tr_elm_list.length; i++) {
			if (tr_elm_list[i].className != null
				&& tr_elm_list[i].className.toLowerCase().indexOf("fullname") != -1) {
				fullname_elm_list.push(tr_elm_list[i]);
			}
		}

		for (var j = min_num; j <= max_num; j++) {
			for (var i = 0; i < fullname_elm_list.length; i++) {
				if (fullname_elm_list[i].className.toLowerCase().indexOf("fullname" + j) >= 0) {
					if (j <= num) {
						// 表示状態にする。
						fullname_elm_list[i].style.visibility = "visible";
						fullname_elm_list[i].style.display = "";
					}
					else {
						// 非表示状態にする。
						fullname_elm_list[i].style.visibility = "hidden";
						fullname_elm_list[i].style.display = "none";
					}
				}
			}
			for (var k = 0; k < elm_list.length; k++) {
				switch (elm_list[k].name.toLowerCase()) {
					case "lastname" + j:
					case "firstname" + j:
					case "prefix" + j:
					case "suffix" + j:
						if (j <= num) {
							// 有効にする。
							elm_list[k].disabled = false;
						}
						else {
							// 無効にする。
							elm_list[k].disabled = true;
						}
						break;
				}
			}
		}
		if (num <= min_num) {
			del_button_disable = true;
			add_button_disable = false;
		}
		else if (num >= max_num) {
			del_button_disable = false;
			add_button_disable = true;
		}
		else {
			del_button_disable = false;
			add_button_disable = false;
		}
		for (var k = 0; k < elm_list.length; k++) {
			switch (elm_list[k].name.toLowerCase()) {
				case "del_fullname":
					elm_list[k].disabled = del_button_disable;
					break;
				case "add_fullname":
					elm_list[k].disabled = add_button_disable;
					break;
				case "visible_fullname_count":
					elm_list[k].value = Number(num);
					break;
			}
		}
	}
}

///////////////////////
// "電話"の追加/削除 //
///////////////////////
function add_del_tel(visible_setnum) {
	// 自分を獲得
	var e = (window.event) ? window.event : arguments.callee.caller.arguments[0];
	var self = null;
	var num = 1;
	var min_num = 1;
	var max_num = FLASH_TEL_COUNT_MAX;
	var is_update = false;
	var elm_list = getFormParts();
	var del_button_disable = true;
	var add_button_disable = true;

	// 他の関数から、表示件数を指定して呼ばれた場合。
	if (typeof visible_setnum != 'undefined'
		&& ((min_num <= visible_setnum && visible_setnum <= max_num)
			|| visible_setnum == 0)) {
		if (visible_setnum == 0) {
			// 現在表示している件数を取得。
			for (var k = 0; k < elm_list.length; k++) {
				if (elm_list[k].name.toLowerCase() == "visible_tel_count"
					&& (min_num <= elm_list[k].value && elm_list[k].value <= max_num)) {
					num = Number(elm_list[k].value);
					break;
				}
			}
		}
		if (min_num <= visible_setnum && visible_setnum <= max_num) {
			num = visible_setnum;
			is_update = true;
		}
	}

	// load時の呼び出し。
	else if (typeof e == 'undefined' || e.type.toLowerCase() == "load") {
		// 現在表示している件数を取得。
		for (var k = 0; k < elm_list.length; k++) {
			if (elm_list[k].name.toLowerCase() == "visible_tel_count"
				&& (min_num <= elm_list[k].value && elm_list[k].value <= max_num)) {
				num = Number(elm_list[k].value);
				break;
			}
		}
		is_update = true;
	}

	// 何かしらの event での呼び出し。
	else {
		if (e.type.toLowerCase() != "click") { return; }
		self = e.target || e.srcElement;
		if (!self.type || !self.name) { return; }
		if (self.disabled == true) { return; }
		if (self.type.toLowerCase() == "button") {
			// 現在表示している件数を取得して、
			// 押されたボタンの種類によって、
			// 件数を変更する。
			for (var k = 0; k < elm_list.length; k++) {
				if (elm_list[k].name.toLowerCase() == "visible_tel_count"
					&& (min_num <= elm_list[k].value && elm_list[k].value <= max_num)) {
					num = Number(elm_list[k].value);
					break;
				}
			}
			switch (self.name.toLowerCase()) {
				case "del_tel":
					if (num > min_num) { num--; }
					is_update = true;
					break;
				case "add_tel":
					if (num < max_num) { num++; }
					is_update = true;
					break;
			}
		}
	}

	// 追加/削除の処理を実行
	if (is_update == true) {
		var tel_elm_list = new Array();
		var tr_elm_list = document.getElementsByTagName("tr");
		for (var i = 0; i < tr_elm_list.length; i++) {
			if (tr_elm_list[i].className != null
				&& tr_elm_list[i].className.toLowerCase().indexOf("tel") != -1) {
				tel_elm_list.push(tr_elm_list[i]);
			}
		}

		for (var j = min_num; j <= max_num; j++) {
			for (var i = 0; i < tel_elm_list.length; i++) {
				if (tel_elm_list[i].className.toLowerCase().indexOf("tel" + j) >= 0) {
					if (j <= num) {
						// 表示状態にする。
						tel_elm_list[i].style.visibility = "visible";
						tel_elm_list[i].style.display = "";
					}
					else {
						// 非表示状態にする。
						tel_elm_list[i].style.visibility = "hidden";
						tel_elm_list[i].style.display = "none";
					}
				}
			}
			for (var k = 0; k < elm_list.length; k++) {
				switch (elm_list[k].name.toLowerCase()) {
					case "tel-title" + j:
					case "tel" + j:
						if (j <= num) {
							// 有効にする。
							elm_list[k].disabled = false;
						}
						else {
							// 無効にする。
							elm_list[k].disabled = true;
						}
						break;
				}
			}
		}
		if (num <= min_num) {
			del_button_disable = true;
			add_button_disable = false;
		}
		else if (num >= max_num) {
			del_button_disable = false;
			add_button_disable = true;
		}
		else {
			del_button_disable = false;
			add_button_disable = false;
		}
		for (var k = 0; k < elm_list.length; k++) {
			switch (elm_list[k].name.toLowerCase()) {
				case "del_tel":
					elm_list[k].disabled = del_button_disable;
					break;
				case "add_tel":
					elm_list[k].disabled = add_button_disable;
					break;
				case "visible_tel_count":
					elm_list[k].value = Number(num);
					break;
			}
		}
	}
}

/////////////////////////////////
// "メールアドレス"の追加/削除 //
/////////////////////////////////
function add_del_email(visible_setnum) {
	// 自分を獲得
	var e = (window.event) ? window.event : arguments.callee.caller.arguments[0];
	var self = null;
	var num = 1;
	var min_num = 1;
	var max_num = FLASH_MAIL_URL_LIST_COUNT_MAX;
	var is_update = false;
	var elm_list = getFormParts();
	var del_button_disable = true;
	var add_button_disable = true;

	// 他の関数から、表示件数を指定して呼ばれた場合。
	if (typeof visible_setnum != 'undefined'
		&& ((min_num <= visible_setnum && visible_setnum <= max_num)
			|| visible_setnum == 0)) {
		if (visible_setnum == 0) {
			// 現在表示している件数を取得。
			for (var k = 0; k < elm_list.length; k++) {
				if (elm_list[k].name.toLowerCase() == "visible_email_count"
					&& (min_num <= elm_list[k].value && elm_list[k].value <= max_num)) {
					num = Number(elm_list[k].value);
					break;
				}
			}
		}
		if (min_num <= visible_setnum && visible_setnum <= max_num) {
			num = visible_setnum;
			is_update = true;
		}
	}

	// load時の呼び出し。
	else if (typeof e == 'undefined' || e.type.toLowerCase() == "load") {
		// 現在表示している件数を取得。
		for (var k = 0; k < elm_list.length; k++) {
			if (elm_list[k].name.toLowerCase() == "visible_email_count"
				&& (min_num <= elm_list[k].value && elm_list[k].value <= max_num)) {
				num = Number(elm_list[k].value);
				break;
			}
		}
		is_update = true;
	}

	// 何かしらの event での呼び出し。
	else {
		if (e.type.toLowerCase() != "click") { return; }
		self = e.target || e.srcElement;
		if (!self.type || !self.name) { return; }
		if (self.disabled == true) { return; }
		if (self.type.toLowerCase() == "button") {
			// 現在表示している件数を取得して、
			// 押されたボタンの種類によって、
			// 件数を変更する。
			for (var k = 0; k < elm_list.length; k++) {
				if (elm_list[k].name.toLowerCase() == "visible_email_count"
					&& (min_num <= elm_list[k].value && elm_list[k].value <= max_num)) {
					num = Number(elm_list[k].value);
					break;
				}
			}
			switch (self.name.toLowerCase()) {
				case "del_email":
					if (num > min_num) { num--; }
					is_update = true;
					break;
				case "add_email":
					if (num < max_num) { num++; }
					is_update = true;
					break;
			}
		}
	}

	// 追加/削除の処理を実行
	if (is_update == true) {
		var email_elm_list = new Array();
		var tr_elm_list = document.getElementsByTagName("tr");
		for (var i = 0; i < tr_elm_list.length; i++) {
			if (tr_elm_list[i].className != null
				&& tr_elm_list[i].className.toLowerCase().indexOf("email") != -1) {
				email_elm_list.push(tr_elm_list[i]);
			}
		}

		for (var j = min_num; j <= max_num; j++) {
			for (var i = 0; i < email_elm_list.length; i++) {
				if (email_elm_list[i].className.toLowerCase().indexOf("email" + j) >= 0) {
					if (j <= num) {
						// 表示状態にする。
						email_elm_list[i].style.visibility = "visible";
						email_elm_list[i].style.display = "";
					}
					else {
						// 非表示状態にする。
						email_elm_list[i].style.visibility = "hidden";
						email_elm_list[i].style.display = "none";
					}
				}
			}
			for (var k = 0; k < elm_list.length; k++) {
				switch (elm_list[k].name.toLowerCase()) {
					case "email-title" + j:
					case "email" + j:
						if (j <= num) {
							// 有効にする。
							elm_list[k].disabled = false;
						}
						else {
							// 無効にする。
							elm_list[k].disabled = true;
						}
						break;
				}
			}
		}
		if (num <= min_num) {
			del_button_disable = true;
			add_button_disable = false;
		}
		else if (num >= max_num) {
			del_button_disable = false;
			add_button_disable = true;
		}
		else {
			del_button_disable = false;
			add_button_disable = false;
		}
		for (var k = 0; k < elm_list.length; k++) {
			switch (elm_list[k].name.toLowerCase()) {
				case "del_email":
					elm_list[k].disabled = del_button_disable;
					break;
				case "add_email":
					elm_list[k].disabled = add_button_disable;
					break;
				case "visible_email_count":
					elm_list[k].value = Number(num);
					break;
			}
		}
	}
}

function manualSubmit(form) {
	// 自分(ボタン)を獲得
	var e = (window.event) ? window.event : arguments.callee.caller.arguments[0];
	var self = e.target || e.srcElement;
	if (self.disabled == true) { return false; }

	resetInfo();

	// 省略された場合は
	// 自分自身の親のHTMLタグをさかのぼって、
	// <form /> を探す。
	if (form == null) {
		form = self;
		do {
			form = form.parentNode;
		}
		while (form != null && form.tagName.toLowerCase() != 'form')
	}
	if (form != null) {
		// <form name="getprintdata" /> に入力された内容を、
		// 押されたボタンが属している form にコピーする。
		for (var i = 0; i < form.length; i++) {
			for (var j = 0; j < document.getprintdata.length; j++) {
				if (form[i].name == document.getprintdata[j].name) {
					switch (document.getprintdata[j].type.toLowerCase()) {
						case 'radio':
						case 'checkbox':
							if (document.getprintdata[j].checked) {
								form[i].value = document.getprintdata[j].value;
							}
							break;
						case 'select':
							if (document.getprintdata[j].selected) {
								form[i].value = document.getprintdata[j].value;
							}
							break;
						default:
							form[i].value = document.getprintdata[j].value;
							break;
					}
				}
			}
		}

		// サーバに自分自身(ボタン)の名前と値を送信(POST)するために、
		// 同じ名前の「hidden要素」を作成し、値を設定する。
		var element = document.createElement('input');
		element.type = "hidden";
		element.name = self.name;
		element.value = '1';
		form.appendChild(element);

		//
		// 入力フォーム内容を、プレビュー反映する。
		//
		currentForm = form;
		SetItemsToFlashValue(onSaveFinishedAndNext);

	}
	return false; // <- HTMLによるサブミットはさせない。
}

////////////////////////////////////////////////////////
// 入力フォーム内容の保存結果によってform送信を無効化 //
////////////////////////////////////////////////////////
var currentForm = null;

function onSaveFinishedAndNext(resultId, detail) {
	if (resultId == "I001") {
		currentForm.submit();
	} else {
		var mesg = "入力内容に誤りがあるため次へ進めません。正しく入力してください。<br />";
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
		addWarning(mesg);
		w2pPreview.reload();
	}
}

////////////////////////////////////////
// エンターキーによるform送信を無効化 //
////////////////////////////////////////
function submitStop(e) {
	if (!e) var e = window.event;
	if (e.keyCode == 13) {
		return false;
	}
}

////////////////////////////////////////////////////////
// 文字列の前後の半角全角スペース、タブ、をトリミング //
////////////////////////////////////////////////////////
function trim(s) {
	if (s == null || typeof s == 'undefined') { return; }
	return s.replace(/^[\s　]+|[\s　]+$/g, '');
}

//////////////////////////
// 初回読み込み時の処理 //
//////////////////////////
window.onload = function () {
	// エンターキーによるform送信を無効化
	var elm_list = getFormParts();
	for (var i = 0, i_limit = elm_list.length; i < i_limit; i++) {
		var elm = elm_list[i];
		switch (elm.type.toLowerCase()) {
			case 'text':
			case 'password':
			case 'file':
			case 'radio':
			case 'checkbox':
			case 'image':
				elm.onkeypress = function (event) {
					return submitStop(event);
				};
		}
	}

	// ページ内の入力フォームの初期設定
	PersonCorporationChenge();
	add_del_fullname();
	add_del_tel();
	add_del_email();
}
