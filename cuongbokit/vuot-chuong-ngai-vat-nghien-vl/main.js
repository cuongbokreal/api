var goiY = document.querySelectorAll('.app-tooltip > div > div')

var kqZone = `
<link href="https://cuongbokreal.github.io/api/cuongbokit/vuot-chuong-ngai-vat-nghien-vl/menu.css" rel="stylesheet"/>
<div id="kq">
<a href="#" id="actKq" onclick="actKq('off')">Tắt</a>

<div class="wrapper">
  <!-- First mobile menu design -->
  <div class="section sectionOne">
    <div class="mobile">
      <div class="hamburger-menu">
          <div class="bar"></div>	
      </div>
    </div>  

  <div class="mobile-nav hide">
    <ul>
      <div id="kqZone"></div>
    </ul>
  </div>
</div>
</div>
<style>
#actKq{position:fixed; bottom:0; right:0;}
#kqZone{position:fixed; top:0; right:0; max-width:25%;}
</style>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
      <script id="rendered-js" >
(function () {
  $('.hamburger-menu').on('click', function () {
    $('.bar').toggleClass('animate');
    var mobileNav = $('.mobile-nav');
    mobileNav.toggleClass('hide show');
  });
})();
</script>
`;
document.body.innerHTML += kqZone;

var getKqZone = document.getElementById('kqZone');

function ketqua(){
	var iframeKq = `<iframe height="800px" width="100%" src="https://m.coccoc.com/search?query=${goiY[0].innerText}"/>`;
    getKqZone.innerHTML = iframeKq
}

function actKq(x){
	if(x == 'on'){
      getKqZone.style.display = 'block';
      actKq.onclick = actKq('off');
      actKq.innerText = 'Tắt';
    }else
    if(x == 'off'){
      getKqZone.style.display = 'none';
      actKq.onclick = actKq('on');
      actKq.innerText = 'Bật';
    }
}
console.log(goiY.length)
ketqua()
