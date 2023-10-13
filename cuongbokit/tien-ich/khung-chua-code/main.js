function copyToClipboard() {
        const textToCopy = document.querySelector('.cbi-khung-code').textContent;
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        alert('Nội dung đã được sao chép vào clipboard.');
}
