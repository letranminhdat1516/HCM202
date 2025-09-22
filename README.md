# HCM202+ - Đạo đức & Văn hóa trong tư tưởng Hồ Chí Minh

## 📋 Mô tả dự án

Website học tập về tư tưởng Hồ Chí Minh, bao gồm 6 trang chính:
1. **Trang chủ** - Cuộc đời và giá trị đạo đức vĩ đại của Hồ Chủ tịch
2. **Theory** - Kiến thức cơ bản với trích dẫn và nguồn tham khảo
3. **Chat** - Chatbot AI (placeholder cho Coze AI)
4. **Quiz** - Câu hỏi trắc nghiệm từ Open Trivia Database
5. **Cases** - Tình huống thực tế và cam kết đạo đức
6. **Summary** - Tổng kết khóa học

## 🚀 Cách chạy dự án

### Phương pháp 1: Live Server (VS Code)
1. Mở thư mục `hcm202` trong VS Code
2. Cài đặt extension "Live Server"
3. Click chuột phải vào `pages/index.html` → "Open with Live Server"
4. Website sẽ mở tại `http://localhost:5500/pages/index.html`

### Phương pháp 2: Python HTTP Server
```bash
cd hcm202
python -m http.server 8000
```
Mở trình duyệt: `http://localhost:8000/pages/index.html`

### Phương pháp 3: Node.js http-server
```bash
npm install -g http-server
cd hcm202
http-server
```

## 🏗️ Cấu trúc dự án

```
hcm202/
├─ assets/          # Tài nguyên (ảnh, font)
├─ components/      # Header, footer dùng chung
├─ css/            # Stylesheets theo từng trang
├─ data/           # JSON data (nguồn, trích dẫn, tình huống)
├─ js/             # JavaScript modules
├─ pages/          # Các trang HTML chính
└─ README.md       # Hướng dẫn này
```

## 🔧 Các tính năng

### ✅ Đã hoàn thành
- [x] Cấu trúc đa trang với header/footer tái sử dụng
- [x] Responsive design với CSS Grid/Flexbox
- [x] Trang kiến thức với trích dẫn và footnotes
- [x] Quiz tương tác sử dụng Open Trivia API
- [x] Hệ thống tình huống thực tế với search
- [x] Cam kết đạo đức lưu trong localStorage
- [x] Navigation active state tự động

### 🔄 Cần cấu hình thêm
- [ ] Tích hợp Coze AI chatbot (cần Bot ID và API key)
- [ ] Thêm ảnh minh họa vào thư mục `assets/img/`
- [ ] Customize font chữ trong `assets/fonts/`

## 🤖 Hướng dẫn tích hợp Coze AI

1. Đăng ký tài khoản tại [coze.com](https://coze.com)
2. Tạo bot và lấy Bot ID
3. Sửa file `js/chat.js`:
   ```js
   // Thay thế placeholder bằng mã nhúng chính thức của Coze
   // Ví dụ:
   const cozeWidget = new CozeWidget({
     botId: 'YOUR_BOT_ID',
     container: '#coze-area'
   });
   ```

## 📝 Tùy chỉnh nội dung

### Chỉnh sửa dữ liệu
- **Nguồn tham khảo**: `data/sources.json`
- **Trích dẫn**: `data/quotes.json`  
- **Tình huống**: `data/cases.json`

### Thêm trang mới
1. Tạo file HTML trong `pages/`
2. Tạo CSS riêng trong `css/`
3. Thêm JavaScript nếu cần trong `js/`
4. Cập nhật menu trong `components/header.html`

## 🎨 Customization

### Thay đổi màu sắc
Sửa CSS variables trong `css/base.css`:
```css
:root {
  --bg: #ffffff;      /* Nền chính */
  --fg: #111;         /* Chữ chính */
  --muted: #666;      /* Chữ phụ */
  --brand: #0a7;      /* Màu thương hiệu */
  --card: #f7f7f7;    /* Nền card */
}
```

### Responsive breakpoints
- Desktop: > 900px
- Mobile: ≤ 900px

## 🛠️ Troubleshooting

### Lỗi CORS khi load files
- Phải chạy qua HTTP server, không mở file trực tiếp
- Sử dụng Live Server hoặc http-server

### Quiz không load
- Kiểm tra kết nối Internet
- API OpenTDB có thể bị rate limit

### Header/Footer không hiển thị
- Kiểm tra đường dẫn trong `js/include.js`
- Đảm bảo server đang chạy đúng

## 📚 Dependencies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: Open Trivia Database (public, không cần key)
- **Storage**: localStorage cho cam kết đạo đức
- **Server**: Bất kỳ static file server nào

## 🔗 Links hữu ích

- [Open Trivia Database](https://opentdb.com/) - API câu hỏi quiz
- [Coze AI](https://coze.com/) - Chatbot platform
- [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## 👥 Đóng góp

Dự án này phục vụ mục đích học tập môn HCM202. Mọi góp ý và cải tiến đều được hoan nghênh!
