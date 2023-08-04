// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDaZdi-_M9yN9d_kFBv1FBTs03ifASOzfA",
	authDomain: "trumgiamgia.firebaseapp.com",
	databaseURL: "https://trumgiamgia-default-rtdb.firebaseio.com",
	projectId: "trumgiamgia",
	storageBucket: "trumgiamgia.appspot.com",
	messagingSenderId: "847348910930",
	appId: "1:847348910930:web:2b313fb8051d8d95dfc88b",
	measurementId: "G-J3E3VC8HGG"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName, i;
	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
};
var vc_id = getUrlParameter('id');
var vc_year = vc_id.slice(0, 2);
vc_id = vc_id.slice(2);
var vc_month = vc_id.slice(0, 2);
vc_id = vc_id.slice(2);
var vc_path = `voucher-details/${vc_year}/${vc_month}/${vc_id}`;
console.log(vc_path)

var inner_title = document.getElementById('vc_title');
var inner_brand = document.getElementById('vc_brand');
var inner_brand_image = document.getElementById('vc_brand_image');
var inner_des = document.getElementById('vc_des');
var inner_code = document.getElementById('vc_code');
var vc_copy = document.querySelector('#vc_copy');

var vc = firebase.database().ref(vc_path);
vc.on('value', (snapshot) => {
	let data = snapshot.val();
	console.log(data);
	inner_title.innerHTML = data.title;
	document.title = `${data.title} - ${data.brand} | Voucher độc quyền tại Trùm Giảm Giá`;
	inner_brand.innerHTML = data.brand;
	inner_brand_image.style.backgroundImage = `url(${data.image})`;
	inner_des.innerHTML = data.des;
	inner_code.value = data.code;

	//setting button 
	var aff_link = createAffLink(data.href)
	vc_copy.setAttribute('onclick', `copyCouponCode(event, '${data.code}', '${aff_link}', true)`);
	if (('code' in data || data.code == '') == false) {
		vc_copy.innerText = 'Đến banner'
	} else {
		vc_copy.innerText = 'Sao chép mã'
	}

	//setting start end trong DES
	var inner_start = '';
	var inner_end = '';
	if (data.start.toString().length >= 10) { //có start mới sửa, không thì ''
		inner_start = `<div> <b class="des_head">Ngày bắt đầu</b>: ${TsToDate(parseInt(data.start))} </div>`;
	}
	if (data.end.toString().length >= 10) { //có end mới sửa, không thì ''
		inner_end = `<div> <b class="des_head">Ngày kết thúc</b>: ${TsToDate(parseInt(data.end))}  </div>`;
	}
	inner_des.innerHTML = inner_start + inner_end + '<div><h4 class="des_head">Mô tả chi tiết: </h4>' + inner_des.innerHTML + '</div>';

	//Check het han
	if ((Date.now()) > data.end) {
		console.log('het han');
		document.querySelector('#vc_exp_color').setAttribute('style', 'background: linear-gradient(90deg, transparent 0px, transparent 0.1875rem, rgb(238, 77, 45) 0px);')
	} else {
		console.log('con han');
	}

})


/*=== FUNCTION ===*/

function createAffLink(url) {
	if ((url.includes("https://shopee.vn") || url.includes("https://lazada.vn") || url.includes("highlandscoffee.com.vn") || url.includes("https://tiki.vn")) == true) {
		return `https://go.isclix.com/deep_link/5353514789844343379?url=${encodeURIComponent(url)}`
	}
}

function createTs() {
	var currentDate = new Date();
	var timestamp = currentDate.getTime();
	return timestamp;
}

function TsToDate(timestamp) {
	if (timestamp.toString().length >= 10) {
		const dateObject = new Date(timestamp);
		// Lấy thông tin ngày, tháng, năm, giờ và phút từ đối tượng Date
		const day = dateObject.getDate().toString().padStart(2, "0");
		const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
		const year = dateObject.getFullYear().toString();
		const hours = dateObject.getHours().toString().padStart(2, "0");
		const minutes = dateObject.getMinutes().toString().padStart(2, "0");
		// Ghép thành chuỗi "dd/mm/yyyy hh:mm"
		const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
		return formattedDateTime;
	} else {
		return ''
	}
}

var copyCouponCode = (event, couponCode, link, shouldCopy = false) => {
	event.preventDefault();
	event.stopPropagation();
	if (!shouldCopy) {
		window.open(link);
	} else {
		const input = document.createElement('input');
		input.setAttribute('value', couponCode);
		document.body.appendChild(input);
		input.select();
		document.execCommand('copy');
		document.body.removeChild(input);
		//statusCopy = true;
		window.open(link);

		//event.target.childNodes[0].textContent = couponCode;
		event.target.textContent = couponCode;

		//thbao
		toast({
			title: 'Thành công',
			message: `Đã sao chép mã: <b><a rel="nofollow" target="_blank" href="${link}">${couponCode}</a></b>`,
			type: "success",
			duration: 3000
		})
	}
	setTimeout(() => {
		window.location.href = '/'
	}, 7000)
}

function copy_code() {
	var copyText = document.getElementById("vc_code");
	document.getElementById('vc_copy').innerText = 'Đã copy mã!';
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(copyText.value);
	console.log("Copied the text: " + copyText.value);
	window.location.href = affLink;
	//window.location.href = '/?utm_source=voucher-details-copied';    

}

function showSuccessToast(title, message) {
	toast({
		title: title,
		message: message,
		type: "success",
		duration: 5000
	});
}

function showErrorToast(title, message) {
	toast({
		title: title,
		message: message,
		type: "error",
		duration: 5000
	});
}
// Toast function
function toast({
	title = "",
	message = "",
	type = "info",
	duration = 3000
}) {
	const main = document.getElementById("toast");
	if (main) {
		const toast = document.createElement("div");
		// Auto remove toast
		const autoRemoveId = setTimeout(function() {
			main.removeChild(toast);
		}, duration + 1000);
		// Remove toast when clicked
		toast.onclick = function(e) {
			if (e.target.closest(".toast__close")) {
				main.removeChild(toast);
				clearTimeout(autoRemoveId);
			}
		};
		const icons = {
			success: "fas fa-check-circle",
			info: "fas fa-info-circle",
			warning: "fas fa-exclamation-circle",
			error: "fas fa-exclamation-circle"
		};
		const icon = icons[type];
		const delay = (duration / 1000).toFixed(2);
		toast.classList.add("toast", `toast--${type}`);
		toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
		toast.innerHTML = `
			                    <div class='toast__icon'>
			                        <i class='${icon}'></i>
			                    </div>
			                    <div class='toast__body'>
			                        <h3 class='toast__title'>${title}</h3>
			                        <p class='toast__msg'>${message}</p>
			                    </div>
			                    <div class='toast__close'>
			                        <i class='fas fa-times'></i>
			                    </div>
			                `;
		main.appendChild(toast);
	}
}
