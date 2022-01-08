var inputKq = document.createElement('input');
inputKq.id = 'inputKq';
inputKq.style.display = 'none';
document.body.append(inputKq);

var getChip = document.getElementsByClassName('chip');
let kqChip = "";
for(let i=0; i< getChip.length; i++){
	kqChip += `<a class="chip" alt="${getChip[i].innerText}" title="${getChip[i].innerText}" data-href="/search?q=${getChip[i].innerText}" href="/search?q=${getChip[i].innerText}" target="_blank">${getChip[i].innerText}</a>`
}
inputKq.value = kqChip;

var copyText = document.getElementById("inputKq");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        console.log("Copied the html: " + copyText.value);
