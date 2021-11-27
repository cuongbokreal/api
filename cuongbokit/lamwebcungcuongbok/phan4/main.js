var CuongbokAvt = document.getElementById('avt');
  var CuongbokName = document.getElementById('name');
  var CuongbokNickname = document.getElementById('nickname');
  var CuongbokBio = document.getElementById('bio');
  var CuongbokLinkFb = document.getElementById('linkFb');
  var CuongbokLinkMes = document.getElementById('linkMes');
  var CuongbokLinkTiktok = document.getElementById('linkTiktok');
  
  if(avt.length == 0){avt='https://i.imgur.com/mbQElNp.jpg'}
  if( linkFb.length == 0){ linkFb ='#'}
  if( linkMes.length == 0){ linkMes ='#'}
  if( linkTiktok.length == 0){ linkTiktok ='#'}

  
  CuongbokAvt.src = avt;
  CuongbokName.innerText = name;
  CuongbokNickname.innerText = nickname;
  CuongbokBio.innerText = bio;
  CuongbokLinkFb.href = linkFb;
  CuongbokLinkMes.href = linkMes;
  CuongbokLinkTiktok.href = linkTiktok;

console.log('2021 Share bởi Cuongbok | CuongbokIT - https://cuongbokit.blogspot.com - Tiktok: @cuongbokreal - FB: //fb.com/cuongbok')
