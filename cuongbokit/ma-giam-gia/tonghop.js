var api_mgg_content = `

🔥 Gửi trước cả nhà chương trình Shopee lúc 0H nhé.
.
⭐️ 1. Thứ 4 hàng tuần –  Siêu Sale Freeship trên Shopee: https://shorten.asia/fpnvBnUB     
► 0h: Lưu trên banner 1 Mã Freeship 15K đơn từ 0Đ và 3 mã Freeship 25K đơn từ 100k toàn sàn Shopee (back thêm lượt lúc 9H, 12H, 21H): https://shorten.asia/fpnvBnUB  
► 0h: 2610GIAM50K1 giảm 5% tối đa 50K đơn từ 350k toàn sàn Shopee. List sản phẩm áp mã: https://shorten.asia/1VcVrKqW  
► 0h: BATREND30KT4FSD4 giảm 8% tối đa 30K đơn từ 200k cho list sản phẩm bắt trend giá sốc: https://shorten.asia/cn3VaTSV  
► 9H: 2610BATNGOTHU4 Giảm 20K cho Đơn từ 99K toàn sàn Shopee (mã sẽ back thêm lượt lúc 15H và 18H). List sản phẩm áp mã: https://shorten.asia/Hp2p6c2c  
► 15h: Lưu trước trên banner mã giảm 10K đơn từ 0đ toàn sàn Shopee (sử dụng lúc 17H)
► 15h30: Lưu trước trên banner mã giảm 20K đơn từ 0đ toàn sàn Shopee (sử dụng lúc 17H)
► 16h: Lưu trước trên banner mã giảm 30K đơn từ 0đ toàn sàn Shopee (sử dụng lúc 17H)
► 16h30: Lưu trước trên banner mã giảm 50K đơn từ 0đ toàn sàn Shopee (sử dụng lúc 17H)
.
⭐️ 2. Săn Sale Cùng KOL: https://shorten.asia/UQh2Khmu      
► Lưu trước trên banner tại link này https://shorten.asia/UQh2Khmu  dùng lúc 0H ngày 26/10 mã giảm 30K đơn từ 150k toàn sàn shopee.
► Lưu trước trên banner tại link này https://shorten.asia/UQh2Khmu  dùng lúc 0H ngày 26/10 mã giảm 5% tối đa 50K đơn từ 350k toàn sàn shopee.
► Lưu trước trên banner tại link này https://shorten.asia/UQh2Khmu  dùng lúc 0H ngày 26/10 mã giảm 6% tối đa 200K đơn từ 400k toàn sàn shopee.
► Lưu trước trên banner tại link này https://shorten.asia/UQh2Khmu  dùng lúc 0H ngày 26/10 mã giảm 6% tối đa 100K đơn từ 0đ toàn sàn shopee.
.
⭐️ 3. Siêu Sale Voucher: https://shorten.asia/ZCAZGmyk       
► Lưu trước trên banner tại link này https://shorten.asia/ZCAZGmyk  dùng lúc 0H ngày 26/10 mã giảm 44K đơn từ 44k toàn sàn shopee. List sản phẩm áp mã: https://shorten.asia/rmVGBUcC  
► Lưu trước trên banner tại link này https://shorten.asia/ZCAZGmyk  dùng lúc 0H ngày 26/10 mã giảm 20K đơn từ 99k toàn sàn shopee. List sản phẩm áp mã: https://shorten.asia/QA1J9Ndr 

`

document.getElementById('tonghop').innerHTML = api_mgg_content.replaceAll('\n', '<br/>');
  
$("#tonghop").each(function(){
   $(this).html( $(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a rel="nofollow" target="_blank" href="$1">$1</a> ') );
});

