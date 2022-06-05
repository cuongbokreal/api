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
    introTitle: getInTit,
    introDesc: getInDes,
    btnIntro: 'Oki',
    title: getTitle,
    desc: getDes,
    btnYes: `Đồng ý!`,
    btnNo: `Không`,
    question:getQuest,
    btnReply: 'Gửi',
    reply: getReply,
    mess: 'Tớ biết mà 🥰. Love you 300.000 😘😘',
    messDesc: 'còn giờ thì chờ gì nữa mà không inbox cho tớ đi nào.',
    btnAccept: 'Okiiiii lun <3',
    messLink: getMessLink //link mess của các bạn. VD: https://m.me/nam.nodemy
}


// introTit: Title mới đầu vào
// introDes: Des mới đầu vào
