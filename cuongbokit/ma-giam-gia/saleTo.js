var content_dday = `
THÊM LINK KOL NÈ CẢ NHÀ
📌 Link mã 15k/99K lọc user:

► Link 1 ( 25K/199K ): https://tinyurl.com/2kx57djm 
► Link 2 ( 25K/199K ): https://tinyurl.com/2pcl2kpd 
► Link 3: https://tinyurl.com/2gtf5qde 
► Link 4: https://tinyurl.com/2r3eomvt 
► Link 5: https://tinyurl.com/2nlrq8xd 
► Link 6: https://tinyurl.com/2jg8uu5a 
► Link 7: https://tinyurl.com/2l372wf6 
► Link 8: https://tinyurl.com/2kggarwt 
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

