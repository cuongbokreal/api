  // --- BƯỚC 1: KHAI BÁO DỮ LIỆU ---
  // Bạn sửa nội dung câu hỏi và trả lời tại đây
  const faqData = [
    {
      question: "Tạo QR bị lỗi hoặc không hiện tt thành công?",
      answer: "Đừng lo bạn hãy inbox cho page Cuongbokreal (link ở bên dưới) gửi billck hoặc donate ID để mình tạo bù cho nha"
    },
    {
      question: "Quét QR xong không nghe được nhạc?",
      answer: "Khuyến cáo bạn mở bằng Chrome hoặc Safari để có chất lượng và đầy đủ các tính năng nha"
    }
  ];

  // --- BƯỚC 2: RENDER HTML VÀO DIV ---
  const container = document.querySelector('.faq-container');
  let htmlString = '';

  // Duyệt qua từng mục dữ liệu để tạo chuỗi HTML
  faqData.forEach(item => {
    htmlString += `
      <div class="faq-item">
        <button class="faq-question">${item.question}</button>
        <div class="faq-answer">
          <p>${item.answer}</p>
        </div>
      </div>
    `;
  });

  // Inner toàn bộ chuỗi HTML vào container
  container.innerHTML = htmlString;

  // --- BƯỚC 3: XỬ LÝ CLICK ---
  container.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('faq-question')) {
      const btn = e.target;
      
      btn.classList.toggle("active");

      const panel = btn.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
  });
