1. Trước tiên cần import thư viện prism để highlight màu code
<link href="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/themes/prism.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/prism.js"></script>

<link href="https://cuongbokreal.github.io/api/cuongbokit/tien-ich/khung-chua-code/main.css" rel="stylesheet">
<script src="https://cuongbokreal.github.io/api/cuongbokit/tien-ich/khung-chua-code/main.js"></script>


2. Form khung code:
<div class="cbi-khung-code" ondblclick="selectAllText()">
  <pre><code class="language-html">&lt;p&gt;Đây là nội dung bạn muốn hiển thị trong khung chứa.&lt;/p&gt;</code></pre>
  <pre><code class="language-css">.cbi-khung-code { background-color: #f7f7f7; }</code></pre>
  <pre><code class="language-javascript">function copyToClipboard() { /* ... */ }</code></pre>
  <button class="cbi-copy-button" onclick="copyToClipboard()">Copy Nội Dung</button>
</div>


3. JS prism
// Tô màu mã nguồn sau khi tải trang
Prism.highlightAll();

4. Function copy:
copyToClipboard(elmQuery) 

elmQuery = querySelector
vd: copyToClipboard('.cbi-khung-code')
