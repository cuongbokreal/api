var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
 
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
 
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
var p = getUrlParameter('p');
var listAd = [
	{"id":"00",
	 "name":"Nguyễn Ngọc Cường",
	 "source":"Cuongbok"
	},
	 {"id":"01",
	 "name":"Nguyễn Tất Minh",
	 "source":"TatMinh"
	},
	 {"id":"02",
	 "name":"Nguyễn Thị Quỳnh Anh",
	 "source":"QuynhAnh"
	},
 ];
if(p.length > 0){console.log(listAd[p].name)}

    var aMainCode = document.querySelector('#mainCode');
    var mainCode = document.querySelector('#mainCode > .code-text > input');
    var copyCodeButton = document.querySelector('#mainCode > span');
    var NotifyCopiedVoucherCode = document.getElementById('NotifyCopiedVoucherCode');
    mainCode.value = window.atob(voucherCode);
    mainCode.setAttribute("size", "18");

    function copyVoucherCode() {
      NotifyCopiedVoucherCode.style.display = 'block';
      NotifyCopiedVoucherCode.innerHTML = `Đã copy mã Voucher!`;    
      var copyCode = document.querySelector('#mainCode > .code-text > input');
      copyCode.select();
      copyCode.setSelectionRange(0, 99999); /* For mobile devices */
      navigator.clipboard.writeText(copyCode.value);
      console.log("Copied the code: " + copyCode.value);
      setTimeout(function(){
      	//window.open(window.location.href);
        window.location.href = aMainCode.getAttribute("data-href");
      }, 10);  
    }
    //document.body.setAttribute("oncopy", "copyVoucherCode()");
    mainCode.setAttribute("oncopy", "copyVoucherCode()");

    setInterval(function(){
	copyCodeButton.style.display ='block';
      	copyCodeButton.setAttribute("class", "get-code");
	mainCode.setAttribute("oncopy", "copyVoucherCode()");
	//document.body.setAttribute("oncopy", "copyVoucherCode()");
    	mainCode.setAttribute("oncopy", "copyVoucherCode()");
	if(document.oncontextmenu=null){
		blockContextMenu()
	}
    }, 2000);

//block rightmouse + CtrlU
function blockContextMenu(){
	document.addEventListener('contextmenu', event => event.preventDefault());
	document.onkeydown = function(e) {
        if ((e.keyCode === 85 || e.keyCode === 117)) {//Alt+c, Alt+v will also be disabled sadly.
            console.log('Chặn!');
        }
        return false;
};
}
blockContextMenu()

//'e.ctrlKey &&' chặn Ctrl 

