var goiY = document.querySelectorAll('.app-tooltip > div > div')

var kqZone = `
<link href="https://cuongbokreal.github.io/api/cuongbokit/vuot-chuong-ngai-vat-nghien-vl/menu.css" rel="stylesheet"/>

<div id="kq">
  <div id="hamburger" class="close">
    <span></span>
    <span></span>
    <span></span>  
  </div>
  <div id="nav" class="visible">
    <ul>
	<div id="kqZone"></div>
    </ul>
  </div>
</div>
<style>
#actKq{position:fixed; bottom:0; right:0;}
#kqZone{position:fixed; top:0; right:0; max-width:100%;}
#kq{position:fixed; top:0; right:0; max-width:100%;}
</style>

<script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
`;
document.body.innerHTML += kqZone;
var getKqZone = document.getElementById('kqZone');

function ketqua(){
	var iframeKq = `<iframe height="800px" width="100%" src="https://m.coccoc.com/search?query=${goiY[0].innerText}"/>`;
    getKqZone.innerHTML = iframeKq
}

$(function () {
  $('#hamburger').on('click', function () {
    $(this).toggleClass('close');
    $('#nav').toggleClass('visible');
  });
});

ketqua()
