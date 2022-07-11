
(function () {
  
  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;
      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');
          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
};
  //2018-07-22

  var getDay = getUrlParameter('day');
  var getName = getUrlParameter('name');
  var regDay = getDay.match(/[0-9]{2}/g);
  
  document.getElementById('name').innerText = `${getName}`;
  document.getElementById('headline').innerText += ` ${regDay[3]}/${regDay[2]}`;
    
  const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it
  let today = new Date(),
  dd = String(today.getDate()).padStart(2, "0"),
  mm = String(today.getMonth() + 1).padStart(2, "0"),
  yyyy = today.getFullYear(),
  nextYear = yyyy + 1,
  dayMonth = `${regDay[2]}/${regDay[3]}/`,
  birthday = dayMonth + yyyy;

  today = mm + "/" + dd + "/" + yyyy;
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }
  //end

  const countDown = new Date(birthday).getTime(),
  x = setInterval(function () {

    const now = new Date().getTime(),
    distance = countDown - now;

    document.getElementById("days").innerText = Math.floor(distance / day),
    document.getElementById("hours").innerText = Math.floor(distance % day / hour),
    document.getElementById("minutes").innerText = Math.floor(distance % hour / minute),
    document.getElementById("seconds").innerText = Math.floor(distance % minute / second);

    //do something later when date is reached
    if (distance < 0) {
      let params = (new URL(document.location)).searchParams;
      params.get('name');
      params.get('day');
      params.get('yt');
      params.get('content');
      
      document.getElementById("headline").innerHTML = `Hôm nay là sinh nhật của <span id="name">${getName}</span>`;
      document.getElementById("countdown").style.display = "none";
      document.getElementById("content").style.display = "block";
      
      clearInterval(x);
    }
    //seconds
  }, 0);
})();
//# sourceURL=pen.js
