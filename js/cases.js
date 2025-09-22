async function loadCases() { 
  const r = await fetch('../data/cases.json'); 
  return r.json(); 
}

let CASES = [], FILTER = '';

function renderList() {
  const host = document.getElementById('case-list');
  const q = FILTER.toLowerCase();
  const items = CASES.filter(c => 
    c.title.toLowerCase().includes(q) || 
    c.description.toLowerCase().includes(q) ||
    c.tags.some(tag => tag.toLowerCase().includes(q))
  );
  
  host.innerHTML = items.map(c => `
    <div class="case-item" data-id="${c.id}">
      <strong>${c.title}</strong><br>
      <small>${c.tags.join(' • ')}</small>
    </div>
  `).join('') || '<em>Không có kết quả</em>';
  
  host.querySelectorAll('.case-item').forEach(el => {
    el.onclick = () => showDetail(el.dataset.id);
  });
}

function showDetail(id) {
  const c = CASES.find(x => x.id === id);
  const d = document.getElementById('case-detail');
  d.innerHTML = `
    <h4>${c.title}</h4>
    <p><strong>Tình huống:</strong> ${c.description}</p>
    <p><strong>Nguyên tắc đạo đức liên quan:</strong> ${c.tags.join(', ')}</p>
    <p><strong>Phân tích:</strong> ${c.reasoning}</p>
    <p><strong>Hành động khuyến nghị:</strong></p>
    <ul>${c.recommendedActions.map(a => `<li>${a}</li>`).join('')}</ul>
  `;
}

function renderCommits() {
  const host = document.getElementById('commit-list');
  const list = window.StorageManager.getCommitments();
  
  host.innerHTML = '<h4>Cam kết gần đây</h4>' + (list.length ? 
    list.slice(0, 10).map(i => `
      <div class="card" style="margin-bottom:8px">
        <strong>${i.nickname || 'Ẩn danh'}</strong>: ${i.statement}
        <div class="muted" style="font-size:.9rem">🕐 ${new Date(i.createdAt).toLocaleString('vi-VN')}</div>
      </div>
    `).join('') : 
    '<em>Chưa có cam kết nào</em>'
  );
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
    CASES = await loadCases();
    renderList(); 
    renderCommits();
    


    document.getElementById('search').addEventListener('input', (e) => { 
      FILTER = e.target.value; 
      renderList(); 
    });

    document.getElementById('commit-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const statement = (fd.get('statement') || '').toString().trim();
      if (!statement) return;
      
      const success = window.StorageManager.addCommitment({ 
        nickname: (fd.get('nickname') || '').toString().trim(), 
        statement 
      });
      
      if (success) {
        e.currentTarget.reset();
        renderCommits();
        
        // Show success message
        const btn = e.currentTarget.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = '✅ Đã gửi!';
        btn.style.background = '#28a745';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 2000);
      }
    });
  } catch (error) {
    console.error('Failed to load cases:', error);
  }
});
