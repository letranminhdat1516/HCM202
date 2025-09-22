window.setActiveNav = function () {
  const path = window.location.pathname.replace(/\/+$/, '');
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/+$/, '');
    a.classList.toggle('active', href.endsWith(path) || (path === '' && href.includes('index')));
  });
};
