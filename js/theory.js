async function loadJSON(url) { 
  const r = await fetch(url); 
  return r.json(); 
}

function getQuotesByCategory(quotes, category) {
  return quotes.filter(q => q.category === category);
}

function renderQuotes(quotes) {
  return `
    <div class="quotes-section">
      <h4>📖 Trích dẫn nổi bật</h4>
      <div class="quotes-grid">
        ${quotes.map(q => `
          <blockquote class="quote-item">
            <p>"${q.text}"</p>
            <cite>
              <sup data-src="${q.sourceId}">[${q.sourceId}]</sup>
              ${q.page ? ` - ${q.page}` : ''}
              ${q.context ? `<br><small>${q.context}</small>` : ''}
            </cite>
          </blockquote>
        `).join('')}
      </div>
    </div>
  `;
}

function renderVanHoaContent(quotes) {
  const vanHoaQuotes = getQuotesByCategory(quotes, 'van-hoa');
  return `
    <h3>1. Quan niệm về Văn hóa</h3>
    <ul>
      <li><strong>Theo nghĩa rộng:</strong> Văn hóa là toàn bộ sáng tạo vật chất và tinh thần của loài người nhằm đáp ứng nhu cầu cuộc sống: ngôn ngữ, chữ viết, đạo đức, pháp luật, khoa học, nghệ thuật, công cụ sinh hoạt.</li>
      <li><strong>Theo nghĩa hẹp:</strong> Văn hóa là đời sống tinh thần của xã hội, gắn với học vấn, trường học, việc xóa nạn mù chữ.</li>
    </ul>

    ${renderQuotes(vanHoaQuotes)}

    <h3>2. Văn hóa trong quan hệ với các lĩnh vực khác</h3>
    <ul>
      <li><strong>Chính trị:</strong> Văn hóa phải phục vụ nhiệm vụ chính trị, soi đường cho quốc dân đi.</li>
      <li><strong>Kinh tế:</strong> Kinh tế là nền tảng, nhưng văn hóa có tác động tích cực trở lại phát triển kinh tế.</li>
      <li><strong>Xã hội:</strong> Giải phóng xã hội là điều kiện để văn hóa phát triển.</li>
    </ul>

    <h3>3. Vai trò và chức năng của Văn hóa</h3>
    <ul>
      <li><strong>Văn hóa là mục tiêu và động lực</strong> của cách mạng.</li>
      <li><strong>Văn hóa là một mặt trận:</strong> Văn nghệ sĩ là chiến sĩ, ngòi bút là vũ khí.</li>
      <li><strong>Văn hóa phục vụ nhân dân:</strong> Trở về với đời sống thực tế, phản ánh khát vọng của quần chúng.</li>
    </ul>

    <h3>4. Xây dựng nền văn hóa mới</h3>
    <ul>
      <li><strong>Tính chất:</strong> Dân tộc – Khoa học – Đại chúng.</li>
      <li><strong>Giữ bản sắc dân tộc:</strong> Lòng yêu nước, tinh thần độc lập, phong tục tập quán.</li>
      <li><strong>Tiếp thu tinh hoa nhân loại:</strong> "Có cái gì hay, cái gì tốt là ta học lấy".</li>
    </ul>
  `;
}

function renderDaoDucContent(quotes) {
  const daoDucQuotes = getQuotesByCategory(quotes, 'dao-duc');
  return `
    <h3>1. Vai trò của Đạo đức Cách mạng</h3>
    <ul>
      <li><strong>Đạo đức là gốc:</strong> Người nói: "Cũng như sông thì có nguồn mới có nước, không có nguồn thì sông cạn. Cây phải có gốc, không có gốc thì cây héo. Người cách mạng phải có đạo đức, không có đạo đức thì dù tài giỏi mấy cũng không lãnh đạo được nhân dân."</li>
      <li><strong>Đức và Tài thống nhất:</strong> Đức là gốc, tài phải gắn với đức.</li>
      <li><strong>Quyết định thành bại:</strong> Cán bộ có thấm nhuần đạo đức cách mạng thì công việc mới thành công.</li>
    </ul>

    ${renderQuotes(daoDucQuotes)}

    <h3>2. Chuẩn mực đạo đức cách mạng</h3>
    <ul>
      <li><strong>Trung với nước, hiếu với dân:</strong> Tuyệt đối trung thành với Tổ quốc và hết lòng phục vụ nhân dân.</li>
      <li><strong>Cần, kiệm, liêm, chính, chí công vô tư:</strong> Bốn đức tính cơ bản để xây dựng xã hội văn minh.
        <ul>
          <li><em>Cần:</em> siêng năng, sáng tạo.</li>
          <li><em>Kiệm:</em> tiết kiệm của cải, thời gian.</li>
          <li><em>Liêm:</em> trong sạch, không tham lam.</li>
          <li><em>Chính:</em> ngay thẳng, minh bạch.</li>
          <li><em>Chí công vô tư:</em> đặt lợi ích tập thể, dân tộc lên trên hết.</li>
        </ul>
      </li>
      <li><strong>Thương yêu con người, sống có tình nghĩa:</strong> Yêu thương nhân dân, đặc biệt là người nghèo, bị áp bức.</li>
      <li><strong>Tinh thần quốc tế trong sáng:</strong> "Bốn phương vô sản đều là anh em".</li>
    </ul>

    <h3>3. Nguyên tắc rèn luyện đạo đức</h3>
    <ul>
      <li><strong>Nói đi đôi với làm, nêu gương:</strong> "Một tấm gương sống còn có giá trị hơn một trăm bài diễn văn tuyên truyền."</li>
      <li><strong>Xây đi đôi với chống:</strong> Xây dựng chuẩn mực mới, đồng thời chống chủ nghĩa cá nhân.</li>
      <li><strong>Tu dưỡng suốt đời:</strong> "Ngọc càng mài càng sáng, vàng càng luyện càng trong."</li>
    </ul>
  `;
}

function renderConNguoiContent(quotes) {
  const conNguoiQuotes = getQuotesByCategory(quotes, 'con-nguoi');
  return `
    <h3>1. Quan niệm về Con người</h3>
    <ul>
      <li>Con người là sự thống nhất giữa trí lực, tâm lực và thể lực.</li>
      <li>Con người vừa mang tính xã hội, vừa chịu sự chi phối của hoàn cảnh lịch sử – cụ thể.</li>
      <li>Trước hết, con người cần được "ăn no, mặc đủ, học hành".</li>
    </ul>

    ${renderQuotes(conNguoiQuotes)}

    <h3>2. Vai trò của Con người</h3>
    <ul>
      <li><strong>Mục tiêu:</strong> Giải phóng con người, đem lại tự do, hạnh phúc.</li>
      <li><strong>Động lực:</strong> "Trong bầu trời không gì quý bằng nhân dân, trong thế giới không gì mạnh bằng sức mạnh đoàn kết của nhân dân."</li>
    </ul>

    <h3>3. Xây dựng con người mới</h3>
    <ul>
      <li><strong>Ý nghĩa chiến lược:</strong> "Vì lợi ích mười năm trồng cây, vì lợi ích trăm năm trồng người."</li>
      <li><strong>Con người Xã hội Chủ nghĩa:</strong> Vừa "hồng" (đạo đức, lý tưởng), vừa "chuyên" (năng lực, chuyên môn).</li>
      <li><strong>Phương pháp:</strong> Kết hợp tự tu dưỡng và giáo dục tập thể. "Hiền, dữ phải đâu là tính sẵn. Phần nhiều do giáo dục mà nên."</li>
    </ul>
  `;
}

function renderKetLuan() {
  return `
    <p>Tư tưởng Hồ Chí Minh về văn hóa, đạo đức và con người là <strong>một chỉnh thể thống nhất</strong>:</p>
    
    <ul>
      <li>Văn hóa định hướng cho xã hội phát triển.</li>
      <li>Đạo đức là gốc rễ, nền tảng tinh thần.</li>
      <li>Con người vừa là mục tiêu, vừa là động lực của cách mạng.</li>
    </ul>

    <p>Những giá trị ấy đến nay vẫn còn nguyên tính thời sự, là kim chỉ nam cho sự nghiệp xây dựng đất nước Việt Nam <strong>"dân giàu, nước mạnh, dân chủ, công bằng, văn minh"</strong>.</p>
    
    <div class="conclusion-highlight">
      <h4>🎯 Ý nghĩa thời đại</h4>
      <p>Tư tưởng Hồ Chí Minh về văn hóa, đạo đức và con người không chỉ có giá trị lịch sử mà còn là nguồn sáng tạo cho việc xây dựng đất nước trong thời kỳ đổi mới, hội nhập quốc tế.</p>
    </div>
  `;
}

async function renderSourcesToFooter() {
  const listHost = document.querySelector('#source-list');
  if (!listHost) return;
  
  try {
    const sources = await loadJSON('../data/sources.json');
    listHost.innerHTML = `
      <h2>📚 Nguồn tham khảo chi tiết</h2>
      <div class="sources-grid">
        ${sources.map(s => `
          <div class="source-item card" id="${s.id}">
            <h4>${s.title}</h4>
            <div class="source-meta">
              <p><strong>Tác giả:</strong> ${s.author || 'Không rõ'}</p>
              <p><strong>Năm xuất bản:</strong> ${s.year}</p>
              <p><strong>Nhà xuất bản:</strong> ${s.publisher}</p>
              ${s.description ? `<p class="source-desc">${s.description}</p>` : ''}
              ${s.url ? `<a href="${s.url}" target="_blank" class="source-link btn">🔗 Xem chi tiết</a>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    console.error('Failed to load sources:', error);
  }
}

function setupSmoothScrolling() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('.theory-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function setupSourceReferences() {
  // Handle source reference clicks
  document.addEventListener('click', function(e) {
    if (e.target.matches('sup[data-src]')) {
      const sourceId = e.target.getAttribute('data-src');
      const sourceElement = document.getElementById(sourceId);
      
      if (sourceElement) {
        sourceElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        
        // Highlight the source briefly
        sourceElement.classList.add('highlighted');
        setTimeout(() => {
          sourceElement.classList.remove('highlighted');
        }, 3000);
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const quotes = await loadJSON('../data/quotes.json');
    
    // Render all sections
    document.querySelector('#van-hoa-content').innerHTML = renderVanHoaContent(quotes);
    document.querySelector('#dao-duc-content').innerHTML = renderDaoDucContent(quotes);
    document.querySelector('#con-nguoi-content').innerHTML = renderConNguoiContent(quotes);
    document.querySelector('#ket-luan-content').innerHTML = renderKetLuan();
    
    // Load sources
    await renderSourcesToFooter();
    
    // Setup interactive features
    setupSmoothScrolling();
    setupSourceReferences();
    
    console.log('Theory content loaded successfully');
  } catch (error) {
    console.error('Failed to load theory data:', error);
  }
});
