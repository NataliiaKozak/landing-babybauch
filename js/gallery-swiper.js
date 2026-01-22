// (function () {
//   function initGallerySwiper() {
//     var gallerySection = document.querySelector('.gallery');
//     if (!gallerySection) return;

//     var swiperEl = gallerySection.querySelector('.gallery-swiper');
//     if (!swiperEl) return;

//     if (typeof Swiper === 'undefined') return;

//     // ИЗМЕНЕНИЕ: скопили элементы управления внутри секции
//     var nextBtn = gallerySection.querySelector('.swiper-button-next');
//     var prevBtn = gallerySection.querySelector('.swiper-button-prev');
//     var paginationEl = gallerySection.querySelector('.swiper-pagination');

//     var swiperConfig = {
//       // ИЗМЕНЕНИЕ: всегда один слайд (как на макете)
//       slidesPerView: 1,
//       spaceBetween: 0,
//       loop: true,
//       grabCursor: true,

//       // оставляем на будущее (в CSS скрыто)
//       pagination: paginationEl
//         ? { el: paginationEl, clickable: true }
//         : undefined,

//       navigation:
//         nextBtn && prevBtn ? { nextEl: nextBtn, prevEl: prevBtn } : undefined,
//     };

//     new Swiper(swiperEl, swiperConfig);
//   }

//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', initGallerySwiper);
//   } else {
//     initGallerySwiper();
//   }
// })();

// (function () {
//   function initGallerySwiper() {
//     var gallerySection = document.querySelector('.gallery');
//     if (!gallerySection) return;

//     var swiperEl = gallerySection.querySelector('.gallery-swiper');
//     if (!swiperEl) return;

//     if (typeof Swiper === 'undefined') return;

//     // элементы управления ВНУТРИ секции
//     var nextBtn = gallerySection.querySelector('.swiper-button-next');
//     var prevBtn = gallerySection.querySelector('.swiper-button-prev');
//     var paginationEl = gallerySection.querySelector('.swiper-pagination');

//     var swiperConfig = {
//       slidesPerView: 1,     // 1 фото на экран (как на макете)
//       spaceBetween: 0,      // без “зазора”
//       loop: true,
//       grabCursor: true,

//       // ИЗМЕНЕНИЕ: если вдруг слайдов мало — отключит управление сам
//       watchOverflow: true,

//       pagination: paginationEl ? { el: paginationEl, clickable: true } : false,
//       navigation: nextBtn && prevBtn ? { nextEl: nextBtn, prevEl: prevBtn } : false,
//     };

//     new Swiper(swiperEl, swiperConfig);
//   }

//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', initGallerySwiper);
//   } else {
//     initGallerySwiper();
//   }
// })();

(function () {
  function initGallerySingle() {
    var sections = document.querySelectorAll('.gallery');
    if (!sections.length) return;

    sections.forEach(function (gallerySection) {
      var slides = gallerySection.querySelectorAll('.swiper-slide');
      if (!slides.length) return;

      var prevBtn = gallerySection.querySelector('.swiper-button-prev');
      var nextBtn = gallerySection.querySelector('.swiper-button-next');

      var currentIndex = 0;

      function show(index) {
        // ИЗМЕНЕНИЕ: всегда только 1 видимый слайд
        slides.forEach(function (slide, i) {
          slide.hidden = i !== index;
        });
        currentIndex = index;
      }

      function prev() {
        var nextIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
        show(nextIndex);
      }

      function next() {
        var nextIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        show(nextIndex);
      }

      // init
      show(0);

      // arrows
      if (prevBtn) prevBtn.addEventListener('click', prev);
      if (nextBtn) nextBtn.addEventListener('click', next);

      // swipe
      var swipeArea = gallerySection.querySelector('.gallery-swiper');
      if (!swipeArea) return;

      var startX = 0;

      swipeArea.addEventListener(
        'touchstart',
        function (e) {
          startX = e.touches[0].clientX;
        },
        { passive: true },
      );

      swipeArea.addEventListener(
        'touchend',
        function (e) {
          var endX = e.changedTouches[0].clientX;
          var diff = startX - endX;

          if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
          }
        },
        { passive: true },
      );
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallerySingle);
  } else {
    initGallerySingle();
  }
})();
