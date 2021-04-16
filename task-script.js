import gallery from './gallery-items.js';
console.log(gallery);


// Разбей задание на несколько подзадач:

// - Создание и рендер разметки по массиву данных и предоставленному шаблону.
// - Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого
//   изображения.
// - Открытие модального окна по клику на элементе галереи.
// - Подмена значения атрибута `src` элемента `img.lightbox__image`.
// - Закрытие модального окна по клику на кнопку
//   `button[data-action="close-lightbox"]`.
// - Очистка значения атрибута `src` элемента `img.lightbox__image`. Это необходимо
//   для того, чтобы при следующем открытии модального окна, пока грузится
//   изображение, мы не видели предыдущее.

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modalLightBox: document.querySelector('.js-lightbox'),
  backdrop: document.querySelector('.lightbox__overlay'),
  currentImgLightBox: document.querySelector('.lightbox__image'),
  btnCloseModal: document.querySelector('[data-action="close-lightbox"]'),
}

// Create markup.................
const listItemsMurkup = createListMurkup(gallery);
refs.galleryList.innerHTML = listItemsMurkup;
function createListMurkup(images) {
  return images.map(({ original, preview, description }) => `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`).join('');
}

// event delegation...................
refs.galleryList.addEventListener('click', onGetImage);
function onGetImage(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  };
  refs.currentImgLightBox.src = event.target.dataset.source;
  refs.currentImgLightBox.alt = event.target.alt;
  onOpenModal();
}

// open and close Modal
function onOpenModal() {
  refs.modalLightBox.classList.add('is-open');
  window.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('keydown', onSliderFunction);
}

refs.btnCloseModal.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.modalLightBox.classList.remove('is-open');
  window.removeEventListener('keydown', onEscKeyPress);
  document.removeEventListener('keydown', onSliderFunction);
  refs.currentImgLightBox.src = '';
}

refs.backdrop.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal()
  }
}

function onEscKeyPress(event) {
  const ESC_CODE = 'Escape';
  if (event.code === ESC_CODE) {
    onCloseModal();
  }
}

// slide to left or right...............

function onSliderFunction(event) {
  let imagesSrc = [];
  gallery.map(image => imagesSrc.push(image.original));

  let newIndex = imagesSrc.indexOf(refs.currentImgLightBox.src);
  const LEFT_ARROW_KEY_CODE = 'ArrowLeft';
  const RIGHT_ARROW_KEY_CODE = 'ArrowRight';

  if (newIndex < 0) {
    return;
  }
  if (event.code === LEFT_ARROW_KEY_CODE) {
    newIndex -= 1;
    if (newIndex === -1) {
      newIndex = imagesSrc.length - 1;
    }
  } else if (event.code === RIGHT_ARROW_KEY_CODE) {
    newIndex += 1;
    if (newIndex === imagesSrc.length) {
      newIndex = 0;
    }
  }
  refs.currentImgLightBox.src = imagesSrc[newIndex];
};
