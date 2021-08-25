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
    // const payload = ingredient

    // axios.post(url, payload)
    const header = await createToken();
    const payload = ingredient

    // await api.post('/ingredients', payload, header).then(res => {
    //             return res.data
    //             // dispatch({ type: 'ADD_INGREDIENT', ingredient: res.data }) // this should work
    //             // console.log(ingredient)
    //         })
    //         .catch(e => {
    //             console.log(e)
    //         })
    try {
        // console.log(payload);
        const res = await api.post('/api/ingredients', payload, header)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getIngredientsService = async (dispatch) => {
    const header = await createToken();

    // await api.get('/ingredients', header).then(function(res) {
    //     return res.data
    //     dispatch({ type: 'SET_INGREDIENTS', ingredient: res.data }) // this should work
    //     // console.log(ingredient)
    // })
    // .catch(e => {
    //     console.log(e)
    // })

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