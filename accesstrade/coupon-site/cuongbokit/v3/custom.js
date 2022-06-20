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
