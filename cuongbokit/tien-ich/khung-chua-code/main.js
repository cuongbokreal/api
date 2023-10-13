function copyToClipboard(elmQuery) {
        const textToCopy = document.querySelector(elmQuery).textContent;
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        console.log('Nội dung đã được sao chép vào clipboard.');
}
