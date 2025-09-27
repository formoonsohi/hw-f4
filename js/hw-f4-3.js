const lazyImages = document.querySelectorAll("img.lazy");

function loadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) return;

  img.src = src;

  img.onload = () => {
    img.classList.add("loaded");
  };

  img.removeAttribute("data-src");
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

lazyImages.forEach((img) => {
  observer.observe(img);
});

/*
 ==================== ОБЪЯСНЕНИЯ ====================
 1. Мы используем атрибут data-src, чтобы браузер не загружал сразу все изображения.
    Настоящий src подставляется только тогда, когда картинка попадает в область видимости.
 2. IntersectionObserver позволяет отслеживать, какие элементы попали в viewport.
    Это эффективнее, чем обрабатывать scroll-события вручную.
 3. Для улучшения UX:
    - добавили фон (#f0f0f0), пока картинка не загрузилась;
    - добавили анимацию (opacity), чтобы картинка плавно появлялась;
    - сделали кнопку, чтобы загружать все изображения сразу по клику.
 4. В будущем можно улучшить:
    - использовать <picture> с WebP и fallback в JPEG/PNG;
    - автоматически подбирать разные размеры картинок для мобильных устройств;
    - показывать "spinner" или иконку загрузки вместо просто серого фона.
 ====================================================
*/
