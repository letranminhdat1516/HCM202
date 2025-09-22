// Helper functions for DOM manipulation and utilities

function decodeHTMLEntities(str) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('vi-VN');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { decodeHTMLEntities, formatDate, escapeHtml };
}
