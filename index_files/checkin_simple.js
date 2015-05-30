function checkin() {
	var b = $.getUID();
	var a = $.getUrlParam("id");
	this.init = function() {
		c();
		$(".to-index").attr("href", "/checkin/index?id=" + a);
		$(".to-rechange").attr("href", "/checkin/rechange?id=" + a);
		$(".page-to-game").attr("href", "/checkin/game?id=" + a)
	};

	function c() {
		$.ajax({
			url: checkinUrl.home,
			data: {
				uid: b,
				checkin_id: a
			},
			type: "post",
			dataType: "json"
		}).done(function(f) {
			console.log(f);
			if (f.ret == 0) {
				var g = f.data;
				if (g.is_over == "1") {
					$(".today-score").hide();
					$(".rs-title-txt").html("本次签到已结束")
				} else {
					if (g.last_score >= "0") {
						$(".rs-title-txt").html("今天已签到，明天签到可获" + g.tomorrow_score + "积分")
					} else {
						$(".rs-title-txt").html("今天已签到")
					}
				}
				$(".rs-last-score").html(g.last_score);
				if (g.today_score == "-1") {
					$(".my-tips").addClass(".tip-error");
					$(".rs-title-txt").html("今日未签到");
					$(".today-score").hide()
				} else {
					$(".rs-today-score").html(g.today_score)
				}
				$(".rs-total-num").html(g.total_num);
				if (g.advert && $.isArray(g.advert) && g.advert.length > 0) {
					var j = "";
					for (var h in g.advert) {
						j += '<li style="background-image: url(' + g.advert[h].ad_pic + ')">';
						j += "<a ";
						if (g.advert[h].ad_url) {
							j += 'href="' + g.advert[h].ad_url + '"'
						}
						j += ">";
						j += '<div class="ad-title">' + g.advert[h].ad_title + "</div>";
						j += "</a>";
						j += "</li>"
					}
					$(".my-ads").html(j)
				}
				$(".my-day-title").html(g.calendar_th);
				if (g.calendar_td && $.isArray(g.calendar_td) && g.calendar_td.length > 0) {
					var l = "";
					var e = 0;
					for (var h in g.calendar_td) {
						if (g.calendar_td[h].today == 1) {
							e = h
						}
					}
					for (var h in g.calendar_td) {
						var k = g.calendar_td[h];
						l += '<li class="';
						if (k.select == 1) {
							if (k.today == 1) {
								l += "my-today"
							} else {
								l += "my-check"
							}
						} else {
							if (h < parseInt(e)) {
								l += "my-no-check"
							}
						}
						l += '">' + k.value + "</li>"
					}
					$(".my-days").html(l)
				}
				if (g.yx_status == 0) {
					$(".lottery-fix").hide()
				} else {
					$(".page-chance").html(g.lottery_num)
				}
				$.RMLOAD()
			} else {
				$.yalert({
					content: f.msg,
					submit: function() {
						$("body").hide()
					}
				})
			}
		}).fail(function() {}).always(function() {
			d()
		})
	}
	function d() {
		var e = $(".my-days").width();
		$(".my-days").find("li").width(e / 7 - 1).height(e / 7 - 1).css({
			"line-height": e / 7 - 1 + "px"
		});
		$(".my-days").find(".my-check").css({
			"line-height": "20px"
		});
		$(".my-days").find(".my-today").css({
			"line-height": "20px"
		});
		$(".my-ads").find("li").height(e / 2)
	}
}
$(document).ready(function() {
	$.checkUID();
	var a = new checkin();
	a.init()
});