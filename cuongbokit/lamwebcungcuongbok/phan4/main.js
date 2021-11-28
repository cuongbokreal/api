var CuongbokAvt = document.getElementById('avt');
  var CuongbokName = document.getElementById('name');
  var CuongbokNickname = document.getElementById('nickname');
  var CuongbokBio = document.getElementById('bio');
  var CuongbokLinkFb = document.getElementById('linkFb');
  var CuongbokLinkMes = document.getElementById('linkMes');
  var CuongbokLinkTiktok = document.getElementById('linkTiktok');
  
  if(avt.length == 0){avt='https://i.imgur.com/mbQElNp.jpg'}

var listSocial = document.getElementsByClassName('listSocial');
if( linkFb.length == 0){ listSocial[0].style.display = 'none'; listSocial[1].style.width = '50%'; listSocial[2].style.width = '50%'}
if( linkMes.length == 0){ listSocial[1].style.display = 'none'; listSocial[0].style.width = '50%'; listSocial[2].style.width = '50%'}
if( linkTiktok.length == 0){ listSocial[2].style.display = 'none'; listSocial[0].style.width = '50%'; listSocial[1].style.width = '50%'}
  if( linkFb.length == 0 && linkMes.length == 0){listSocial[2].style.width = 'inherit';}
  if( linkMes.length == 0 && linkTiktok.length == 0){listSocial[0].style.width = 'inherit';}
  if( linkTiktok.length == 0 && linkFb.length == 0){listSocial[1].style.width = 'inherit';}
  
  CuongbokAvt.src = avt;
  CuongbokName.innerText = name;
  CuongbokNickname.innerText = nickname;
  CuongbokBio.innerText = bio;
  CuongbokLinkFb.href = linkFb;
  CuongbokLinkMes.href = linkMes;
  CuongbokLinkTiktok.href = linkTiktok;

console.log('2021 Share bởi Cuongbok | CuongbokIT - https://cuongbokit.blogspot.com - Tiktok: @cuongbokreal - FB: //fb.com/cuongbok')
