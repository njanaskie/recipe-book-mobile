import axios from 'axios';
import { firebase } from '../firebase/firebase';
import { APP_URL } from '@env'

const api = axios.create({
    baseURL: APP_URL,
})

console.log(APP_URL)

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
        const res = await api.post('/api/recipes/scrape', payload, header)
        return res.data
    } catch (e) {
        console.log('scraper service error', e)
    }
}

export const addRecipeService = async (recipe) => {
    const header = await createToken();
    const payload = recipe

    try {
        console.log('add recipe service', payload);
        const res = await api.post('/api/recipes', payload, header)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getRecipesService = async (page, itemsPerPage) => {
    const header = await createToken();

    try {
        const res = await api.get(`/api/recipes?page=${page}&per_page=${itemsPerPage}`, header)
        return res.data
    } catch(e) {
        console.log('get recipes error', e)
    }
}


export const removeRecipeService = async ({ id }) => {
    const header = await createToken();

    try {
        const res = await api.delete(`/api/recipes/${id}`, header)
        return res.data
    } catch(e) {
        console.log(e)
    }
}

export const editRecipeService = async (id, recipe) => {
    const header = await createToken();
    const payload = recipe;

    try {
        const res = await api.put(`/api/recipes/${id}`, payload, header)
        return res.data
    } catch(e) {
        console.log(e)
    }
}