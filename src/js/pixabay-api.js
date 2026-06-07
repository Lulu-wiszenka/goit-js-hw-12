/*
У файлі pixabay-api.js зберігай функції для виконання HTTP-запитів:

getImagesByQuery(query, page). Ця функція повинна приймати два параметри query (пошукове слово, яке є рядком) та page (номер сторінки, яка є числом), здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.
*/

import axios from 'axios';





export async function getImagesByQuery(query, page = 1) {
    
        const res = await axios('https://pixabay.com/api/', {
            params: {
                key: '56141356-f92620e8971d743a7b3ebfb5b',
                q: `${query}`,
                page,
                per_page: 15,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true
            }
        });
    
    return res.data;
}