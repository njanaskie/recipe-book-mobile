import axios from 'axios';
import { firebase } from '../firebase/firebase';

// const api = axios.create({
//     baseURL: 'http://localhost:3001/api',
// })

const url = 'http://localhost:3001';

const createToken = async () => {
    const user = firebase.auth().currentUser;
    const token = user && await user.getIdToken();
    const payloadHeader = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return payloadHeader;
}

export const scrapeURLService = async (recipe) => {
    const header = await createToken();
    const payload = recipe

    try {
        const res = await axios.post(`${url}/api/recipes/scrape`, payload, header)
        // console.log('scrape url service', res.data)
        return res.data
    } catch (e) {
        console.log('scraper service error', e)
    }
}

export const addRecipeService = async (recipe) => {
    const header = await createToken();
    // const scrapedData = await scrapeURLService(recipe)
    const payload = recipe

    try {
        console.log('add recipe service', payload);
        const res = await axios.post(`${url}/api/recipes`, payload, header)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getRecipesService = async (page, itemsPerPage) => {
    const header = await createToken();

    try {
        const res = await axios.get(`${url}/api/recipes?page=${page}&per_page=${itemsPerPage}`, header)
        return res.data
    } catch(e) {
        console.log(e)
    }
}

export const removeRecipeService = async ({ id }) => {
    const header = await createToken();

    try {
        const res = await axios.delete(`${url}/api/recipes/${id}`, header)
        return res.data
    } catch(e) {
        console.log(e)
    }
}

export const editRecipeService = async (id, recipe) => {
    const header = await createToken();
    const payload = recipe;

    try {
        const res = await axios.put(`${url}/api/recipes/${id}`, payload, header)
        return res.data
    } catch(e) {
        console.log(e)
    }
}