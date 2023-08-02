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

var listImgSrc = ['https://cf.shopee.vn/file/e6a3b7beffa95ca492926978d5235f79', 'https://cdn.chanhtuoi.com/uploads/2020/06/logo-lazada-2.png', 'https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png'];
var createDetails = document.querySelector("#createDetails");
var shortenLink = document.querySelector("#shortenLink");

function getVoucherDetailsLink() {
	var updateTime = new Date();
	var thisYear = updateTime.getFullYear();
	var thisMonth = updateTime.getMonth() + 1;
	var pathYear = thisYear.toString().slice(-2);
	var pathMonth = addLeadingZero(thisMonth)
	var path = `voucher-details/${pathYear}/${pathMonth}/`
	console.log(path);
	var thisRandomString = randomString(20);

	var title = document.getElementById('title').value;
	var code = document.getElementById('code').value;
	var des = document.getElementById('des').value;
	var brand = document.getElementById('href').value;
	var start = document.getElementById('start').value;
	var end = document.getElementById('end').value;
	brand = brand.replaceAll("https://", "");
	title = title.replaceAll(code, "");
	des = des.replaceAll(code, "");
	document.getElementById('title').value = title;
	document.getElementById('des').value = des;
	title = title.replaceAll("%", "%25");
	des = des.replaceAll("%", "%25");
	title = title.replaceAll("&", "%26");
	des = des.replaceAll("&", "%26");
	des = des.replaceAll("\n", "<br/>");

	var imgUrl = document.getElementById('imgUrl').value;
	var link = document.getElementById('link').value;
	console.log(start)
	console.log(end)
	if (document.getElementById('start').value.length < 5) {
		start = ''
	} else {
		start = dateToTs(start)
	}
	if (document.getElementById('end').value.length < 5) {
		end = ''
	} else {
		end = dateToTs(end)
	}
	console.log(start)
	console.log(end)
	//Up database
	firebase.database().ref(path + thisRandomString).set({
		brand: brand,
		code: code,
		des: des,
		end: end,
		href: link,
		image: imgUrl,
		start: start,
		title: title
	});
	var kqLink = `https://www.trumgiamgia.net/p/voucher-details.html?id=${pathYear}${pathMonth}${thisRandomString}`
	document.querySelector('#inputVoucherDetailsLink').value = kqLink;
	document.querySelector('#inputIdVoucher').value = thisRandomString;
	fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(kqLink)}`)
		.then(cc => cc.text())
		.then(data => {
			shortenLink.value = data;
			shortenLink.click();
		})

	createDetails.setAttribute('onclick', '');
	setTimeout(() => {
		createDetails.setAttribute('onclick', 'getVoucherDetailsLink()')
	}, 2000)

}

function change() {
	var option = document.getElementById('href');
	if (option.value === 'SHOPEE') {
		link.value = "https://shopee.vn";
		imgUrl.value = listImgSrc[0];
	} else if (option.value === 'LAZADA') {
		link.value = "https://lazada.vn";
		imgUrl.value = listImgSrc[1];
	} else if (option.value === 'TIKI') {
		link.value = "https://tiki.vn";
		imgUrl.value = listImgSrc[2];
	}
}

function addLeadingZero(number) {
	return number.toString().padStart(2, '0');
}

function randomString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	return result;
}

function dateToTs(date) {
	return new Date(date).getTime();
}
/*Extension*/
function copyValue(c) {
	if (c.value.length >= 1) {
		c.focus();
		c.select();
		document.execCommand("Copy");
		console.log(`Copied: ${c.value}`);
		toast({
			title: 'Thành công',
			message: `Đã copy <b>${c.value}</b>`,
			type: "success",
			duration: 3000
		});
	} else {
		console.log('Không có dữ liệu để copy!' + c);
		toast({
			title: 'Lỗi',
			message: `Không có dữ liệu để copy!`,
			type: "error",
			duration: 3000
		});
	}
}
