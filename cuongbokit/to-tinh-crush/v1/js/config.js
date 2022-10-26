var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
 
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
 
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
  var getInTit = getUrlParameter('introTit');
  var getInDes = getUrlParameter('introDes');
  var getTitle = getUrlParameter('title');
  var getDes = getUrlParameter('des');
  var getQuest = getUrlParameter('quest');
  var getReply = getUrlParameter('reply');
  var getMessLink = getUrlParameter('messlink');
    var getOutTit = getUrlParameter('outroTit');
    var getOutDes = getUrlParameter('outroDes');

if(typeof getOutTit == 'undefined' || getOutTit.length <= 1 || getOutTit == '%20' || getOutTit == '' || getOutTit == ' '){getOutTit = 'Tớ biết mà 🥰. Love you 300.000 😘😘'}
if(typeof getOutDes == 'undefined' || getOutDes.length <= 1 || getOutDes == '%20' || getOutDes == '' || getOutDes == ' '){getOutDes = 'còn giờ thì chờ gì nữa mà không inbox cho tớ đi nào.'}

const CONFIG = {
    introTitle: replaceSpaceFromParam(getInTit),
    introDesc: replaceSpaceFromParam(getInDes),
    btnIntro: 'Oki',
    title: replaceSpaceFromParam(getTitle),
    desc: replaceSpaceFromParam(getDes),
    btnYes: `Đồng ý!`,
    btnNo: `Không`,
    question:replaceSpaceFromParam(getQuest),
    btnReply: 'Gửi',
    reply: replaceSpaceFromParam(getReply),
    mess: replaceSpaceFromParam(getOutTit),
    messDesc: replaceSpaceFromParam(getOutDes),
    btnAccept: 'Okiiiii lun <3',
    messLink: getMess(getMessLink) //link mess của các bạn. VD: https://m.me/nam.nodemy
}
console.log(getMess(getMessLink))
console.log(CONFIG)

var music = getUrlParameter('music');
var musicTheme = document.getElementById('musicTheme');
if(music == 0){musicTheme.autoplay = false}

function replaceSpaceFromParam(c){
    if(typeof c == 'undefined' || c.length < 1){return ''}
    else
    if(c.length >= 1){ return c.replaceAll('+',' ').replaceAll('%20',' ')}
}

function fixValueParam(c){
    if(typeof c == 'undefined' || c.length < 1){
        return ''
    }else{return c}
}
// introTit: Title mới đầu vào
// introDes: Des mới đầu vào

function getMess(c){
    if(c || typeof c !== undefined || c.length > 10){
        return c
    }else{return 'https://cuongbokit.blogspot.com/'}
}


