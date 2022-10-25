var content_dday = `

Full mã SHOPEE + LAZADA sale  𝟐𝟓.𝟏𝟎 (xem mã khung giờ ở phía dưới)

<b>A.SHOPEE</b>
🔥SĂN MÃ 16H - 17H SALE 25.10🔥
.
📌 Kol Afiliate - Mã lưu thêm lượt 
◼️ 16H, 17H: Mã giảm 10k đơn 50k 
◼️ 16H, 17H:  Mã giảm 15% tối đa 20K đơn từ 99K
◼️ 16H, 17H:  Mã giảm 15% tối đa 30K đơn từ 150K
◼️ Lưu mã tại: https://shorten.asia/MZsq4ke7  
.
📌 1 Số mã khác còn lượt 
•SKAMLTB2410 giảm 20K đơn từ 0Đ. List sản phấm áp mã: https://shorten.asia/eUrTqWBT 
• SKAMLTS2410 giảm 15K đơn từ 0Đ. List sản phấm áp mã: https://shorten.asia/VnkxdmAA 
• AFF10TZW giảm 25K đơn từ 68K. List sản phẩm áp mã: https://shorten.asia/r5xjJqXs 
• SKAMLTB1110 giảm 20K đơn từ 0Đ. List sản phẩm áp mã: https://shorten.asia/R5grdqfZ 
• SKAMLTS1110 giảm 15K đơn từ 0Đ. List sản phẩm áp mã: https://shorten.asia/Npcu57AP 
• LIFEMC10G giảm 50K đơn từ 350K. List sản phẩm áp mã: https://shorten.asia/JAaznU1J 

<b>B.LAZADA</b>
📌 Áp toàn sàn
◼️ 16h: giảm 50% tối đa 40k
◼️ 17h: giảm 50% tối đa 50k
◼️ Lưu mã tại: https://shorten.asia/QmbBsDfF 
Load trang nhanh: Bấm vào "  Voucher chớp nhoáng 50% " 
.
📌 Áp toàn sàn - Thêm lượt 
◼️ 16H:  Lưu mã 30k/400k,  500k/ 0Đ, 10k/129k, 150k/1,5TR, 50k/600k, 30k/350k, 10% đơn 0Đ, 8% đơn 69k:  https://shorten.asia/u8kPMCE9 
.
📌 Siêu sale FreeShip - Thêm lượt 
◼️ 16H: Lưu mã FS 20k/0Đ, 15k/99k, 15k/29k
◼️ Lưu mã tại: https://shorten.asia/QmbBsDfF 
.
📌 16H: Lưu hoàn tiền 12%: https://shorten.asia/JhZPXz1r  

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

