const searchParams = new URL(window.location.href);
const ctv_id = searchParams.searchParams.get('ref');
var atScript6626 = document.getElementById('atScript6626');

if(ctv_id && ctv_id !== null && ctv_id.length >= 1 && ctv_id != ''){
	console.log(ctv_id);
    atScript6626.setAttribute('data-utm-source','ctv');
    atScript6626.setAttribute('data-utm-medium',`ctv_${ctv_id}`);
}

var updateTime = new Date(); //updateTime
var today = `${updateTime.getDate()}.${updateTime.getMonth() + 1}`;
document.querySelectorAll('.postTitle')[0].innerHTML += today;

window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOM fully loaded and parsed');
	//location.hash coupon main when click next
	const pageItem = document.querySelectorAll('.atEQPOIVFSDFSDG-pagination > .atEQPOIVFSDFSDG-page-item');
	pageItem.forEach((element) => {element.addEventListener("click", couponTab);});
});
function couponTab() {
	location.hash = "";
	location.hash = "first-block";
}


/*
document.querySelectorAll('.atEQPOIVFSDFSDG-voucher-main')[0].addEventListener('DOMContentLoaded', (event) => {
	console.log('DOM fully loaded and parsed');
	//location.hash coupon main when click next
	const pageItem = document.querySelectorAll('.atEQPOIVFSDFSDG-pagination > .atEQPOIVFSDFSDG-page-item');
	pageItem.forEach((element) => {element.addEventListener("click", couponTab);});
});
*/
