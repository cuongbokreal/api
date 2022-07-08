var open_new_tab = 1;

(() => {
	let a = window.location.href.match(/\/(?:videos|reel|watch)(?:\/?)(?:\?v=)?(\d+)/);
	if (a.length < 2) {
		console.log("Vui lòng mở video trước khi chạy tập lệnh này.");
		return
	}
	let c = function(d, e) {
			let f = [],
				a;
			for (a in d)
				if (d.hasOwnProperty(a)) {
					let g = e ? e + "[" + a + "]" : a,
						b = d[a];
					f.push(null !== b && "object" == typeof b ? c(b, g) : encodeURIComponent(g) + "=" + encodeURIComponent(b))
				} return f.join("&")
		},
		b = function(a, b) {
			return fetch("https://www.facebook.com/api/graphql/", {
				method: "POST",
				headers: {
					"content-type": "application/x-www-form-urlencoded"
				},
				body: c({
					doc_id: a,
					variables: JSON.stringify(b),
					fb_dtsg: require("DTSGInitialData").token,
					server_timestamps: !0
				})
			})
		};
	console.log("Đang lấy dữ liệu..."), b("5279476072161634", {
		UFI2CommentsProvider_commentsKey: "CometTahoeSidePaneQuery",
		caller: "CHANNEL_VIEW_FROM_PAGE_TIMELINE",
		displayCommentsContextEnableComment: null,
		displayCommentsContextIsAdPreview: null,
		displayCommentsContextIsAggregatedShare: null,
		displayCommentsContextIsStorySet: null,
		displayCommentsFeedbackContext: null,
		feedbackSource: 41,
		feedLocation: "TAHOE",
		focusCommentID: null,
		privacySelectorRenderLocation: "COMET_STREAM",
		renderLocation: "video_channel",
		scale: 1,
		streamChainingSection: !1,
		useDefaultActor: !1,
		videoChainingContext: null,
		videoID: a[1]
	}).then(a => a.text()).then(b => {
		try {
			let a = JSON.parse(b.split("\n")[0]),
				c = a.data.video.playable_url_quality_hd || a.data.video.playable_url;
				if(open_new_tab == 1){window.open(c)}
			console.clear(), console.log("\u2705 Đã lấy thành công link download."), console.log("======================="), console.log("%cNhấp vào link này để tải xuống: " + c, "color: green"), console.log("Nếu trình duyệt của bạn không tự động tải xuống, vui lòng nhấn Ctrl + S trên bàn phím sau khi nhấp vào liên kết ở trên."), console.log("======================="), console.log("\u{1F37A} Được tạo bởi https://fb.me/monokaijssss || Share bởi CuongbokIT: https://cuongbokit.blogspot.com ")
		} catch (d) {
			console.log("\u26A0\uFE0FKhông thể trích xuất dữ liệu. Có thể script này không còn hiệu quả nữa.")
		}
	}).catch(a => {
		console.error("\u26A0\uFE0FKhông lấy được dữ liệu")
	})
})()
