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

var vc_title = getUrlParameter('vc_title');
var vc_brand = getUrlParameter('vc_brand');
var vc_brand_image = getUrlParameter('vc_brand_image');
var vc_des = getUrlParameter('vc_des');
var vc_code = getUrlParameter('vc_code'); //window.atob
var vc_href = decodeURIComponent(getUrlParameter('vc_href'));
var ctvId = getUrlParameter('ctvId');
console.log(ctvId);

var inner_title = document.getElementById('vc_title');
var inner_brand = document.getElementById('vc_brand');
var inner_brand_image = document.getElementById('vc_brand_image');
var inner_des = document.getElementById('vc_des');
var inner_code = document.getElementById('vc_code');
var vc_copy = document.querySelector('#vc_copy');
//if (!inner_code != 'undefined'){window.location.replace('/?utm_source=voucher_details_page')}

inner_title.innerText = vc_title;
inner_brand.innerText = vc_brand;
inner_brand_image.style.backgroundImage = `url(${vc_brand_image})`;
inner_des.innerText = vc_des;
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


