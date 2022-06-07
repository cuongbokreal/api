if (document.querySelectorAll('.itemThumbnail > a > div') != null){
  var elm_thumbnail = document.querySelectorAll('.itemThumbnail > a > div')
  if(elm_thumbnail.length >= 6){
    function replaceThumbnail(){
      for(let i=0; i<elm_thumbnail.length;i++){
        elm_thumbnail[i].style.background = `url(${elm_thumbnail[i].getAttribute('data-bg').replaceAll('=s72-', '=s260-').replaceAll(/-c$/g,'-a-k-no-nu')})`;
      }
    };
    setTimeout(replaceThumbnail,3000)
  }
}


/*

var elm_thumbnail = document.querySelectorAll('.itemThumbnail > a > div')
for(let i=0; i<elm_thumbnail.length;i++){
      elm_thumbnail[i].style.background = `url(${elm_thumbnail[i].getAttribute('data-bg').replaceAll('=s72-', '=s260-').replaceAll('-c','-a-k-no-nu')})`;
}
  
  
  
 if(elm_thumbnail[i].getAttribute('data-bg').match(/blogger\.googleusercontent\.com/g)){
          elm_thumbnail[i].style.background = `url(${elm_thumbnail[i].getAttribute('data-bg').replaceAll('=s72-', '=s260-').replaceAll('-c','-a-k-no-nu')})`;
}
  */
