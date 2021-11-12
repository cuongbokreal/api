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
        if(pathNameVoucherSite = '/'){
            surf.innerHTML = innerSurf;
            innerVouchers.innerHTML = innerSurf;
        }    
    }, 5000);
}    
createMariquee();
