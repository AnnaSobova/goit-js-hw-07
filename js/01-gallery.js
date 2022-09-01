
// // Change code below this line
// const galleryRoot = document.querySelector('.gallery');
// const galleryImages = createGallery(galleryItems);
// galleryRoot.insertAdjacentHTML('afterbegin', galleryImages);
// galleryRoot.addEventListener('click', handleClickOnImage);

// const modalInstance = getModal();

// function createGallery(imagesConfig = []) {
//     return imagesConfig
//     .map(({ preview, original, description})=>{
//         return `
//         <img class="gallery-item" src=${preview}
//         data-source=${original} 
//         alt=${description}/>`;
      
//     })
//     .join('');
// }

// function handleClickOnImage({target}){
//     if (!target.classList.contains('gallery-item')) return;
//     setModalImage(target.dataset.source);
//     modalInstance.show();
//     window.addEventListener('keydown', onEscape);
//     function onEscape(evt){
//         if (evt.code === ESC_KEY_CODE){
//             modalInstance.close();
//             window.removeEventListener('keydown', onEscape);
//         }
//     }
// }

// console.log(galleryItems);

import { galleryItems } from './gallery-items.js';

const makeGalleryItemMarkup = (arr) => {
    return arr
        .map(({ description: descr, preview, original: orig }) => {
            return `<div class="gallery__item">
						<a class="gallery__link" href="large-image.jpg">
							<img
								class="gallery__image"
								src="${preview}"
								data-source="${orig}"
								alt="${descr}"
								/>
						</a>
					</div>`;
        })
        .join('');
};

const galleryContainerRef = document.querySelector('.gallery');
galleryContainerRef.innerHTML = makeGalleryItemMarkup(galleryItems);

const createLightboxInstance = (e) => {
    const targetedImgUrl = e.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src="${targetedImgUrl}" width="800" height="600">
	`);

    instance.show(
        document.addEventListener('keydown', (e) => {
            if (e.key && e.code === 'Escape') {
                instance.close();
            }
        })
    );
};

const onGalleryImgClick = (e) => {
    if (e.target.nodeName !== 'IMG') return;

    createLightboxInstance(e);
    e.preventDefault();
};

galleryContainerRef.addEventListener('click', onGalleryImgClick);
