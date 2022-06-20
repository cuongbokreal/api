var updateTime = new Date(); //updateTime
var today = `${updateTime.getDate()}.${updateTime.getMonth() + 1}`;
document.querySelectorAll('.postTitle')[0].innerHTML += today;
