/*У файлі main.js напиши всю логіку роботи додатка. Виклики нотифікацій iziToast, усі перевірки на довжину масиву в отриманій відповіді та логіку прокручування сторінки (scroll) робимо саме в цьому файлі. Імпортуй в нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент. */
import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";

import { loadMoreButton, createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";




const form = document.querySelector("form");
const searchInput = document.querySelector('input[name="search-text"]');

let page = 1;
let searchWord = "";
let totalHits = null;  

form.addEventListener("submit", handleSubmit);
loadMoreButton.addEventListener("click", handleClick);

async function handleSubmit(event) {
    event.preventDefault();
    searchWord = searchInput.value;
    
    if (!searchWord) {
        return;
     }
     
    clearGallery();
    hideLoadMoreButton();
    showLoader();
    page = 1;
    
    try {
        const data = await getImagesByQuery(searchWord, page);
        totalHits = data.totalHits;
        if (data.hits.length > 0) {
            createGallery(data.hits);
        } else {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            return;
        }

    } catch (error){
        iziToast.error({
            title: 'Error',
            message: `${error.message}`,
        });
    } finally {
        
        hideLoader();
        if (page < getMaxPages(totalHits)) {

            showLoadMoreButton();
            
        } else {
            
            iziToast.warning({
                title: 'Warning',
                message: "We're sorry, but you've reached the end of search results."
            });
        }
    }
        
}

async function handleClick(event) {
    hideLoadMoreButton();
    showLoader();
    page++;
    try {
        const data = await getImagesByQuery(searchWord, page);
        if (data.hits.length > 0) {
            createGallery(data.hits);
        } else {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            return;
        }

        const card = document.querySelector(".gallery-item");
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: "smooth"
        });

    } catch (error){
        iziToast.error({
            title: 'Error',
            message: `${error.message}`,
        });
    } finally {

        hideLoader();
        if (page < getMaxPages(totalHits)) {

            showLoadMoreButton();
            
        } else {
            
            iziToast.warning({
                title: 'Warning',
                message: "We're sorry, but you've reached the end of search results."
            });
        }
    }
}


function getMaxPages(maxHits) {
    let limit = 15;
    const totalpage = Math.ceil(maxHits / limit);
    return totalpage;
}


