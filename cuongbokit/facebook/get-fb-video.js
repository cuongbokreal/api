var open_new_tab = 1;
var get_owner_url = 1;
var get_thumbnail = 1;
var get_og_url = 1;

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
				var in4_video = ``;
				if(get_owner_url === 1 || get_og_url ===1 || get_thumbnail ===1){in4_video = '%cThông tin video: \n%c'}
				if(open_new_tab === 1){window.open(c)}
				if(get_owner_url === 1){in4_video += `- Tác giả: https://facebook.com/${a.data.video.owner.id} \n`}
				if(get_og_url === 1){in4_video += `- Link video: ${a.data.video.url} \n`}
				if(get_thumbnail === 1){in4_video += `- Thumbnail: ${a.data.video.preferred_thumbnail.image.uri} \n`}
			console.clear(), console.log("\u2705 Đã lấy thành công link download."), console.log("======================="), console.log("%cNhấp vào link này để tải xuống: " + c, "color: green"), console.log("Nếu trình duyệt của bạn không tự động tải xuống, vui lòng nhấn Ctrl + S trên bàn phím sau khi nhấp vào liên kết ở trên."), console.log(in4_video, "color:#ff8484;font-family:system-ui;font-size:0.75rem;-webkit-text-stroke: 0.5px black;font-weight:bold", "color:#ff9494"), console.log("======================="), console.log("\u{1F37A} Được tạo bởi https://fb.me/monokaijssss \n Chỉnh sửa, thêm chức năng bởi %cCuongbokIT%c: https://cuongbokit.blogspot.com \n -Link file gốc: https://gist.github.com/monokaijs/270e29620c46cabec1caca8c3746729d \n -Link file chỉnh sửa của CuongbokIT: https://github.com/cuongbokreal/api/blob/main/cuongbokit/facebook/get-fb-video.js \n -Link RAW: https://cuongbokreal.github.io/api/cuongbokit/facebook/get-fb-video.js", "color:red;font-family:system-ui;-webkit-text-stroke: 0.25px black;font-weight:bold", "border:none")
		} catch (d) {
			console.log("\u26A0\uFE0FKhông thể trích xuất dữ liệu. Có thể script này không còn hiệu quả nữa.")
		}
	}).catch(a => {
		console.error("\u26A0\uFE0FKhông lấy được dữ liệu")
	})
})()
