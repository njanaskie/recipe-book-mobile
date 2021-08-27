import axios from 'axios';
import { firebase } from '../firebase/firebase';
import { APP_URL } from '@env'

const api = axios.create({
    baseURL: APP_URL.slice(0,-1),
})

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

export const addIngredientService = async (ingredient, dispatch) => {
    const header = await createToken();
    const payload = ingredient

    try {
        const res = await api.post('/api/ingredients', payload, header)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getIngredientsService = async (dispatch) => {
    const header = await createToken();

    try {
        const res = await api.get('/api/ingredients', header)
        return res.data
    } catch(e) {
        console.log('get ingredients error', e)
    }
}

export const removeIngredientService = async ({ id }) => {
    const header = await createToken();

    try {
        const res = await api.delete(`/api/ingredients/${id}`, header)
        return res.data
    } catch(e) {
        console.log(e)
    }
}