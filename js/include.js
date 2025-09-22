async function includeFragment(selector, url) {
  const host = document.querySelector(selector);
  if (!host) return;
  try {
    const res = await fetch(url);
    host.innerHTML = await res.text();
  } catch (error) {
    console.error('Failed to load fragment:', url, error);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  // Detect if we're in root or pages folder
  const isRootLevel = !window.location.pathname.includes('/pages/');
  const componentPath = isRootLevel ? 'components/' : '../components/';
  
  await includeFragment('header[data-include]', componentPath + 'header.html');
  await includeFragment('footer[data-include]', componentPath + 'footer.html');
  
  // Setup navigation links after header is loaded
  setupNavigation(isRootLevel);
  
  // sau khi header render xong, đánh dấu menu active
  if (window.setActiveNav) window.setActiveNav();
});

function setupNavigation(isRootLevel) {
  // Setup navigation links based on current location
  const navLinks = document.querySelectorAll('[data-nav]');
  const basePath = isRootLevel ? 'pages/' : '';
  
  navLinks.forEach(link => {
    const page = link.getAttribute('data-nav');
    if (page === 'home') {
      link.href = isRootLevel ? 'index.html' : '../index.html';
    } else {
      link.href = basePath + page + '.html';
    }
  });
}
