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
var hostNameVoucherSite = window.location.hostname;
var updateTime = new Date();
var ctv = getUrlParameter('ctv');
var jsMain = document.createElement("SCRIPT");
jsMain.src = 'https://static.accesstrade.vn/coupon/v2/js/main.js';
jsMain.id = 'atScript6626';
jsMain.setAttribute("data-accesskey", "5353514789844343379");
jsMain.setAttribute("data-filters", `
{"merchant":"4742147753565840242,4348611690224153209,5127139956446111602,4348611682079477428","category":"","campaign":"4751584435713464237,4348614231480407268,5127144557053758578,4348614229221512955,"}
`); 
jsMain.setAttribute("data-utm-content", `clickTime:${updateTime.toLocaleTimeString()} ngày ${updateTime.toLocaleDateString()}`);
if(ctv){
  jsMain.setAttribute("data-utm-source", `CTV${hostNameVoucherSite}`);
  jsMain.setAttribute("data-utm-medium", `ctvId:${ctv}`);  
}else{
  jsMain.setAttribute("data-utm-source", hostNameVoucherSite);
  jsMain.setAttribute("data-utm-medium", "home");
}
document.body.appendChild(jsMain); 

   
//custom tí background cho ngựa ngựa =-))
var listBgColor = ["ffeeee",//hồng nhạt
    "#eee3ff",//tím hơi nhạt
    "#b7b6e4",//tím hơi đậm
    "#ffe3eb",//hồng hơi nhạt
    "#c5ce67",//xanh cức
    "#f38b8b",//đỏ tươi
    "#8bcff3",//xanh facebook
    ]
randomBgColor = listBgColor[Math.floor(Math.random() * listBgColor.length)];
document.getElementsByClassName('voucher-main')[0].style.background = randomBgColor;

//mariquee
function createMariquee(){
    var surf = document.getElementById('surf');
    var innerVouchers = document.getElementById('innerVouchers');
    setTimeout(function(){ 
        var titleVouchers = document.getElementsByClassName('title');
        let innerSurf = "";
        for(let i=3;i<titleVouchers.length;i++){
            innerSurf+=`<a class="vouchers-tag-link" href="?ctv=vouchers_click&utm_source=vouchers_a_tag_click&utm_medium=${titleVouchers[i].innerText}#couponTab" title="Mã tại TrumGiamGia: ${titleVouchers[i].innerText}" alt="Mã tại TrumGiamGia: ${titleVouchers[i].innerText}">${titleVouchers[i].innerText}</a>   |   `
        }    
        surf.innerHTML = innerSurf;
        innerVouchers.innerHTML = innerSurf;
    }, 5000);
}    
createMariquee();
