var cookieUser = getCookie('username');
  if(cookieUser != null){
    document.getElementById('main-form').innerHTML = `<p>Xin chào ${getCookie('username')}, bạn có muốn <a href="#" onclick="logout()">đăng xuất</a>?</p>`;
    //window.location.href = '/p/ctv-report.html';
  }else{
    console.log('Chưa đăng nhập');
  }
  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;
      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');
          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
  };
var next = getUrlParameter('next');

if(typeof next != 'undefined' && next.length >= 9){next = next}else{
  next = `/p/ctv-report.html`;
}
  
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaZdi-_M9yN9d_kFBv1FBTs03ifASOzfA",
  authDomain: "trumgiamgia.firebaseapp.com",
  databaseURL: "https://trumgiamgia-default-rtdb.firebaseio.com",
  projectId: "trumgiamgia",
  storageBucket: "trumgiamgia.appspot.com",
  messagingSenderId: "847348910930",
  appId: "1:847348910930:web:2b313fb8051d8d95dfc88b",
  measurementId: "G-J3E3VC8HGG"
};
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
var getThbao = document.querySelector("#thbao");
var getSubmit = document.querySelector("#submit");
  


  getSubmit.addEventListener("click", () => {
    getThbao.innerText = '';
    var getUsername = document.querySelector("#username").value;
    var getPassword = document.querySelector("#password").value;
    
    if(getUsername.length != 0 && getPassword != 0){
      var userData = firebase.database().ref('users/' + getUsername);
      userData.on('value', (snapshot) => {
        const data = snapshot.val();
        if(data === null){
          //Không tìm thấy ID
          getThbao.innerText = 'Tên đăng nhập hoặc mật khẩu không đúng';
        }else{
          if(getPassword === data.password){
            setCookie('username', getUsername, 30);
            getThbao.innerText = 'Đăng nhập thành công!';
            console.log('login thành công');
            window.location.href = next;
          }else{
            getThbao.innerText = 'Mật khẩu sai';
          }
        }
      })
    }else{
      getThbao.innerText = 'Nhập đầy đủ thông tin';
    }
    
})

function logout(){
  eraseCookie('username');
  location.reload();
}
  //writeUserData('Nguyễn Ngọc Cường', 'ngcuongbok109@gmail.com', '2005-09-10', 'https://fb.com/cuongbok', 'cuongbok', '0904900438')
