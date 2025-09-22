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
  await includeFragment('header[data-include]', '../components/header.html');
  await includeFragment('footer[data-include]', '../components/footer.html');
  // sau khi header render xong, đánh dấu menu active
  if (window.setActiveNav) window.setActiveNav();
});
