
export default (href, type = 'image') => {
  if (document.head.querySelector(`link[rel="preload"][href="${href}"]`)) {
    return;
  }
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = type;
  link.href = href;
  document.head.appendChild(link);
};
