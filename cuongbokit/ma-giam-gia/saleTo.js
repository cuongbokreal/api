var content_dday = `

Full mã SHOPEE + LAZADA sale  𝟐𝟓.𝟏𝟎 (xem mã khung giờ ở phía dưới)

<b>A.SHOPEE</b>
➖➖➖➖SHOPEE➖➖➖➖
#SHOPEE 20H:
.
⭐️ 1. Săn voucher cùng Shopee KOL - Mã áp toàn sàn Shopee: https://shorten.asia/DwnytsuH  
► 20H: Lưu trên banner + dùng ngay mã giảm 30K cho đơn từ 150K toàn sàn Shopee (cho tất cả user)
► 20H: Lưu trên banner + dùng ngay mã giảm 20K cho đơn từ 99K toàn sàn Shopee (cho tất cả user)
.
⭐️ 2. Hirucars: https://shorten.asia/yKfdhnzk  
► 20H: `HIRU20H` (mã shop) giảm 79k đơn từ 199k (Lỗi list sản phẩm áp mã)


<b>B.LAZADA</b>
➖➖➖➖LAZADA➖➖➖➖
🔥18H: DEAL TRỢ GIÁ - TỰ NHẢY GIÁ: ở phần “LazFlash Crazy” chọn mục “Đừng quên ! Mở bán lúc…”
=> Xem chi tiết tại: https://shorten.asia/H6uZF7fP 
.
🔥20H: MÃ LAZMALL GIẢM 60K ĐƠN TỪ 499K: 
=> Lưu mã tại: https://shorten.asia/CAem2bU3 

`

var updateTime = new Date(); //updateTime
var mgg_dday = document.querySelector('#mgg_dday')
thisDate = updateTime.getDate();
thisMonth = (updateTime.getMonth() + 1)
var dday = 0
if(thisDate == thisMonth){dday = thisDate}
if(thisDate > 0 && thisDate <= 15){dday = 15}else
if(thisDate > 15 && thisDate <= 25){dday = 25}

if (content_dday.length >= 20){
  content_dday = `<h4  class="title-block">🔥 Tiết Lộ Mã Giảm Giá ngày SALE <span style="color:red">${dday}.${thisMonth}</span></h4>` + content_dday
  mgg_dday.style.display = 'block';
  mgg_dday.innerHTML = content_dday.replaceAll('\n', '<br/>')
}

$("#mgg_dday").each(function(){
   $(this).html( $(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a rel="nofollow" target="_blank" href="$1">$1</a> ') );
});

