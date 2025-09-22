(function() {
  const host = document.getElementById('coze-area');
  
  // TODO: Thay bằng mã nhúng Coze chính thức nếu có SDK/script:
  // <script src="https://coze..."></script> rồi init vào host
  
  // Check for query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');
  
  host.innerHTML = `
    <p><strong>Chưa cấu hình Coze AI.</strong></p>
    ${query ? `<p><em>Câu hỏi được chuyển: "${decodeURIComponent(query)}"</em></p>` : ''}
    <ol>
      <li>Thêm script nhúng của Coze (theo tài liệu Coze).</li>
      <li>Gán BOT_ID/API_KEY và gọi init để render widget trong #coze-area.</li>
      <li>Truyền query mặc định qua param ?q=...</li>
    </ol>
    <p><strong>Hướng dẫn tích hợp Coze AI:</strong></p>
    <ul style="text-align:left;max-width:600px;">
      <li>Đăng ký tài khoản tại <a href="https://coze.com" target="_blank">coze.com</a></li>
      <li>Tạo bot và lấy Bot ID</li>
      <li>Nhúng widget hoặc sử dụng API để tích hợp</li>
      <li>Cấu hình bot với kiến thức về tư tưởng Hồ Chí Minh</li>
    </ul>
  `;
})();
