var content_dday = `


2. LAZADA:
🚛MIỄN PHÍ VẬN CHUYỂN: 
• 0H, 12H, 20H: Lưu mã Freeship giảm 9K/99K tại: https://tinyurl.com/ypcbyuoq 
• 0H: Lưu mã Freeship 20K/0Đ tại: https://tinyurl.com/yrzow3j6  (thêm sản phẩm vào giỏ hàng - sau đó bấm mục "Voucher & LazBonus")
• Lưu mã Freeship giảm 20K/0Đ, 5K/19K, 15K/49K, 25K/125K, 50K/300K tại: https://tinyurl.com/ytyufyrq  + https://tinyurl.com/2xavqvka 
.
🔥MÃ TOÀN SÀN: thường lên trễ 1p
• 0H, 12H, 20H: Lưu mã giảm 20K đơn từ 99K
• 0H15, 12H15, 20H15: Lưu mã giảm 100K đơn từ 500K
• 12H, 20H: Lưu mã giảm 100K đơn từ 1000K
• 13H, 15H, 17H, 19H, 21H: Mã nhập tay giảm 50K đơn từ 200K
=> Lưu mã tại: https://tinyurl.com/ypcbyuoq 
.
🔥MÃ HOÀN TIỀN MAX: 
• 0H, 12H, 20H: Lưu mã hoàn tiền 30% tối đa 50K/99K tại: https://tinyurl.com/ypcbyuoq 
• 0H: Lưu mã hoàn tiền 10% tối đa 100K, 30K tại: https://tinyurl.com/yot8zxuk  
.
🔥9H, 12H: LOẠT MÃ NGâN HÀNG, MOMO, ZALOPAY, VNPT, VIETTEL MONEY: 
=> Lưu mã tại: https://tinyurl.com/yva2t7sm 
.
🔥MÃ NHẬP TAY GIẢM 25K/125K, 30K149K, 40K/199K, 50K, ... - CHỜ CẬP NHẬT SAU LIÊN TỤC TRÊN NHÓM ZALO, TELE:
   - Zalo: 
   - Telegram:  (MỚI)
.
🔥CÁC BANNER CÓ THỂ LÊN MÃ TOÀN SÀN GIẢM 25K/99K BẤT NGỜ(MÃ LƯU):
• VN: https://tinyurl.com/youjabfk 
• ZL: https://tinyurl.com/ywcb2z4z  
• MM: https://tinyurl.com/yv3sbobl 
.
🔥LƯU SỚM THÊM MỘT SỐ MÃ SHOP NỔI BẬT: 
• Lotte 15K/15K, 70K: https://tinyurl.com/2x46jtgm 
• OVALTINE 35K, 50K: https://tinyurl.com/ywy68e5v 
• Tefal 20%: https://tinyurl.com/ykvgsnvc 
.
🔥DEAL TRỢ GIÁ, 1K, 9K, X9K:
• Choice mua 3 chỉ 39K: https://tinyurl.com/ylw6ms5f 
• 0H: Deal hot 1K, 9K, dưới 49K: https://tinyurl.com/ytyufyrq 
• 0H, 12H, 20H: Deal trợ giá - flash sale: https://tinyurl.com/ynz54au7 
• Deal dùng thử 9K, x9K: https://tinyurl.com/yvolt5e5 
.
🔥LAZGAME:
• 0H: Đổi Gems lấy quà 0Đ, mã toàn sàn: https://tinyurl.com/ys7rhuf5 
• 0H: Đổi sao: https://tinyurl.com/yllyso6s 
• 0H: Đổi xu: https://tinyurl.com/ypl34pd6 
• Iphone 14: https://tinyurl.com/ynvemn88 
.
🔥LƯU SỚM VOUCHER BONUS CHO 25-29/10 DÙNG: https://tinyurl.com/ysh7g9qq 
.
🔥MÃ LAZADA NHẬP TAY GIẢM 20K/0Đ KHI THANH TOÁN QUA ZALOPAY: https://tinyurl.com/ykat79h5  (không áp được choice)


`

var updateTime = new Date(); //updateTime
var mgg_dday = document.querySelector('#mgg_dday')
thisDate = updateTime.getDate();
thisMonth = (updateTime.getMonth() + 1)
var dday = 0
if(thisDate == thisMonth){dday = thisDate}else //cùng ngày
if(thisDate + 1 == thisMonth){dday = thisMonth}else //trước 1 ngày
if(thisDate > 0 && thisDate <= 15){dday = 15}else //15 hàng tháng
if(thisDate > 15 && thisDate <= 25){dday = 25} //25 hàng tháng

if (content_dday.length >= 20){
  content_dday = `<h4  class="title-block">🔥 Tiết Lộ Mã Giảm Giá ngày SALE <span style="color:red">${dday}.${thisMonth}</span></h4>` + content_dday
  mgg_dday.style.display = 'block';
  mgg_dday.innerHTML = content_dday.replaceAll('\n', '<br/>')
}

$("#mgg_dday").each(function(){
   $(this).html( $(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a rel="nofollow" target="_blank" href="$1">$1</a> ') );
});

