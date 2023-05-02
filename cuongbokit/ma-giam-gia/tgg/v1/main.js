/*SETTING*/
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

function merchantList() {
    fetch(`https://api.accesstrade.vn/v1/offers_informations/merchant_list`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var html_merchant = '';
            Object.keys(data.data).forEach((key) => {
                html_merchant += `<div class="merchant_item" data-id="${data.data[key].id}" data-display_name="${data.data[key].display_name[0]}" data-login_name="${data.data[key].login_name}" onclick="fetchData('${data.data[key].id}', '', 1, 'next')">
        <img class="merchant_img" src="${data.data[key].logo}"/>
        <p class="merchant_name">${data.data[key].display_name[0]} (${data.data[key].total_offer})</p>
  </div>`
            })
            document.querySelector('#merchant').innerHTML = html_merchant;
        })
}
merchantList()


var page = 1;
var limit = 10;
var mgg_prev = document.getElementById('mgg_prev');
var mgg_this = document.getElementById('mgg_this');
var mgg_next = document.getElementById('mgg_next');
var mgg = document.getElementById('mgg');

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
    window.location.hash = '';
    window.location.hash = 'search_input';
    fetch(`https://api.accesstrade.vn/v1/offers_informations/coupon?page=${page}&limit=${limit}&url=${encodeURIComponent(input)}&keyword=${''}&merchant=${merchant}&campaign=${campaign}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //Inner số trang
	    mgg_page.setAttribute("disabled", "true"); //trường hợp mobile focus vào input
            mgg_page.value = page;
	    mgg_page.removeAttribute("disabled");
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
                if (data.data[key].discount_percentage == 0 && data.data[key].discount_value == 0) {
                    mgg_value = data.data[key].name;
                    var mgg_min_spend = ''; //nếu không có discount percent và value thì không hiện đơn tối thiểu
                }
		if(!data.data[key].discount_percentage || !data.data[key].discount_value){
			mgg_value = data.data[key].name;
			mgg_min_spend = '';
		}

                var mgg_tag = '';
                if (data.data[key].keyword) {
                    Object.values(data.data[key].keyword).forEach(cc => {
                        mgg_tag += `<div class="mgg_tag_item">${cc}</div>`;
                    })
                }

                var mgg_href = `${data.data[key].aff_link}&utm_source=cbi&utm_medium=/p/voucher-sap-mo.html&utm_campaign=voucherSapMo&utm_content=${new Date()}`;

                var mgg_tooltip = '';
                if (data.data[key].content.length > data.data[key].name.length) { //lấy tooltip dài hơn giữa name và content
                    mgg_tooltip = data.data[key].content;
                } else {
                    mgg_tooltip = data.data[key].name;
                }
                if (mgg_tooltip.length == 0) {
                    mgg_tooltip = `Mã giảm giá hot giảm ${mgg_value}, sao chép và dùng ngay nào!`
                }

                content_html += `<div class="mgg_item">
      <div class="mgg_left">
          <div class="mgg_img"><img src="${data.data[key].image}" alt="${data.data[key].name}"/></div> //ảnh voucher 
          <div class="mgg_tag"></div> //tag voucher 
      </div>
      <div class="mgg_right">
          <div class="mgg_details">
          	<div class="mgg_tag">${mgg_tag}</div>
            <div class="mgg_name" title="${data.data[key].name}"> //tên lớn
  			<div class="mgg_value">${mgg_value}</div> //giá trị giảm
            ${mgg_min_spend}
  			</div>
            <!--p class="mgg_des" title="${data.data[key].content}">${data.data[key].content}</p-->
			<p class="mgg_time">Ngày bắt đầu: <b>${data.data[key].start_time}</b></p>
      <p class="mgg_time">Ngày kết thúc: <b>${data.data[key].end_time}</b></p>
      <p>Còn <b>${data.data[key].remain}</b> lượt</p>
      <p>${data.data[key].time_left}</p>
          </div>
          <div class="mgg_action">
          	<div class="mgg_info" flow="up" tooltip="${mgg_tooltip}">Chi tiết <i class="fa-solid fa-circle-info"></i></div>
            <div class="mgg_copy" data-code="${data.data[key].coupons[0].coupon_code}" data-href="${mgg_href}" onclick="copyVoucher(this)">Sao chép mã</div>
          </div>
    </div>
    </div>`;
            })
            document.getElementById('mgg').innerHTML = content_html;
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
    }, 500)
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
