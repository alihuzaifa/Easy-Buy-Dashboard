import axios from "axios";
import baseUrl from './CommonUnit'
const service = axios.create({
    baseURL: baseUrl,
});
const getApiMethod = async (url) => {
    try {
        const res = await service.get(url);
        return res;
    } catch (error) {
        return error.message;
    }
};
const postApiMethod = async (url, data) => {
    try {
        const res = await service.post(url, data);
        return res;
    } catch (error) {
        return error.message;
    }
};
const deleteApiMethod = async (url, data) => {
    try {
        const res = await service.delete(url, { data });
        return res;
    } catch (error) {
        return error.message;
    }
};
const updateApiMethod = async (url, data) => {
    try {
        const res = await service.put(url, data);
        return res;
    } catch (error) {
        return error.message;
    }
};
export { getApiMethod, postApiMethod, deleteApiMethod, updateApiMethod };