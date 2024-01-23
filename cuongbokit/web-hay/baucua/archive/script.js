//dia: https://i.imgur.com/AtUA92A.jpg
//nap: https://i.imgur.com/OuNwS3W.png
//bau: https://i.imgur.com/mlOjbw6.png
 //ca: https://i.imgur.com/bPaBuzH.png
 //cua: https://i.imgur.com/lYgaNdF.png
 //ga: https://i.imgur.com/1Ks7ofX.png
 //huou: https://i.imgur.com/MtPVEZG.png 
 //tom: https://i.imgur.com/WFbCNDN.png
var timeXoc = 3000;

const dataNut = [
  {
    'name': 'Bầu',
    'img': 'https://i.imgur.com/mlOjbw6.png'
  },
  {
    'name': 'Cua',
    'img': 'https://i.imgur.com/lYgaNdF.png'
  },
  {
    'name': 'Tôm',
    'img': 'https://i.imgur.com/WFbCNDN.png'
  },
  {
    'name': 'Cá',
    'img': 'https://i.imgur.com/bPaBuzH.png'
  },
  {
    'name': 'Gà',
    'img': 'https://i.imgur.com/1Ks7ofX.png'
  },
  {
    'name': 'Nai',
    'img': 'https://i.imgur.com/MtPVEZG.png'
  }
]
const cuc1 = document.querySelector("#result1 > img");
const cuc2 = document.querySelector("#result2 > img");
const cuc3 = document.querySelector("#result3 > img");

var lidContainer = document.querySelectorAll('.lid-container')[0];
var napElm = document.querySelector("#nap");
var nanElm = document.querySelector("#nan");
var history = document.querySelector("#history");


function nap(act){
  if(act == 'close'){
    lidContainer.style.transform = 'translate(0px, 0px)';
    napElm.innerText = 'Mở nắp';
    napElm.setAttribute('onclick', 'nap("open")');
  }else
  if(act == 'open'){
    lidContainer.style.transform = 'translate(0px, -300px)';
    napElm.innerText = 'Đóng nắp';
    napElm.setAttribute('onclick', 'nap("close")');
    //hien thi kqua
    var dataKq = napElm.getAttribute('data-kq');
    if(JSON.parse(dataKq.length) > 0){
      var dataKq = JSON.parse(dataKq);
      var history = document.querySelector("#history");
      history.value = `${thisTime()}: ${dataNut[dataKq[0]].name}, ${dataNut[dataKq[1]].name}, ${dataNut[dataKq[2]].name} \n${history.value}`;
      napElm.setAttribute('data-kq', '');
      console.log((dataKq));
    }
  }
}

function nan(){
  //nhấn 1 lần thôi
  nanElm.setAttribute('onclick', '');
  //yêu cầu đóng nắp rồi xóc, ko gian lận nhé :))
  napElm.innerText = 'Đóng nắp';
  napElm.setAttribute('onclick', 'nap("close")');
  napElm.click();
  
  //set empty kqua ở button
  napElm.setAttribute('data-kq', '');
  
  //random
  var kq = [];
  
  for(let i=0; i<3; i++){
    var randomIndex = Math.floor(Math.random() * dataNut.length);
    kq.push(randomIndex);
  }
  console.log(kq);
  //napElm.setAttribute('data-kq', JSON.stringify(kq));
  //Có 3 random rồi thì thêm hiệu ứng rồi set src im thoy
  
  var generatingRandom = setInterval(()=>{
    cuc1.src = dataNut[Math.floor(Math.random() * dataNut.length)].img;
    cuc2.src = dataNut[Math.floor(Math.random() * dataNut.length)].img;
    cuc3.src = dataNut[Math.floor(Math.random() * dataNut.length)].img;
  },75)
  setTimeout(()=>{
    clearInterval(generatingRandom)
    cuc1.src = dataNut[kq[0]].img;
    cuc2.src = dataNut[kq[1]].img;
    cuc3.src = dataNut[kq[2]].img;
    napElm.setAttribute('data-kq', JSON.stringify(kq));
    nanElm.setAttribute('onclick', 'nan()');
    if(document.querySelector("#nap").getAttribute('onclick') == 'nap("close")'){ //đang mở nắp
      var history = document.querySelector("#history");
      history.value = `${thisTime()}: ${dataNut[kq[0]].name}, ${dataNut[kq[1]].name}, ${dataNut[kq[2]].name} \n${history.value}`;
      napElm.setAttribute('data-kq', '');
    }
  }, timeXoc)
  
}


function thisTime() {
  const now = new Date();

  // Lấy giờ, phút, giây
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  // Lấy ngày, tháng, năm
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = now.getFullYear().toString().slice(2); // Lấy hai chữ số cuối của năm

  // Tạo chuỗi định dạng
  const formattedDateTime = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;

  return formattedDateTime;
}


var bau = "https://i.imgur.com/mlOjbw6.png"
var ca = "https://i.imgur.com/bPaBuzH.png"
var cua = "https://i.imgur.com/lYgaNdF.png"
var ga = "https://i.imgur.com/1Ks7ofX.png"
var huou = "https://i.imgur.com/MtPVEZG.png" 
var tom = "https://i.imgur.com/WFbCNDN.png"

