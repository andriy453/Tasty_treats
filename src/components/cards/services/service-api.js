// import axios from 'axios';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes?limit=9&rating=3';

// ?category=Beef&page=1&limit=6&time=160&area=Irish&ingredients=640c2dd963a319ea671e3796

export async function fetchImages(q, page, perPage) {
    const url = `${BASE_URL}`;
    const response = await axios.get(url);
    return response.data;          
};