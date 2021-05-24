import axios from 'axios';
import { serverUrl } from '../config';

export const getUser = (id) => axios.get(`${serverUrl}/users/${id}`)
    .then((res) => {
        if (res.data) return res.data;
        return null;
    })
    .catch((err) => {
        console.log(err);
    });
