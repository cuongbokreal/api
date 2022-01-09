var getTopic = document.getElementsByClassName('title');
let ketQua ="";
for(let i=0; i<getTopic.length; i++){
ketQua +=`${getTopic[i].innerText}
`;
}
console.log(ketQua);
