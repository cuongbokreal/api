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
    mess: 'Tớ biết mà 🥰. Love you 300.000 😘😘',
    messDesc: 'còn giờ thì chờ gì nữa mà không inbox cho tớ đi nào.',
    btnAccept: 'Okiiiii lun <3',
    messLink: getMessLink //link mess của các bạn. VD: https://m.me/nam.nodemy
}

var music = getUrlParameter('music');
var musicTheme = document.getElementById('musicTheme');
if(music == 0){musicTheme.setAttribute('autoplay', 'false')}

function replaceSpaceFromParam(c){
    return c.replaceAll('+',' ').replaceAll('%20',' ')
}
// introTit: Title mới đầu vào
// introDes: Des mới đầu vào
