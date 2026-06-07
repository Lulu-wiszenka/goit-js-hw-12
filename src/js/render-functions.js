/*
У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:

-createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
-clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
-showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
-hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.

-showLoadMoreButton(). Ця функція нічого не приймає, повинна додавати клас для відображення кнопки Load more. Нічого не повертає.
-hideLoadMoreButton(). Ця функція нічого не приймає, повинна прибирати клас для відображення кнопки Load more. Нічого не повертає.
*/

import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

export const lightbox = new SimpleLightbox('.gallery a', {
                                        captions: true,
                                        captionDelay: 250,
                                        captionsData: 'alt'
                                        });


export const gallery = document.querySelector(".gallery");
export const loader = document.querySelector("#loader");
export const loadMoreButton = document.querySelector(".load-more-button");

export function createGallery(arr) {
    const newGallery = arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `<li class="gallery-item">
          <a class="gallery-link-img" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" class="gallery-img"/>
          </a>
          <div class="descr-container">
            <h3 class="gallery-likes"> Likes <br/> ${likes} </h3>
            <h3 class="gallery-views"> Views <br/> ${views} </h3>
            <h3 class="gallery-comments"> Comments <br/> ${comments} </h3>
            <h3 class="gallery-downloads"> Downloads <br/> ${downloads} </h3>
          </div>
        </li>`
    }).join("");

    gallery.insertAdjacentHTML("beforeend", newGallery);
    lightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function showLoader() {
    loader.classList.remove("hidden");
}

export function hideLoader() {
    loader.classList.add("hidden");
}

export function showLoadMoreButton() {
    loadMoreButton.classList.remove("hidden")
}

export function hideLoadMoreButton() {
    loadMoreButton.classList.add("hidden");
}