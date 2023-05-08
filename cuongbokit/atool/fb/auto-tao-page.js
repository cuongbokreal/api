var spinr = require(["SiteData"]).__spin_r;
var spinB = require(["SiteData"]).__spin_b;
var spinT = require(["SiteData"]).__spin_t;
var jazoest = require(["SprinkleConfig"]).jazoest;
var fb_dtsg = require(["DTSGInitialData"]).token;
var uid = require(["CurrentUserInitialData"]).ACCOUNT_ID;
var lsd = require(["LSD"]).token;
var hsi = require(["SiteData"]).hsi;
var namepage = "Cuongbokit.blogspot.com";
var url = "https://www.facebook.com/api/graphql/";
var data = "av=" + uid + "&__user=" + uid + "&__a=1&__req=2s&__hs=19473.HYP%3Acomet_pkg.2.1..2.1&dpr=1&__ccg=GOOD&__rev=" + spinr + "+&__s=q1oivb%3Ajceyva%3Aetcul5&__hsi=" + hsi + "+&__dyn=&__csr=&__comet_req=15&fb_dtsg=" + fb_dtsg + "&jazoest=" + jazoest + "&lsd=" + lsd + "&__aaid=&__spin_r=" + spinr + '&__spin_b=trunk&__spin_t=1682474861&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=CometPageCreateMutation&variables={"input":{"categories":["164886566892249"],"creation_source":"comet","description":"CUONGBOKIT.BLOGSPOT.COM- Chia sẻ kiến thức, tư duy sáng tạo","name":"' + namepage + "%22%2C%22publish%22%3Atrue%2C%22ref%22%3A%22launch_point%22%2C%22actor_id%22%3A%22" + uid + "%22%2C%22client_mutation_id%22%3A%222%22%7D%7D&server_timestamps=true&doc_id=5094699180629920";
fetch(url, {method: "POST", body: data, headers: {"Content-Type": "application/x-www-form-urlencoded"}}).then(response => response.json()).then(data => {
  const successMsg = "Tạo Page: Thành Công!.\nCode By CUONGBOKIT.BLOGSPOT.COM";
  alert(successMsg);
}).catch(error => {
  console.error("erol", error);
});



