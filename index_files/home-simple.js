(function(a, b) {
	var c = "/data/checkin/";
	checkinUrl = {
		home: c,
		exchange: c + "exchange_info",
		exchange_record_list: c + "exchange_record_list",
		exchange_list: c + "exchange_list",
		exchange_prize: c + "exchange",
		game: c + "game",
		get_prize: c + "get_prize",
		giveup: c + "forgo_prize",
		claim_prize: c + "claim_prize"
	}
})(window, jQuery);

function onBridgeReady() {
	WeixinJSBridge.call("hideOptionMenu")
}
if (typeof WeixinJSBridge == "undefined") {
	if (document.addEventListener) {
		document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false)
	} else {
		if (document.attachEvent) {
			document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
			document.attachEvent("onWeixinJSBridgeReady", onBridgeReady)
		}
	}
} else {
	document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false)
};