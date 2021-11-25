document.getElementById('name1').innerText = name1;
document.getElementById('avt1').src = avt1;
document.getElementById('name2').innerText = name2;
document.getElementById('avt2').src = avt2;
document.getElementById('thbao').innerText = loiNoi;
if(ngay.length == 1){ngay = '0'+ngay}
if(thang.length == 1){thang = '0'+thang}
const yourDate = new Date(`${nam}-${thang}-${ngay}T07:00:00`);
var regYoutube = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;  
if (linkYoutube.length >= 5){
  	var innerYoutube = `<iframe style="margin: 0 auto;" width="560" height="315" src="https://www.youtube.com/embed/${linkYoutube.match(regYoutube)[7]}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
  document.getElementById('innerYoutube').innerHTML = innerYoutube;
music = 'link yt'; 
document.addEventListener('DOMContentLoaded', function(){
      var rootTime = document.querySelector("#time");
      document.querySelector("anni").textContent = `${(yourDate.getDate()>9)?yourDate.getDate():"0"+yourDate.getDate()}-${(yourDate.getMonth()>8)?(yourDate.getMonth()+1):"0"+(yourDate.getMonth()+1)}-${yourDate.getFullYear()}`;
      document.querySelector("#date").textContent = Math.floor( Math.floor((new Date() - yourDate) / 1000) / 60 / 60 / 24)+" Ngày";
      function olock() {
            var today = new Date(),
            hrs = (Math.floor( Math.floor((today - yourDate) / 1000) / 60 / 60)) % 24,
            min = (Math.floor( Math.floor((today - yourDate) / 1000) / 60)) % 60,
            sec =  Math.floor((today - yourDate) / 1000) % 60;
            rootTime.textContent = `${(hrs>9)?hrs:"0"+hrs}:${(min>9)?min:"0"+min}:${(sec>9)?sec:"0"+sec}`;
      } olock();
      var timer = setInterval(function(){olock()}, 1000);
      //document.querySelector("audio").setAttribute("src", `chaoem.mp3`);
      document.getElementsByTagName("body")[0].insertAdjacentHTML(
            "beforeend",
            "<div id='mask'></div>"
      );

}, false);
console.log('2021 Share bởi Cuongbok | CuongbokIT - https://cuongbokit.blogspot.com - Tiktok: @cuongbokreal');
