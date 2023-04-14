var content_dday = `
2. LAZADA:
🚛MIỄN PHÍ VẬN CHUYỂN:
• Lưu mã Freeship giảm 15K/29K, 50K//300K + Freeship 25K/69K lọc user tại: https://tinyurl.com/235ffm4z
• Lưu mã Freeship 20K/20K hoặc 20K/29K tại: https://tinyurl.com/2y6udkok
.
🔥MÃ HOÀN TIỀN MAX: đúng giờ load trang lưu mã
• 0H, 12H, 20H: Mã hoàn 50% tối đa 100K đơn từ 0Đ(?)
• 0H: Mã hoàn 12% tối đa 50K, 8% tối đa 100K(?)
• 0H: Mã hoàn 50% tối đa 30K đơn từ 59K lọc user
=> Lưu mã tại: https://tinyurl.com/28s7qfuw hoặc tại: https://tinyurl.com/2cllstfk
.
🔥MÃ TOÀN SÀN: đúng giờ load trang lưu mã, đã hiện sẵn
• 0H, 12H, 20H: Mã giảm 100K đơn từ 150K
• Mã giảm 50K/499K, 35K/339K, 25K/249K, 20K, 15K, 10K, 15%, 10%, 8%,...(tùy user)
=> Lưu mã tại: https://tinyurl.com/2cqbpv45
.
🔥0H: VOUCHER TÍCH LŨY GIẢM ĐẾN 400K:
• Lưu tích lũy + làm nhiệm vụ tại: https://tinyurl.com/2877l5cm
• Lưu thêm tích luỹ dưới sản phẩm https://tinyurl.com/25ykpjxc
=> Thu thập hàng ngày, dùng được từ ngày 15-17/4
.
🔥9H: MÃ NGâN HÀNG: còn back vào 12H
=> Lưu mã tại: https://tinyurl.com/26lfnqwn
.
🔥9H, 12H: MÃ ZALOPAY GIẢM 10K/299K + VNPT GIẢM 20K/40K: mã back
=> Lưu mã tại: https://tinyurl.com/2awlqw4l
.
🔥0H, 12H, 20H: DEAL TRỢ GIÁ - LAZFLASH:
=> Xem chi tiết tại: https://tinyurl.com/26cwwkqz
.
🔥CÁC BANNER KOL CÓ THỂ LÊN MÃ TOÀN SÀN BẤT NGỜ:
📌Các link thường lên mã nhập tay:
• Eco: https://tinyurl.com/22uy33fs
• HL: https://tinyurl.com/279upluo
• Badi: https://tinyurl.com/23vpxxj4
• HT: https://tinyurl.com/23t63u47
• Chloe: https://tinyurl.com/236tfm7x
• Trang: https://tinyurl.com/27e3nf5f
.
📌Các link thường lên mã lưu(canh mỗi tiếng 1 lần): từ phút 55-00
• Viettel: https://tinyurl.com/2cxsokr3
• Vina: https://tinyurl.com/2y2frebc
• Mobi: https://tinyurl.com/28x68ahy
• New: https://tinyurl.com/26u5ts6a
• Shopiness: https://tinyurl.com/2cllstfk
• Chloe: https://tinyurl.com/236tfm7x
• Mai: https://tinyurl.com/2cav6kjg
.
🔥MỘT SỐ BANNER SALE LƯU THÊM MÃ KHÁC:
• Sale chính hãng: https://tinyurl.com/2xwaewh9
• Voucher tích lũy 400k: https://tinyurl.com/2877l5cm
• Freeship max: https://tinyurl.com/28yk2b44
• Cashback max: https://tinyurl.com/2dhh3bto
• Ưu đãi nhiều tầng: https://tinyurl.com/23vzpbdd
• Siêu tiệc thương hiệu: https://tinyurl.com/2745kupn
• Top bán chạy: https://tinyurl.com/2xu8c8pv
• Lazxanh: https://tinyurl.com/2alzhu7b
• Điện gia dụng: https://tinyurl.com/24b73ekn
• Điện thoại công nghệ: https://tinyurl.com/27gcr5uh
• Sức khỏe, làm đẹp: https://tinyurl.com/2888bh9l
• Bách hóa, mẹ bé: https://tinyurl.com/22jb8jf8
• Đẳng cấp xế xịn: https://tinyurl.com/23sm93d4
• Nhà sang bếp xịn: https://tinyurl.com/27w4nv6b
• Thời trang nữ: https://tinyurl.com/24rr9uyg
• Thời trang nam: https://tinyurl.com/2bh5s6on
.
🔥MÃ GIẢM 30K/30K + FREESHIP 20K, 50K CHO NGƯỜI MỚI: https://tinyurl.com/26v77qx5
.
🔥SẢN PHẨM DÙNG THỬ 9K, X9K: https://tinyurl.com/26psd523
.
🔥0H: Đổi xu: https://tinyurl.com/27ll43bf
.
🔥0H: Đổi sao: https://tinyurl.com/22958t5o
.
🔥0H: Đổi Gems lấy quà 0Đ: https://tinyurl.com/29bhhpdm

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

