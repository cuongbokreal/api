const searchParams = new URL(window.location.href);
const ctv_id = searchParams.searchParams.get('ref');
var atScript6626 = document.getElementById('atScript6626');
if(ctv_id && ctv_id !== null && ctv_id.length >= 1 && ctv_id != ''){
	console.log(ctv_id);
	if(ctv_id.match(/[0-9]{6}/g)){
		atScript6626.setAttribute('data-utm-source','ctv');
		atScript6626.setAttribute('data-utm-medium',`ctv_${ctv_id}`);
		atScript6626.setAttribute('data-utm-campaign',`CuongbokIT CTV: ${window.location.pathname}`);
	}else{
		atScript6626.setAttribute('data-utm-source','ref');
		atScript6626.setAttribute('data-utm-medium',`ref_${ctv_id}`);
		atScript6626.setAttribute('data-utm-campaign',`CuongbokIT REF: ${window.location.pathname}`);
	}
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

document.querySelectorAll('[name="viewport"]')[0].setAttribute('content','width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=1');

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
