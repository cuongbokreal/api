var getChip = document.getElementsByClassName('chip');
let kqChip = "";
for(let i=0; i< getChip.length; i++){
	kqChip += `<a class="chip" alt="${getChip[i].innerText}" title="${getChip[i].innerText}" href="/search?q=${getChip[i].innerText}" target="_blank">${getChip[i].innerText}</a>`
}

console.log(kqChip)
