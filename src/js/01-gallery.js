import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

const galleryBox = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryBox.addEventListener('click', event => event.preventDefault());

function createGalleryMarkup(galleryItems) {
  const images = galleryItems
    .map(({ preview, original, description }) => {
      return `
   <li class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
           class="gallery__image"
           src="${preview}"
           data-source="${original}"
           alt="${description}"
            title=${description}
        />
    </a>
</li>
        `;
    })
    .join('');

  return images;
}

galleryBox.insertAdjacentHTML('afterbegin', galleryMarkup);

new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
});
