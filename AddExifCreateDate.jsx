/**
 * 写真に日時を追加するスクリプト
 * YYYY.MM.DD hh:mm:ss
 * 
 * S.NISHIMORI
 */
(function() {
	var doc = app.activeDocument;
	var date = getDate(doc);
	if(date) {
		var dateStr = formatDate(date);
		// log("date = " + dateStr);
		var docW = doc.width.value;
		var docH = doc.height.value;

		// L版で印刷するときに印刷される範囲を求めます（縁なしcrop想定）
		var lSize = getLBanSize(docW, docH);
		// log("L版 size = " + lSize[0] + " x " + lSize[1]);
		
		var zoom = getZoomValue(lSize[0], lSize[1]);

		// 適切なフォントサイズを求めます
		var fontSize = 60 * zoom;
		// log("フォントサイズ = " + fontSize);

		var dx = 120 * zoom;
		var dy = 100 * zoom;
		// L版で印刷するときに日時を表示する適切な場所を求めます
		var x = docW / 2 + lSize[0] / 2 - dx;
		var y = docH / 2 + lSize[1] / 2 - dy;
		// log("x = " + x + ", y = " + y);

		addText(doc, dateStr, fontSize, x, y);
	}else {
		log("No exif data.");
	}
}());

function log(msg) {
	alert(msg);
}

/**
 * Exifから生成日時を取得します
 */
function getDate(doc) {
	var date;
	var exif = doc.info.exif;
	if(exif) {
		for(i = 0; i < exif.length; i++) {
			var value = exif[i];
			// 生成日時
			if(value[2] == 36867) {
				date = value[1];
				break;
			}
		}
	}
	return date;
}

/**
 * YYYY:MM:DD hh:mm:ssのフォーマットをYYYY/MM/DD hh:mm:ssに変換します
 */
function formatDate(date) {
	return date.substr (0, 4)
			 + '/' + date.substr(5, 2)
			 + '/' + date.substr(8, 2)
			 + ' ' + date.substr(11, 2)
			 + ':' + date.substr(14, 2)
			 + ':' + date.substr(17, 2);
}

/**
 * テキストを右寄せで追加します
 */
function addText(doc, str, fontSize, x, y) {
	preferences.rulerUnits = Units.PIXELS;
	var layers = doc.artLayers;
	var textLayer = layers.add();
	textLayer.kind = LayerKind.TEXT;

	// 解像度
	fontSize *= 72 / activeDocument.resolution;

	textLayer.textItem.size = fontSize;
	textLayer.textItem.font = "HiraKakuStd-W8";
	textLayer.textItem.justification = Justification.RIGHT; //右寄せ
	textLayer.textItem.color.rgb.red = 255;
	textLayer.textItem.color.rgb.green = 255;
	textLayer.textItem.color.rgb.blue = 255;
	textLayer.textItem.contents = str;

	// var w = doc.width.value;
	// var h = doc.height.value;
	textLayer.textItem.position = [x, y]; //[w - 180, h - 150];
}

/**
 * ドキュメントをL版で印刷するときの想定される縦横サイズを取得します
 */
function getLBanSize(w, h) {
	var landscape = false;
	if(w > h) {
		landscape = true;
		var temp = w;
		w = h;
		h = temp;
	}
	var aspect = h / w;
	var L_ASPECT = 1.42697; // L版のアスペクト比（89:127）
	if(aspect > L_ASPECT) {
		// L版に対して縦長
		h = w * L_ASPECT;
	}else {
		// L版に対して横長
		w = h / L_ASPECT;
	}

	if(landscape) {
		var temp = w;
		w = h;
		h = temp;
	}
	return [w, h];
}

/**
 * ベースサイズに対しての拡大率を取得します
 */
function getZoomValue(w, h) {
	var max = Math.max(w, h);
	var zoom = max / 3653; // 3653pxに対して、60pt程度をベースに計算
	return zoom;
}