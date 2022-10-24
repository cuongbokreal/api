var content_saleTo = ``

var updateTime = new Date(); //updateTime
var mgg_saleTo = document.querySelector('#mgg_saleTo')
thisDate = updateTime.getDate()
if (thisDate == 15 || thisDate == 25 || thisDate = (updateTime.getMonth() + 1)){
  mgg_saleTo.style.display = 'block';
  mgg_saleTo.innerHTML = content_saleTo.replacaAll('\n', '<br/>')
}

