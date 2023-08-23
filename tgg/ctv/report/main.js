//SETTING
  const tile = 60/100;
  var lang = {
    null_order : 'Chưa có dữ liệu để hiển thị'
  }
  
  //SETUP
  var monthSelect = document.getElementById("monthSelect");
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed

  for (let month = currentMonth; month >= 1; month--) {
    var option = document.createElement("option");
    option.value = month;
    option.textContent = `Tháng ${month}`;
    monthSelect.appendChild(option);
  }
  
  //https://api.accesstrade.vn/v1/order-list?since=2023-08-01T00:00:00Z&until=2023-08-17T00:00:00Z&merchant=
//shopee_kolnew lazada_content tikivn 
  //utm_souce=tgg_ctv&utm_medium=ctv_Cuongbok
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

var ctv = getCookie('username');
if(ctv != null){
    document.getElementById('ctvId').innerHTML = ctv;
  }else{
    window.location.href = `/p/ctv-login.html?next=/p/ctv-report.html`
}

  var optionData = {
    year: currentYear,
    month: currentMonth,
  }
  archiveData = '';
  
  function fetchData(year, month){
    //Setting
    document.querySelector('#loading').style.display = 'block';
    
    var {since: since, until: until} = parseMonth(year, month);
    var shopee = {merchant:'Shopee', billing: 0, pub_commission: 0, total: 0, order_approved: 0, order_pending: 0, order_reject: 0}; 
    var lazada = {merchant:'Lazada', billing: 0, pub_commission: 0, total: 0, order_approved: 0, order_pending: 0, order_reject: 0}; 
    var tiki = {merchant:'Tiki', billing: 0, pub_commission: 0, total: 0, order_approved: 0, order_pending: 0, order_reject: 0}; 
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token NJX0ajmdmDlubnsfBHrvCJQjWIehzXcA");
    var requestOptions = {method: 'GET',headers: myHeaders,redirect: 'follow'};

    fetch(`https://api.accesstrade.vn/v1/order-list?since=${since}&until=${until}&limit=999&utm_source=tgg_ctv&utm_medium=ctv_${ctv}&merchant=`, requestOptions)
      .then(response => response.json())
      .then(data => {
      if(data.total > 0){
        var data = data.data;
        //Fill data for shopee, lazada, tiki
        Object.keys(data).forEach(key => {

          var thisOrder = data[key];
          var pub_commission = thisOrder.pub_commission * tile ;
          if(thisOrder.merchant == 'shopee' || thisOrder.merchant == 'shopee_kolnew'){
            shopee.total += 1;
            shopee.billing += thisOrder.billing;
            shopee.pub_commission += pub_commission ;
            if(thisOrder.order_approved >= 1){shopee.order_approved += pub_commission }else
            if(thisOrder.order_reject >= 1){shopee.order_reject += pub_commission }else
            if(thisOrder.order_pending >= 1){shopee.order_pending += pub_commission }
          }else
          if(thisOrder.merchant == 'lazadacps' || thisOrder.merchant == 'lazada_content' || thisOrder.merchant == 'lazada_kol'){
            lazada.total += 1;
            lazada.billing += thisOrder.billing;
            lazada.pub_commission += pub_commission ;
            if(thisOrder.order_approved >= 1){lazada.order_approved += pub_commission }else
            if(thisOrder.order_reject >= 1){lazada.order_reject += pub_commission }else
            if(thisOrder.order_pending >= 1){lazada.order_pending += pub_commission }
          }else
          if(thisOrder.merchant == 'tikivn'){
            tiki.total += 1;
            tiki.billing += thisOrder.billing;
            tiki.pub_commission += pub_commission ;
            if(thisOrder.order_approved >= 1){tiki.order_approved += pub_commission }else
            if(thisOrder.order_reject >= 1){tiki.order_reject += pub_commission }else
            if(thisOrder.order_pending >= 1){tiki.order_pending += pub_commission }
          }
        })

        //Inner Data
        var fullData = [shopee, tiki, lazada];
        console.log(fullData)
        var content_html = '';
        var total_order = 0;
        var total_commission = 0;
        var total_billing = 0;
        var total_order_approved = 0;
        var total_order_reject = 0;
        var total_order_pending = 0;
        fullData.forEach(obj => {
          total_order += obj.total;
          total_commission += obj.pub_commission;
          total_billing += obj.billing;
          total_order_approved += obj.order_approved;
          total_order_reject += obj.order_reject;
          content_html += `<tr>
                  <td>${obj.merchant}</td>
                  <td>${parseNumber(obj.total)}</td>
                  <!--td>${parseNumber(obj.billing)}</td-->
                  <td>${parseNumber(obj.pub_commission)}</td>
                  <td>${parseNumber(obj.order_approved)}</td>
                  <td>${parseNumber(obj.order_reject)}</td>
                </tr>`;

        });
        content_html += `<tr>
                  <td class="tb_total">Tổng</td>
                  <td class="tb_total">${parseNumber(total_order)}</td>
                  <!--td class="tb_total">${parseNumber(total_billing)}</td-->
                  <td class="tb_total">${parseNumber(total_commission)}</td>
                  <td class="tb_total">${parseNumber(total_order_approved)}</td>
                  <td class="tb_total">${parseNumber(total_order_reject)}</td>
                </tr>`
        document.querySelector('#innerData').innerHTML = content_html;
        document.querySelector('#innerHoaHong').innerHTML = parseNumber(total_commission);
        //document.querySelector('#innerChuyenDoi').innerHTML = parseNumber(total_billing);
      }else{
        console.log('deo co don');
        document.querySelector('#innerData').innerHTML = `<div style="text-align:center">${lang.null_order}</div>`;
        document.querySelector('#innerHoaHong').innerHTML = '0';
        //document.querySelector('#innerChuyenDoi').innerHTML = '0';
      }
      
      document.querySelector('#loading').style.display = 'none';
    })
      .catch(error => console.log('error', error));
  }
  fetchData(optionData.year, optionData.month);
  
  function changeMonth(c){
    optionData.month = c.value;
    fetchData(optionData.year, optionData.month);
  }
  
  function parseMonth(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00Z`;
    };
    return {since: formatDate(firstDay), until: formatDate(lastDay)};
}
  
  function parseNumber(num){
  	return Math.floor(num).toLocaleString('en-US')
  }
  function logout(){
    eraseCookie('username');
    location.href = '/p/ctv-login.html';
  }
