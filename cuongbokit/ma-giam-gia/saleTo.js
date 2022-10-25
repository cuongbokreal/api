var content_dday = `

Full mã SHOPEE + LAZADA sale  𝟐𝟓.𝟏𝟎 (xem mã khung giờ ở phía dưới)

<b>A.SHOPEE</b>
🔥KOL AFFILIATE - MÃ TOÀN SÀN: load trang liên tục - mã back
• 20H: Mã giảm 10K đơn từ 50K
• 20H: Mã giảm 15% tối đa 20K đơn từ 99K
• 20H: Mã giảm 15% tối đa 30K đơn từ 150K
=> Lưu mã tại: https://shorten.asia/MZsq4ke7 
.
🔥MÃ LƯU TRÊN LIVE - MÃ ÁP ĐA SỐ SẢN PHẨM: mã back
• 20H: Mã giảm 15K/50K, 20K/100K, 40K/250K. Lưu mã tại: https://shorten.asia/tY3hyv89  mục Live, gần giờ săn shop sẽ lên live
• 20H: Mã giảm 30K/100K, 50K/250K. Lưu mã tại: https://shorten.asia/4yvRZdh8  mục “SĂN DEAL HOT”
=> Tổng hợp list shop áp được mã 20K/100K, 40K/250K, 30K/100K, 50K/250K tại: https://shorten.asia/4yvRZdh8 
• Mã giảm 15% tối đa 15K đơn từ 50K. Lưu mã tại: https://shorten.asia/4yvRZdh8  mục "IDOL REVIEW" 
.
🚛MIỄN PHÍ VẬN CHUYỂN: dùng tối đa 14 lượt
• Lưu mã Freeship giảm 70K/25K tại các live bất kì: https://shorten.asia/4yvRZdh8  
• Lưu 4 mã Freeship giảm 15K/0Đ, 30K tại: https://shorten.asia/k4n7Fk9X  
• Lưu 2 mã Freeship giảm 25K/50K lọc sp tại: https://shorten.asia/pWVkxs7T  
• Tặng sẵn 1 số mã Freeship trong ví tùy tài khoản: https://shorten.asia/tztyMzFM 
• Đổi mã Freeship giảm 50% giảm tối đa 40K tại: https://shorten.asia/KNPSXs2R 
• Quay mã Freeship 0Đ tại: https://shorten.asia/bwtaEj3Q 
.
🔥MÃ ÁP MỘT SỐ SẢN PHẨM CÒN LƯỢT:
• AFF10TZW giảm 25K đơn từ 69K. List sản phẩm áp mã: https://shorten.asia/r5xjJqXs 
• SKAMLTB2410 giảm 20K đơn từ 0Đ. List sản phấm áp mã: https://shorten.asia/eUrTqWBT 
• SKAMLTS2410 giảm 15K đơn từ 0Đ. List sản phấm áp mã: https://shorten.asia/VnkxdmAA 
• SKAMLTB1110 giảm 20K đơn từ 0Đ. List sản phẩm áp mã: https://shorten.asia/R5grdqfZ 
• SKAMLTS1110 giảm 15K đơn từ 0Đ. List sản phẩm áp mã: https://shorten.asia/Npcu57AP 
• LIFEMC10G giảm 50K đơn từ 350K. List sản phẩm áp mã: https://shorten.asia/JAaznU1J 
.
🔥CÁC MÃ SHOP BÁN: https://shorten.asia/JAaznU1J 

<b>B.LAZADA</b>
➖➖➖➖LAZADA➖➖➖➖
🔥20H: MÃ LAZMALL GIẢM 60K ĐƠN TỪ 499K: 
=> Lưu mã tại: https://shorten.asia/2QaB1F8s 
.
🔥MÃ TOÀN SÀN, MOMO, ZALOPAY, VNPT, FREESHIP:
=> Lưu mã tại: https://shorten.asia/u8kPMCE9 

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

