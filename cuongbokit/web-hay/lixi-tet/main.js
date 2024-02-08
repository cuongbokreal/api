  //https://img.vietqr.io/image/MB-999999-qr_only.jpg

  /*========================*/
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

  var love_img = document.querySelector("#love_img");
  var quest = document.querySelector("#quest");
  var yes = document.querySelector("#yes");
  var no = document.querySelector("#no");
  var thbao = document.querySelector("#thbao");

  var sizePlus = 25; //(px)
  var sizeDown = 5; //px

  var click = 0;

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  var stk = (typeof getUrlParameter('stk') != 'undefined') ? getUrlParameter('stk') : '968683878';
  var bank = (typeof getUrlParameter('bank') != 'undefined') ? getUrlParameter('bank') : 'MB';

  var to = (typeof getUrlParameter('xung') != 'undefined') ? getUrlParameter('xung') : 'tớ';
  var cau = (typeof getUrlParameter('ho') != 'undefined') ? getUrlParameter('ho') : 'cậu';

  quest.innerHTML = `Tết này ${cau} lì xì ${to} nhé!`;



  function clickYes() {
  	document.querySelector("#postBody > div > div > center > div.choose").innerHTML = `
  <button id="yes" onclick="clickYes()" class="btn-option">Yes</button>`;
  	thbao.innerHTML = `Bấm Yes rồi nên không nhấn được nút No nữa đâu nhé:))`;
  	Swal.fire({
  		title: `${upperFistCase(to)} biết ${cau} sẽ chọn Yes mà`,
  		html: `Nhận lì xì cũng ngại lắm nhưng mà STK ${to} <b>${stk}</b> <b>${bank}</b> nhaaa 😘 <img class="img_ck" src="https://img.vietqr.io/image/${bank}-${stk}-qr_only.jpg"/>`,
  		icon: 'success', // Có thể là 'success', 'error', 'warning', 'info', ...
  		confirmButtonText: 'OK',
  	}).then((result) => {
  		// Xử lý khi người dùng nhấn "OK"
  		if (result.isConfirmed) {
  			// Đây là nơi để đặt mã xử lý sau khi người dùng nhấn "OK"
  			console.log('Người dùng đã nhấn OK');
  		}
  	});
  }

  function clickNo() {
  	click += 1;
  	thbao.focus(); //cho điện thoại k focus vào nút no
  	if (click >= 10) { //điều kiện để nút no biến mất
  		no.style.display = 'none';
  		thbao.innerHTML = `${upperFistCase(cau)} ấn nút "No" nhiều quá làm nó giận bỏ đi rồi đó. Nhấn "Yes" để nút "No" quay lại 😾`;
  	} else {
  		var yesHeight = yes.offsetHeight;
  		var yesWidth = yes.offsetWidth;
  		yes.style.height = `${yesHeight + sizePlus}px`;
  		yes.style.width = `${yesWidth + sizePlus}px`;
  		yes.style.fontSize = `${parseInt(window.getComputedStyle(yes).getPropertyValue('font-size').replaceAll('px', '')) + (sizePlus/2)}px`;

  		var noHeight = no.offsetHeight;
  		var noWidth = no.offsetWidth;
  		no.style.height = `${noHeight - sizeDown}px`;
  		no.style.width = `${noWidth - sizeDown}px`;
  		no.style.fontSize = `${parseInt(window.getComputedStyle(no).getPropertyValue('font-size').replaceAll('px', '')) - (sizeDown)}px`;

  		no.style.display = 'block'; // Hoặc 'inline-block' tùy thuộc vào loại phần tử
  		no.style.position = 'fixed';
  		no.style.top = Math.floor(Math.random() * (windowHeight - parseInt(window.getComputedStyle(no).getPropertyValue('font-size').replaceAll('px', '')))) + 'px';
  		no.style.left = Math.floor(Math.random() * (windowWidth - parseInt(window.getComputedStyle(no).getPropertyValue('font-size').replaceAll('px', '')))) + 'px';
  	}

  }


  /*đổi hình ảnh cho nhiều :))*/
  var listImg = [
  	'https://i.imgur.com/75r57f4.gif',
  	'https://i.imgur.com/GfL39TF.gif',
  	'https://i.imgur.com/QdUBIkR.gif',
  	'https://i.imgur.com/J8Xucw2.gif',
  	'https://i.imgur.com/bXIoVys.gif',

  ]
  var replayImg = setInterval(() => {
  	console.log('Đổi hình ảnh')
  	love_img.setAttribute('src', listImg[Math.floor(Math.random() * listImg.length)])
  }, 7000)

  window.addEventListener("beforeunload", function(event) {
  	// Thông điệp hiển thị cho người dùng
  	var confirmationMessage = "Bạn có chắc muốn rời khỏi trang?";

  	// (Chỉ hỗ trợ một số trình duyệt)
  	event.returnValue = confirmationMessage;
  	return confirmationMessage;
  });




  function timeStampNow() {
  	return Math.floor(new Date().getTime() / 1000);
  }

  function timeNow() {
  	const d = new Date();
  	const pad = (num) => (num < 10 ? '0' + num : num);

  	return `${(d.getFullYear() + '').slice(2)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function upperFistCase(str) {
  	return str.charAt(0).toUpperCase() + str.slice(1);
  }
  /*
  Swal.fire({
  title: 'Thông báo đẹp!',
  text: 'Đây là nội dung thông báo của bạn.',
  icon: 'success', // Có thể là 'success', 'error', 'warning', 'info', ...
  showCancelButton: true,
  confirmButtonText: 'OK',
  cancelButtonText: 'Hủy'
  }).then((result) => {
  // Nếu người dùng nhấn "OK", tiếp tục thoát khỏi trang
  if (result.isConfirmed) {

  }
  // Nếu người dùng nhấn "Hủy", ngăn chặn thoát khỏi trang
  else {
  event.preventDefault();
  }
  });

  */
