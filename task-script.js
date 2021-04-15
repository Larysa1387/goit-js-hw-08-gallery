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

//  <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>

const refs = {
  list: document.querySelector('.js-gallery'),

}

// Create markup.................
const listItemsMurkup = createListMurkup(gallery);
refs.list.innerHTML = listItemsMurkup;
function createListMurkup(images) {
  return images.map(img => `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${img.original}"
      >
        <img
          class="gallery__image"
          src="${img.preview}"
          data-source="${img.original}"
          alt="${img.description}"
        />
      </a>
    </li>`).join('');
}
// console.log('~ listItemsMurkup', listItemsMurkup);

// event delegation...................
refs.list.addEventListener('click', onGetImageUrl);
function onGetImageUrl(event) {
  e.preventDefault();
  const imageUrl = event.target.dataset.source;
  console.log('~ imageUrl', imageUrl);
}
