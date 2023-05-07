var cbi_hostname = window.location.hostname;
if(cbi_hostname != 'www.trumgiamgia.net'){
	window.location.replace(`https://www.trumgiamgia.net/?utm_source=copy_code&utm_medium=${encodeURIComponent(window.location.href)}&utm_content=${new Date()}`)
}else{console.log('Chào mừng bạn đến với Trùm Giảm Giá!')}

/*SETTING*/
var hostname = window.location.hostname;
var pathname = window.location.pathname;
var myHeaders = new Headers();
myHeaders.append("Authorization", "Token NJX0ajmdmDlubnsfBHrvCJQjWIehzXcA");
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
setCookie('selected', '4742147753565840242', 9999);

var urlRegex = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w\d#?=.&%+-]*)*\/?(\?([\w\d#?=.&%+-]+))?$/; //REGEX URL
var mgg_page = document.getElementById('mgg_page');
const deeplink = 'https://go.isclix.com/deep_link/5353514789844343379';

function merchantList() {
    fetch(`https://api.accesstrade.vn/v1/offers_informations/merchant_list`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var html_merchant = '';
            Object.keys(data.data).forEach((key) => {
                html_merchant += `<div class="merchant_item" data-id="${data.data[key].id}" data-display_name="${data.data[key].display_name[0]}" data-login_name="${data.data[key].login_name}" onclick="fetchData('${data.data[key].id}', '', 1, 'next')">
        <img class="merchant_img" alt="${data.data[key].display_name[0]}" src="${data.data[key].logo}"/>
        <p class="merchant_name">${data.data[key].display_name[0]} (${data.data[key].total_offer})</p>
  </div>`
            })
            document.querySelector('#merchant').innerHTML = html_merchant;
        })
}
merchantList()


var page = 1;
var limit = 12;
var mgg_prev = document.getElementById('mgg_prev');
var mgg_this = document.getElementById('mgg_this');
var mgg_next = document.getElementById('mgg_next');
var mgg = document.getElementById('mgg');

/*===GHIM MGG====*/
var content_ghim = '';
for(let i=0; i<mgg_ghim.length; i++){
	//var mgg_href = `${deeplink}?url=${encodeURIComponent(mgg_ghim[i].link)}`;
	var action_text = 'Sao chép mã';
	var action = true;
	var mgg_copy = '';
	if(!mgg_ghim[i].code){ //khi mã lưu banner
		action_text = 'Đến banner';
		action = false;
		mgg_copy = `<div class="mgg_copy" onclick="copyCouponCode(event, '', '${mgg_ghim[i].link}', ${action})">${action_text}<i class="fa-regular fa-copy"></i></div>`
	}else{ //khi có mã
		mgg_copy = `<div class="mgg_copy" onclick="copyCouponCode(event, '${mgg_ghim[i].code}', '${mgg_ghim[i].link}', ${action})">${action_text} <i class="fa-regular fa-copy"></i></div>`;
	}
	content_ghim += `<div class="mgg_item">
      <div class="mgg_left">
          <div class="mgg_img"><img src="${mgg_ghim[i].image}" alt="${mgg_ghim[i].value}"/></div>   
      </div>
      <div class="mgg_right">
          <div class="mgg_details">
          	<div class="mgg_tag"><div class="mgg_tag_item">${mgg_ghim[i].tag}</div></div>
            <div class="mgg_name" title="${mgg_ghim[i].value}"> 
  			<div class="mgg_value">${mgg_ghim[i].value}</div> 
			<div class="class="mgg_min_spend">${mgg_ghim[i].minspend}</div>
  		</div>
	    <div class="mgg_content">
	      <p class="mgg_time">Ngày bắt đầu: <b>${mgg_ghim[i].start_time}</b></p>
	      <p class="mgg_time">Ngày kết thúc: <b>${mgg_ghim[i].end_time}</b></p>
	      <p>Còn <b>${mgg_ghim[i].remain}</b> lượt</p>
	    </div>
          </div> <!--hết details-->
          <div class="mgg_action">
          	<div class="mgg_info" flow="up" tooltip="${mgg_ghim[i].detail}">Chi tiết <i class="fa-solid fa-circle-info"></i></div>
            	${mgg_copy}
          </div>
    </div>
    </div>`
}
document.querySelector('#mgg_ghim').innerHTML = content_ghim;


function fetchData(merchantId, input, page, action) {
    /*
    merchant: id number
    input: keyword or url 
    page: page
    action: hanh dong next page, prev page
    */
    /*sETTING COOKIE MERCHANT*/
    var merchant = ''
    var campaign = '';
    if (merchantId != 'all') {
        if (merchantId.length >= 25) { //kí tự dài hơn 1 camp
            campaign = merchantId;
        } else { //kí tự có 1 camp
            merchant = merchantId;
            if (typeof getCookie('selected') === 'undefined') { //set selected
                console.log('Chua chon');
                selectedMerchant.classList.add('selected');
                setCookie('selected', merchantId, 9999);
            } else {
                document.querySelectorAll(`[data-id="${getCookie('selected')}"]`)[0].classList.remove('selected');
                var selectedMerchant = document.querySelectorAll(`[data-id="${merchantId}"]`)[0]
                console.log(getCookie('selected'))
                selectedMerchant.classList.add('selected');
                setCookie('selected', merchantId, 9999);
            }
        } //end kí tự 1 camp
    }
    setCookie('merchantId', merchantId, 9999)
    /*===XỬ LÝ INPUT LÀ URL HOẶC KÍ TỰ===*/
    var keyword = '';
    var url = '';
    if (urlRegex.test(input)) { //trường hợp là url 
        url = encodeURIComponent(input);
    } else { //trường hợp không phải url
        keyword = input;
    }
    /*Zô fetch dâta chính*/
    if (page <= 1) {
        page = 1
    }
    mgg.innerHTML = `
  				<!--loading Shopee-->
  				<center>
				<svg class="spinner" style="text-align:center;" width="34" height="12" viewBox="-1 0 33 12"><circle class="loading-dot" cx="4" cy="6" r="4" fill="#ee4d2d"></circle>
				<circle class="loading-dot" cx="16" cy="6" r="4" fill="#ee4d2d"></circle>
				<circle class="loading-dot" cx="28" cy="6" r="4" fill="#ee4d2d"></circle>
				</svg>
				</center>
			    <!--end loading Shopee-->
  `;
    //window.location.hash = '';
    //window.location.hash = 'joinGroup';
    fetch(`https://api.accesstrade.vn/v1/offers_informations/coupon?page=${page}&limit=${limit}&url=${encodeURIComponent(input)}&keyword=${''}&merchant=${merchant}&campaign=${campaign}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //Inner số trang
	    mgg_page.setAttribute("disabled", "true"); //trường hợp mobile focus vào input
	    mgg_page.disabled = true;
            mgg_page.value = page;
	    mgg_page.blur() //blur 
	    mgg_page.disabled = false;
            document.getElementById('mgg_total_page').innerText = Number.parseFloat(data.count / limit).toFixed(0);
            document.getElementById('mgg_count').innerText = data.count.toLocaleString()
            // Content inner HTML MGG
            var content_html = ''; 
            Object.keys(data.data).forEach(key => {

                var mgg_value = 0;
                if (data.data[key].discount_percentage === 0) { //khi giá trị % == 0
                    if (data.data[key].discount_value > 100) {
                        mgg_value = `Giảm ${data.data[key].discount_value / 1000}K`
                    } else {
                        mgg_value = `Giảm ${data.data[key].discount_value}%`
                    }
                } else {
                    mgg_value = `Giảm ${data.data[key].discount_percentage}%`
                }

                var mgg_min_spend = `<div class="mgg_min_spend">Đơn tối thiểu ${data.data[key].min_spend /1000}K</div>` //set trước min spend để nếu không có value và percent thì không hiện min spend
                /*
		if(data.data[key].shop_id != 0 && data.data[key].domain == 'tiki.vn'){ //trường hợp shop của tiki không hiện minspend
		}else{}*/
		if (data.data[key].discount_percentage == 0 && data.data[key].discount_value == 0) {
                    mgg_value = data.data[key].name;
                    var mgg_min_spend = ''; //nếu không có discount percent và value thì không hiện đơn tối thiểu
                }
		if((!data.data[key].discount_percentage && !data.data[key].discount_value) || (data.data[key].shop_id != 0 && data.data[key].domain == 'tiki.vn')){
			mgg_value = data.data[key].name;
			mgg_min_spend = '';
		}

                var mgg_tag = '';
                if (data.data[key].keyword) {
                    Object.values(data.data[key].keyword).forEach(cc => {
                        mgg_tag += `<div class="mgg_tag_item">${cc}</div>`;
                    })
                }

                var mgg_href = `${data.data[key].aff_link}&utm_source=${hostname}&utm_medium=${pathname}&utm_campaign=tgg_mgg&utm_content=${new Date()}`;

                var mgg_tooltip = '';
                if (data.data[key].content.length > data.data[key].name.length) { //lấy tooltip dài hơn giữa name và content
                    mgg_tooltip = data.data[key].content;
                } else {
                    mgg_tooltip = data.data[key].name;
                }
                if (mgg_tooltip.length == 0) { //dành cho mã shop không có percent và value thì hiện tên của mã 
                    mgg_tooltip = `Mã giảm giá hot giảm ${mgg_value}, sao chép và dùng ngay nào!`
                }

                content_html += `<div class="mgg_item">
      <div class="mgg_left">
          <div class="mgg_img"><img src="${data.data[key].image}" alt="${data.data[key].name}"/></div> 
          <div class="mgg_tag"></div>  
      </div>
      <div class="mgg_right">
          <div class="mgg_details">
          	<div class="mgg_tag">${mgg_tag}</div>
            <div class="mgg_name" title="${data.data[key].name}"> 
  			<div class="mgg_value">${mgg_value}</div> 
            ${mgg_min_spend}
  			</div>
            <!--p class="mgg_des" title="${data.data[key].content}">${data.data[key].content}</p-->
	    <div class="mgg_content">
	      <p class="mgg_time">Ngày bắt đầu: <b>${data.data[key].start_time}</b></p>
	      <p class="mgg_time">Ngày kết thúc: <b>${data.data[key].end_time}</b></p>
	      <p>Còn <b>${data.data[key].remain}</b> lượt</p>
	      <p>${data.data[key].time_left}</p>
	    </div>
          </div> <!--hết details-->
          <div class="mgg_action">
          	<div class="mgg_info" flow="up" tooltip="${mgg_tooltip}">Chi tiết <i class="fa-solid fa-circle-info"></i></div>
            <div class="mgg_copy" onclick="copyCouponCode(event, '${data.data[key].coupons[0].coupon_code}', '${mgg_href}', true)" data-code="${data.data[key].coupons[0].coupon_code}" data-href="${mgg_href}" onclick="copyVoucher(this)">Sao chép mã <i class="fa-regular fa-copy"></i></div>
          </div>
    </div>
    </div>
    <script type='application/ld+json'>{
	  "@context": "https://schema.org/",
	  "@type": "Offer",
	  "name": "${mgg_value}",
	  "description": "${mgg_tooltip}",
	  "url": "${mgg_href}",
	  "discountCode": "${data.data[key].coupons[0].coupon_code}",
	  "priceCurrency": "VND",
	  "price": "${mgg_min_spend}",
	  "validThrough": "${data.data[key].end_time}T23:59:59+07:00"
	}</script>
    `;
            })
            document.getElementById('mgg').innerHTML = content_html;
	    limit = 12; //set chay limit
            if (action === 'next') {

                mgg_prev.setAttribute('onclick', `fetchData('${merchantId}', '', ${page-1}, 'prev')`);
                mgg_prev.innerText = `${page-1}`;
                mgg_this.setAttribute('onclick', `fetchData('${merchantId}', '', ${page}, 'prev')`);
                mgg_this.innerText = `${page}`;
                mgg_next.setAttribute('onclick', `fetchData('${merchantId}', '', ${page+1}, 'next')`);
                mgg_next.innerText = `${page+1}`;
                page += 1;
            } else {
                mgg_next.setAttribute('onclick', `fetchData('${merchantId}', '', ${page+1}, 'next')`);
                mgg_next.innerText = `${page+1}`;
                mgg_this.setAttribute('onclick', `fetchData('${merchantId}', '', ${page}, 'prev')`);
                mgg_this.innerText = `${page}`;
                mgg_prev.setAttribute('onclick', `fetchData('${merchantId}', '', ${page-1}, 'prev')`);
                mgg_prev.innerText = `${page-1}`;
                page -= 1;
            }

        })
        .catch(error => console.log('error', error));
}
fetchData('4751584435713464237%2C4348614231480407268%2C5127144557053758578', '', page, 'next'); //luc dau hien shopee, tiki, laz


/*===SEARCH DÂTA===*/
function searchData() {
    var searchQuery = document.querySelector('#search_input').value;
    fetchData('all', searchQuery, 1, 'next'); //tim kiem theo keyword 
}
/*
function changePage(){
  var mgg_page = parseInt(document.querySelector('#mgg_page').value);
  var mgg_total_page = parseInt(document.querySelector('#mgg_total_page').innerText);
  console.log('change');
  if (mgg_page > 0 && mgg_page <= mgg_total_page) {
    fetchData(`${getCookie('merchant')}`, '', mgg_page, 'next');
  }
}*/

mgg_page.addEventListener("change", () => {
    var mgg_page = parseInt(document.querySelector('#mgg_page').value);
    var mgg_total_page = parseInt(document.querySelector('#mgg_total_page').innerText);
    console.log('change');
    if (mgg_page > 0 && mgg_page <= mgg_total_page) {
        fetchData(`${getCookie('merchantId')}`, '', mgg_page, 'next');
    }
});

/*=== COPY ===*/
//Copy v2, không delay 
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
    }
}
var mgg_culi = document.getElementById('mgg_culi');
function copyVoucher(c) {
    mgg_culi.value = c.getAttribute('data-code');
    mgg_culi.focus();
    mgg_culi.select();
    mgg_culi.setSelectionRange(0, 99999);
    document.execCommand("Copy");
    navigator.clipboard.writeText(document.getElementById('mgg_culi').value);
    c.innerText = c.getAttribute('data-code');
    setTimeout(() => {
        window.open(c.getAttribute('data-href'), '_blank');
    }, 400)
    toast({
        title: 'Thành công',
        message: `Đã sao chép mã: <b><a rel="nofollow" target="_blank" href="${c.getAttribute('data-href')}">${c.getAttribute('data-code')}</a></b>`,
        type: "success",
        duration: 10000
    })
    console.log(`Copied: ${mgg_culi.value}`);
}

/*===IMPORT*/
//JS Cookie by Cuongbok, (c) 2022
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name + '=') == 0) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}

function eraseCookie(name) {
    setCookie(name, '', -1);
}
console.log('CuongbokIT Cookie import successful!')
