var content_dday = `

Full mã SHOPEE + LAZADA sale  𝟐𝟓.𝟏𝟎 (xem mã khung giờ ở phía dưới)

<b>A.SHOPEE</b>
MÃ SHOPEE, LAZADA 17H NGÀY 25/10:
➖➖➖➖SHOPEE➖➖➖➖
🔥KOL AFFILIATE - MÃ TOÀN SÀN: load trang liên tục - mã back
• 17H: Mã giảm 10K đơn từ 50K
• 17H: Mã giảm 15% tối đa 20K đơn từ 99K
• 17H: Mã giảm 15% tối đa 30K đơn từ 150K
=> Lưu mã tại: https://shorten.asia/MZsq4ke7 

<b>B.LAZADA</b>
➖➖➖➖LAZADA➖➖➖➖
Lazada: back mã Freeship 0Đ: https://tinyurl.com/28xa5qd8
🔥MÃ TOÀN SÀN: đúng giờ load trang lưu mã
• 17H: Mã giảm 50% tối đa 50K đơn từ 0Đ
=> Lưu mã tại: https://shorten.asia/QmbBsDfF 
Dùng điện thoại có thể load trang bằng cách bấm vào mục "VOUCHER CHỚP NHOÁNG 50% 15H - 16H - 17H"
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

