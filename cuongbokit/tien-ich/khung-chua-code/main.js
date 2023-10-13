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
function selectAllText() {
    const contentContainer = document.querySelector('.content-container');

    // Kiểm tra xem có nội dung nào trong khung chứa không
    if (contentContainer) {
        const range = document.createRange();
        range.selectNodeContents(contentContainer);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
