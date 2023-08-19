    var cookieUser = getCookie('username');
  if(cookieUser != null){
    window.location.href = '/p/ctv-report.html';
  }else{
    console.log('Chưa đăng nhập');
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
// Initialize Firebase App
firebase.initializeApp(firebaseConfig);
firebase.analytics();
  
  
	var getThbao = document.querySelector("#thbao");
	var getSubmit = document.querySelector("#submit");
  

var userData = firebase.database().ref('users/anhkoxinh');
  userData.on('value', (snapshot) => {
    const data = snapshot.val();
    if(data === null){
      console.log('cc')
    }else{console.log(JSON.parse(JSON.stringify(data)))}
});
 
function writeUserData(name, email, sdt, username, password){
  var updateTime = new Date(); //updateTime
  var timeSigup = `${updateTime.getFullYear()}-${addZero(updateTime.getMonth() + 1)}-${addZero(updateTime.getDate())}`;
  var userId = ('00' + 4).slice(-3);
  firebase.database().ref('users/' + username).set({
        name: name,
        email: email,
        sdt: sdt,
        username: username,
        password: password,
        sigupTime: timeSigup,
        verification: 0,
        avt : `https://avatars.abstractapi.com/v1/?api_key=8a314bbcb61e421cb964506cda5772e3&name=${name}`
  });
}

  function createAcc(){
    console.log("Hàm createAcc đã được gọi");
    getThbao.innerText = '';
    var getName = document.querySelector("#name").value;
    var getEmail = document.querySelector("#email").value;
    var getSdt = document.querySelector("#sdt").value;
    var getUsername = document.querySelector("#username").value;
    var getPassword = document.querySelector("#password").value;
    var getRepassword = document.querySelector("#repassword").value;
    
    if(getName.length != 0 && getEmail != 0 && getSdt != 0 && getUsername != 0 && getPassword != 0 && getRepassword != 0){
      //Nhập đầy đủ thông tin
      if(getUsername.match(/\s/g)){
        //Nếu tk chứa dấu space
        getThbao.innerText = 'Tên đăng nhập không được chứa dấu cách';
      }else{
        if(getUsername.length >= 6){
          //Nếu tk length >= 6
          if(getPassword.length >= 6){
            //Nếu mật khẩu dài hơn 6
            var checkUser = firebase.database().ref(`users/${getUsername}`)
            checkUser.on('value', (snapshot) => {
              let data = snapshot.val();
              if(data === null){
                //Tài khoản unique, có thể đăng kí được
                if(getPassword === getRepassword){
                  //Nhập lại mật khẩu đúng, nhập dữ liệu zo database
                  writeUserData(getName, getEmail, getSdt, getUsername, getPassword);
                  getThbao.innerHTML = 'Đăng kí thành công, đăng nhập <a href="/p/ctv-login.html">tại đây</a>';
                  document.getElementById('main-form').innerHTML = '';
                }else{
                  getThbao.innerText = 'Mật khẩu không trùng khớp';
                }
              }
            });
          }else{
            getThbao.innerText = 'Mật khẩu phải dài hơn 6 kí tự';
          }
        }else{
          getThbao.innerText = 'Tên đăng nhập phải dài hơn 6 kí tự';
        }
      }
    }else{
      getThbao.innerText = 'Nhập đầy đủ thông tin';
    }
  }
  
  /*
  getSubmit.addEventListener("click", () => {
    getThbao.innerText = '';
    var getName = document.querySelector("#name").value;
    var getEmail = document.querySelector("#email").value;
    var getSdt = document.querySelector("#sdt").value;
    var getUsername = document.querySelector("#username").value;
    var getPassword = document.querySelector("#password").value;
    var getRepassword = document.querySelector("#repassword").value;
    
    if(getName.length != 0 && getEmail != 0 && getSdt != 0 && getUsername != 0 && getPassword != 0 && getRepassword != 0){
      //Nhập đầy đủ thông tin
      if(getUsername.match(/\s/g)){
        //Nếu tk chứa dấu space
        getThbao.innerText = 'Tên đăng nhập không được chứa dấu cách';
      }else{
        if(getUsername.length >= 6){
          //Nếu tk length >= 6
          if(getPassword.length >= 6){
            //Nếu mật khẩu dài hơn 6
            var checkUser = firebase.database().ref(`users/${getUsername}`)
            checkUser.on('value', (snapshot) => {
              let data = snapshot.val();
              if(data === null){
                //Tài khoản unique, có thể đăng kí được
                if(getPassword === getRepassword){
                  //Nhập lại mật khẩu đúng, nhập dữ liệu zo database
                  writeUserData(getName, getEmail, getSdt, getUsername, getPassword);
                  getThbao.innerHTML = 'Đăng kí thành công, đăng nhập <a href="/p/login.html">tại đây</a>';
                  document.getElementById('main-form').innerHTML = '';
                }else{
                  getThbao.innerText = 'Mật khẩu không trùng khớp';
                }
              }
            });
          }else{
            getThbao.innerText = 'Mật khẩu phải dài hơn 6 kí tự';
          }
        }else{
          getThbao.innerText = 'Tên đăng nhập phải dài hơn 6 kí tự';
        }
      }
    }else{
      getThbao.innerText = 'Nhập đầy đủ thông tin';
    }
    
  })
  
  */
  
  function addZero(c){
  if(c.toString().length === 1){
    return `0${c}`;
  }else
  if(c.toString().length >= 1){
    return c
  }
}
  
  //writeUserData('Nguyễn Ngọc Cường', 'ngcuongbok109@gmail.com', '2005-09-10', 'https://fb.com/cuongbok', 'cuongbok', '0904900438')
