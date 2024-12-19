// ==UserScript==
// @name         sup
// @namespace    http://tampermonkey.net/
// @version      2024-12-19
// @description  try to take over the world!
// @author       You
// @match        https://*.supreme.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=supreme.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('tamper monkey...')


    /*==== SETTING ====*/
    var speed = 1000 //số dương, để tầm 20-50 là nhanh nhất, set càng nhỏ càng thao tác nhanh, càng lag
    var spName = 'Mister Cartoon Work Shirt - Black'; //tên sản phẩm

    var firstSize = ["Medium"] //array chứa các size ưu tiên lấy

    // THÔNG TIN PAYMENT
    var email = 'hello@gmail.com';
    var firstName = 'Nguyen';
    var lastName = 'An';
    var address1 = 'dia chi';
    var city = 'New York';
    var postalCode = '100000';
    var phone = '012314';

    //CARD
    var number = '572502792323523';//card number
    var expiry = '09/25'; //card expiry
    var verification_value = '6858'; //card security code
    var name = 'hiii'; //card name


    /*==== LENH ====*/
    function clickSp(tenSp){
        try{
            //var tenSp = 'Mister Cartoon Work Shirt - Black';
            var targetedSp = document.querySelectorAll('img');
            for(let i=0; i<targetedSp.length; i++){
                var sp = targetedSp[i];
                if(sp.getAttribute('alt').toLowerCase().includes(spName.toLowerCase())){
                    sp.click();
                }
            };
        }
        catch(e){
            //clickSp();
            console.log('reClick')
        }
    }

    var main = setInterval(()=>{
        //==== MAIN ====
        console.log('interval...')
        var url = location.href;
        if(url.includes('us.supreme.com/collections/new')){ //trang chọn sp
            clickSp(spName);
        }else
        if(url.includes('us.supreme.com/checkout')){ //trang checkout
            document.querySelector('#email').value = email;
            document.querySelector('#TextField0').value = firstName; //first name
            document.querySelector('#TextField1').value = lastName;
            document.querySelector('#shipping-address1').value = address1;
            document.querySelector('#TextField3').value = city;
            document.querySelector('#TextField4').value = postalCode;
            document.querySelector('#TextField5').value = phone;


            document.querySelector("#basic-creditCards").click();

            document.querySelector('#number').value = number;
            document.querySelector('#expiry').value = expiry;
            document.querySelector('#verification_value').value = verification_value;
            document.querySelector('#name').value = name;

            document.querySelector('#checkout-pay-button').click()

        }else
        if(url.includes('us.supreme.com/products')){ //trang chọn size
            //lấy thông tin size
            var sizeNodes = document.querySelector('select[name="size"][data-testid="size-dropdown"]').childNodes;
            sizeNodes.forEach(sizeNode => {
                var thisSize = sizeNode.innerText;
                var thisSizeId = sizeNode.getAttribute('value');
                if(firstSize.includes(thisSize)){ //có size mình cần
                    console.log(`Có size ${thisSize}, đang đặt gạch...`)
                    fetch("https://us.supreme.com/cart/add.js", { //fetch bằng api
                        "headers": {
                            "content-type": "application/json",
                        },
                        "body": JSON.stringify({
                            "items": [
                                {
                                    "id": thisSizeId,
                                    "quantity": 1,
                                    "properties": {
                                        "_product_limit": 1,
                                        "_style_limit": 2
                                    }
                                }
                            ]
                        }),
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    })
                    .then(cc => cc.json())
                    .then(data => {
                        if(data.items){ //đặt thành công
                            console.log('Đặt thành công!!!')
                            window.location.href = 'https://us.supreme.com/checkout'; //mở sang trang check out luôn
                        }
                    })
                    .catch(err => {
                        console.log(err) //lỗi mạng từ sever
                    })
                }
            })
        }

    },speed)


})();




/*
url check out: https://us.supreme.com/checkout


remove
fetch("https://us.supreme.com/cart/change.js", {
  "headers": {
    "content-type": "application/json",
  },
  "body": JSON.stringify({
  "id":"42728000913679",
  "quantity":0
  }),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});



add to cart
fetch("https://us.supreme.com/cart/add.js", {
  "headers": {
    "content-type": "application/json",
  },
  "body": JSON.stringify({
    "items": [
        {
            "id": 42728000913679,
            "quantity": 1,
            "properties": {
                "Style": "Black",
                "_style_code": "S47",
                "_product_limit": 1,
                "_style_limit": 2
            }
        }
    ]
}),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});


*/
