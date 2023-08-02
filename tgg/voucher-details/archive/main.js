const buttons = document.querySelectorAll(".faq-toggle");
const text = document.querySelectorAll(".faq-text");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        button.previousElementSibling.classList.toggle("active-txt");
        button.parentNode.classList.toggle("active");
    });
});


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

var vc_title = decodeURIComponent(getUrlParameter('vc_title')).replaceAll('+', ' ');
var vc_brand = decodeURIComponent(getUrlParameter('vc_brand')).replaceAll('+', ' ');
var vc_brand_image = decodeURIComponent(getUrlParameter('vc_brand_image'));
var vc_des = decodeURIComponent(getUrlParameter('vc_des')).replaceAll('+', ' ');
var vc_code = getUrlParameter('vc_code'); //window.atob
var vc_href = decodeURIComponent(getUrlParameter('vc_href'));
var ctvId = getUrlParameter('ctvId');
var start = getUrlParameter('start');
var end = getUrlParameter('end');
console.log(vc_title);

  //Call element
var inner_title = document.getElementById('vc_title');
var inner_brand = document.getElementById('vc_brand');
var inner_brand_image = document.getElementById('vc_brand_image');
var inner_des = document.getElementById('vc_des');
var inner_code = document.getElementById('vc_code');
var vc_copy = document.querySelector('#vc_copy');
var inner_start = '';
var inner_end = '';
if(start.toString().length >= 10){
  inner_start = `<b>Ngày bắt đầu</b>: ${TsToDate(parseInt(start))} <br/>`
}
if(end.toString().length >= 10){
  inner_end = `<b>Ngày kết thúc</b>: ${TsToDate(parseInt(end))} <br/>`
}
console.log(inner_start)
console.log(inner_end)
//if (!inner_code != 'undefined'){window.location.replace('/?utm_source=voucher_details_page')}

  //Inner value
inner_title.innerText = decodeURIComponent(vc_title);
inner_brand.innerText = decodeURIComponent(vc_brand);
inner_brand_image.style.backgroundImage = `url(${vc_brand_image})`;
inner_des.innerHTML = `${inner_start} ${inner_end} ${decodeURIComponent(vc_des)}`;
inner_code.value = window.atob(vc_code);

document.title = vc_title;

const id = "5353514789844343379"

var updateTime = new Date(); //updateTime
var affLink = `https://go.isclix.com/deep_link/${id}?url=${encodeURIComponent(vc_href)}&utm_source=tggVoucherDetails&utm_medium=ctvId:${ctvId}&utm_content=clickTime:${updateTime.toLocaleTimeString()} ngày ${updateTime.toLocaleDateString()}`;
console.log(affLink + ' ' + vc_href);
vc_copy.setAttribute('onclick', `copyCouponCode(event, '${window.atob(vc_code)}', '${affLink}', true)`);
//vc_copy.onclick = `copyCouponCode(event, '${window.atob(vc_code)}', '${affLink}', true)`;

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
            duration: 1000000000
        })
    }
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
  
  
function createTs() {
  var currentDate = new Date();
  var timestamp = currentDate.getTime();
  return timestamp;
}
function TsToDate(timestamp) {
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
}

  console.log(1693440000000)
